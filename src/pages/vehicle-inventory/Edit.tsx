import { Col, DatePicker, Form, Input, message, Modal, Row, Select } from 'antd';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { VehicleInventoryIcon } from '@/assets/icons';
import Button from '@/components/Button/Button';
import FallbackPageWrapper from '@/components/Fallback/FallbackPageWrapper';
import ProjectSelect from '@/components/ProjectSelect/Index';
import { useCompanyVehicleAddMutation } from '@/store/api/company/api';
import {
  useLazyTaxonomyTrailerAndBrandsQuery,
  useTaxonomyTruckTypesQuery
} from '@/store/api/general/api';
import { CompanyVehicleAddRequestDto } from '@/types/company/type';

export default function Edit() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { data: truckTypesData } = useTaxonomyTruckTypesQuery();
  const [fetchTrailerAndBrands] = useLazyTaxonomyTrailerAndBrandsQuery();

  const selectedTruckTypeId = Form.useWatch('truckTypeId', { form });

  const truckTypesOptions = useMemo(
    () =>
      truckTypesData?.map((item: { id: string; name: string }) => ({
        value: item.id,
        label: item.name
      })),
    [truckTypesData]
  );

  const trailersOptions = useMemo(() => {
    if (!selectedTruckTypeId) return [];
    return fetchTrailerAndBrands({ truckTypeId: selectedTruckTypeId })
      .unwrap()
      .then((data) =>
        data?.trailers.map((item: { id: string; name: string }) => ({
          value: item.id,
          label: item.name
        }))
      );
  }, [selectedTruckTypeId]);

  const [addVehicle] = useCompanyVehicleAddMutation();

  const years = useMemo(() => {
    const years = [];
    for (let i = dayjs().get('year'); i > 1990; i--) {
      years.push(i);
    }
    return years;
  }, []);

  const [selectVehicleType, setSelectVehicleType] = useState<string>('');
  const [selfOwned, setSelfOwned] = useState<boolean>(false);

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

  const sendHandle = (values: CompanyVehicleAddRequestDto) => {};

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
              <Select options={truckTypesOptions} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Araç Tipi" rules={[{ required: true }]} name="truckTypeId">
              <Select options={trailersOptions} />
            </Form.Item>
          </Col>
        </Row>

        <div className="flex justify-end">
          <Button htmlType="submit">Kaydet</Button>
        </div>
      </Form>
    </FallbackPageWrapper>
  );
}
