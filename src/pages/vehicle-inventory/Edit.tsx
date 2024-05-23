import { Col, DatePicker, Form, Input, InputNumber, message, Modal, Row, Select } from 'antd';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { VehicleInventoryIcon } from '@/assets/icons';
import Button from '@/components/Button/Button';
import FallbackPageWrapper from '@/components/Fallback/FallbackPageWrapper';
import ProjectSelect from '@/components/ProjectSelect/Index';
import { URLS } from '@/router/url';
import { useCompanyVehicleAddMutation } from '@/store/api/company/api';
import {
  useLazyTaxonomyTrailerAndBrandsQuery,
  useTaxonomyTruckTypesQuery
} from '@/store/api/general/api';
import { CompanyVehicleAddRequestDto } from '@/types/company/type';
import { Response } from '@/types/utils';

enum OWNER {
  OWNER = 'OWNER',
  RENTAL = 'RENTAL'
}

enum TRUCK_TYPE {
  TRUCK = 'TRUCK'
}

const years = Array.from({ length: dayjs().get('year') - 1990 }, (_, i) => {
  const year = dayjs().get('year') - i;
  return { value: year, label: year.toString() };
});

export default function Edit() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { data: truckTypesData } = useTaxonomyTruckTypesQuery();
  const [fetchTrailerAndBrands] = useLazyTaxonomyTrailerAndBrandsQuery();

  const [addVehicle] = useCompanyVehicleAddMutation();

  const truckTypesOptions = useMemo(
    () =>
      truckTypesData?.map((item: { id: string; name: string }) => ({
        value: item.id,
        label: item.name
      })),
    [truckTypesData]
  );

  const [brandsOptions, setBrandsOptions] = useState<
    {
      value: string;
      label: string;
    }[]
  >([]);
  const [trailersOptions, setTrailersOptions] = useState<
    {
      value: string;
      label: string;
    }[]
  >([]);

  const selectedTruckTypeId = Form.useWatch('truckTypeId', { form });
  const ownershipType = Form.useWatch('ownershipType', { form });

  const onFinish = (values: CompanyVehicleAddRequestDto) => {
    Modal.confirm({
      title: 'Kaydetmek istediğinize emin misiniz?',
      onOk: () => sendHandle(values),
      footer: (_, { OkBtn, CancelBtn }) => (
        <>
          <CancelBtn />
          <OkBtn />
        </>
      )
    });
  };

  const sendHandle = (values: CompanyVehicleAddRequestDto) => {
    addVehicle({
      body: {
        contractEndDate: null,
        trailerNetWeight: null,
        trailerMaxWeight: null,
        trailerInsuranceEndDate: null,
        ...values
      },
      projectId: values.projectId
    })
      .unwrap()
      .then(() => {
        message.success('Başarılı bir şekilde eklendi');
        navigate(URLS.VEHICLE_INVENTORY);
      })
      .catch((err: Response) => {
        message.error(err.data.message);
      });
  };

  return (
    <FallbackPageWrapper>
      <div className="mb-8 flex items-center gap-x-2.5">
        <VehicleInventoryIcon />
        <span className="text-lg font-semibold">Araç Ekle</span>
      </div>
      <Form onFinish={onFinish} layout="vertical" form={form}>
        <Row gutter={32}>
          <Col span={12}>
            <ProjectSelect rules={[{ required: true }]} label="Proje Seçiniz" name="projectId" />
          </Col>
          <Col span={12}>
            <Form.Item label="Plaka" rules={[{ required: true }]} name="plateNumber">
              <Input
                type="text"
                placeholder="Plaka"
                onInput={(e) => (e.target.value = e.target.value.toUpperCase())}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Araç Tipi" rules={[{ required: true }]} name="truckTypeId">
              <Select
                options={truckTypesOptions}
                onChange={(value) => {
                  fetchTrailerAndBrands({ truckTypeId: value as string })
                    .unwrap()
                    .then((data) => {
                      setBrandsOptions(
                        data?.brands.map((item: { id: string; name: string }) => ({
                          value: item.id,
                          label: item.name
                        }))
                      );
                      setTrailersOptions(
                        data?.trailers.map((item: { id: string; name: string }) => ({
                          value: item.id,
                          label: item.name
                        }))
                      );
                    });
                }}
              />
            </Form.Item>
          </Col>
          {selectedTruckTypeId && (
            <>
              <Col span={12}>
                <Form.Item label="Kasa Tipi" rules={[{ required: true }]} name="trailerId">
                  <Select options={trailersOptions} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Marka" rules={[{ required: true }]} name="brandId">
                  <Select options={brandsOptions} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Yıl" rules={[{ required: true }]} name="year">
                  <Select options={years} />
                </Form.Item>
              </Col>
              <Col span={selectedTruckTypeId === TRUCK_TYPE.TRUCK ? 8 : 12}>
                <Form.Item
                  label="Çekici Net Ağırlık"
                  rules={[{ required: true }]}
                  name="truckNetWeight"
                >
                  <InputNumber className="w-full" min="0" addonAfter="kg" />
                </Form.Item>
              </Col>
              {selectedTruckTypeId === TRUCK_TYPE.TRUCK ? (
                <>
                  <Col span={8}>
                    <Form.Item
                      label="Römork Net Ağırlık"
                      rules={[{ required: true }]}
                      name="trailerNetWeight"
                    >
                      <InputNumber className="w-full" min="0" addonAfter="kg" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Römork Azami Ağırlık"
                      rules={[{ required: true }]}
                      name="trailerMaxWeight"
                    >
                      <InputNumber className="w-full" min="0" addonAfter="kg" />
                    </Form.Item>
                  </Col>{' '}
                </>
              ) : (
                <Col span={12}>
                  <Form.Item
                    label="Çekici Azami Ağırlık"
                    rules={[{ required: true }]}
                    name="truckMaxWeight"
                  >
                    <InputNumber className="w-full" min="0" addonAfter="kg" />
                  </Form.Item>
                </Col>
              )}

              <Col span={selectedTruckTypeId === TRUCK_TYPE.TRUCK ? 12 : 24}>
                <Form.Item
                  label="Çekici Sigorta Bitiş Tarihi"
                  rules={[{ required: true }]}
                  name="truckInsuranceEndDate"
                >
                  <DatePicker className="w-full" minDate={dayjs().endOf('day')} />
                </Form.Item>
              </Col>
              {selectedTruckTypeId === TRUCK_TYPE.TRUCK && (
                <Col span={12}>
                  <Form.Item
                    label="Römork Sigorta Bitiş Tarihi"
                    rules={[{ required: true }]}
                    name="trailerInsuranceEndDate"
                  >
                    <DatePicker className="w-full" minDate={dayjs().endOf('day')} />
                  </Form.Item>
                </Col>
              )}
              <Col span={12}>
                <Form.Item label="Özmal/Kiralık" rules={[{ required: true }]} name="ownershipType">
                  <Select
                    options={[
                      { value: OWNER.OWNER, label: 'Özmal' },
                      { value: OWNER.RENTAL, label: 'Kiralık' }
                    ]}
                  />
                </Form.Item>
              </Col>
              {ownershipType === OWNER.RENTAL && (
                <Col span={12}>
                  <Form.Item
                    label="Sözleşme Bitiş Tarihi"
                    rules={[{ required: true }]}
                    name="contractEndDate"
                  >
                    <DatePicker className="w-full" minDate={dayjs().endOf('day')} />
                  </Form.Item>
                </Col>
              )}
            </>
          )}
        </Row>
        <div className="flex justify-end">
          <Button htmlType="submit">Kaydet</Button>
        </div>
      </Form>
    </FallbackPageWrapper>
  );
}
