import { Avatar, Col, Form, Input, message, Modal, Radio, Row } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { CompanyInfoIcon } from '@/assets/icons';
import BlurScreen from '@/components/BlurScreen';
import Button from '@/components/Button/Button';
import CitySelect from '@/components/CitySelect/Index';
import CountrySelect from '@/components/CountrySelect/Index';
import TaxOfficeSelect from '@/components/TaxOfficeSelect/Index';
import { URLS } from '@/router/url';
import {
  useCompanyInformationQuery,
  useCompanyInformationUpdateMutation
} from '@/store/api/company/api';
import { Response } from '@/types/utils';

interface CompanyEditProps {
  name: string;
  companyCountryId: string;
  companyCityId: string;
  taxOfficeId: string;
  taxId: string;
  companyAddress: string;
  isInvoiceAddressSame: boolean;
  invoiceCountryId: string;
  invoiceCityId: string;
  invoiceAddress: string;
}

export function Component() {
  const [form] = Form.useForm<CompanyEditProps>();
  const { data, isLoading } = useCompanyInformationQuery();
  const [updateCompany, { isLoading: updateIsLoading }] = useCompanyInformationUpdateMutation();
  const navigate = useNavigate();

  // watch
  const companyCountry = Form.useWatch('companyCountryId', form);
  const companyCity = Form.useWatch('companyCityId', form);
  const invoiceCountryId = Form.useWatch('invoiceCountryId', form);
  const invoiceCityId = Form.useWatch('invoiceCityId', form);
  const billAddress = Form.useWatch('isInvoiceAddressSame', form);

  useEffect(() => {
    form.setFieldValue('billAddress', true);
    form.setFieldsValue(data ?? {});
  }, [data, form]);

  const onFinish = (values: CompanyEditProps) => {
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

  const sendHandle = (values: CompanyEditProps) => {
    updateCompany(values)
      .unwrap()
      .then(() => {
        message.success('Başarılı bir şekilde güncellendi');
        navigate(URLS.COMPANY);
      })
      .catch((err: Response) => {
        message.error(err.data.message);
      });
  };

  return (
    <>
      {(isLoading || updateIsLoading) && <BlurScreen />}
      <div className="mb-8 flex items-center gap-x-2.5">
        <CompanyInfoIcon />
        <span className="text-lg font-semibold">Şirket Bilgileri</span>
      </div>
      <Row gutter={24}>
        <Col span={2} className="flex flex-col items-center">
          <Avatar size={60} className="bg-secondary">
            AÖ
          </Avatar>
          <div className="mt-2">Değiştir</div>
        </Col>
        <Col span={22}>
          <Form requiredMark layout="vertical" form={form} onFinish={onFinish}>
            <Form.Item label="Şirket Ünvanı" rules={[{ required: true }]} name="name">
              <Input placeholder="Şirket Ünvanı" />
            </Form.Item>
            <Row gutter={24}>
              <Col span={12}>
                <CountrySelect label="Ülke" rules={[{ required: true }]} name="companyCountryId" />
              </Col>
              <Col span={12}>
                <CitySelect label="Şehir" rules={[{ required: true }]} name="companyCityId" />
              </Col>
            </Row>
            <Form.Item label="Adres" rules={[{ required: true }]} name="companyAddress">
              <Input.TextArea placeholder="Adres" rows={3} />
            </Form.Item>
            <Form.Item
              rules={[{ required: true }]}
              name="isInvoiceAddressSame"
              label="Fatura Adresi"
            >
              <Radio.Group className="flex flex-col">
                <Radio value={true}> Bu adresi fatura adresim olarak kullan </Radio>
                <Radio className="mt-3" value={false}>
                  Başka bir fatura adresi belirle{' '}
                </Radio>
              </Radio.Group>
            </Form.Item>
            {billAddress === false && (
              <>
                <Row gutter={24}>
                  <Col span={12}>
                    <CountrySelect
                      label="Ülke"
                      rules={[{ required: true }]}
                      name="invoiceCountryId"
                    />
                  </Col>
                  <Col span={12}>
                    <CitySelect label="Şehir" rules={[{ required: true }]} name="invoiceCityId" />
                  </Col>
                </Row>
                <Form.Item label="Adres" rules={[{ required: true }]} name="invoiceAddress">
                  <Input.TextArea placeholder="Adres" rows={3} />
                </Form.Item>
              </>
            )}
            <Row gutter={24}>
              <Col span={12}>
                <TaxOfficeSelect
                  name="taxOfficeId"
                  label="Vergi Dairesi"
                  rules={[{ required: true }]}
                  country={billAddress ? companyCountry : invoiceCountryId}
                  city={billAddress ? companyCity : invoiceCityId}
                />
              </Col>
              <Col span={12}>
                <Form.Item label="Vergi Numarası" rules={[{ required: true }]} name="taxId">
                  <Input placeholder="Vergi Numarası" />
                </Form.Item>
              </Col>
            </Row>
            <div className="flex justify-end">
              <Button htmlType="submit">Kaydet</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  );
}
