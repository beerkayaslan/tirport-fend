import { Avatar, Col, Form, Input, Radio, Row } from 'antd';
import { useEffect } from 'react';

import { CompanyInfoIcon } from '@/assets/icons';
import Button from '@/components/Button/Button';
import CitySelect from '@/components/CitySelect/Index';
import CountrySelect from '@/components/CountrySelect/Index';
import FallbackPageWrapper from '@/components/Fallback/FallbackPageWrapper';
import TaxOfficeSelect from '@/components/TaxOfficeSelect/Index';

enum TaxAddress {
  Company = 'company',
  Bill = 'bill'
}

interface CompanyEditProps {
  company: string;
  companyCountry: string;
  companyCity: string;
  companyAddress: string;
  billAddress: string;
  billCountry: string;
  billCity: string;
  billAddressTextarea: string;
  taxOffice: string;
  taxId: string;
}

export default function CompanyEdit() {
  const [form] = Form.useForm<CompanyEditProps>();

  // watch
  const companyCountry = Form.useWatch('companyCountry', form);
  const companyCity = Form.useWatch('companyCity', form);
  const billCountry = Form.useWatch('billCountry', form);
  const billCity = Form.useWatch('billCity', form);
  const billAddress = Form.useWatch('billAddress', form);

  useEffect(() => {
    form.setFieldValue('billAddress', TaxAddress.Company);
  }, []);

  const onFinish = (values: CompanyEditProps) => {
    console.log(values);
  };

  return (
    <FallbackPageWrapper>
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
            <Form.Item label="Şirket Ünvanı" rules={[{ required: true }]} name="company">
              <Input placeholder="Şirket Ünvanı" />
            </Form.Item>
            <Row gutter={24}>
              <Col span={12}>
                <CountrySelect rules={[{ required: true }]} name="companyCountry" />
              </Col>
              <Col span={12}>
                <CitySelect rules={[{ required: true }]} name="companyCity" />
              </Col>
            </Row>
            <Form.Item label="Adres" rules={[{ required: true }]} name="companyAddress">
              <Input.TextArea placeholder="Adres" rows={3} />
            </Form.Item>
            <Form.Item rules={[{ required: true }]} name="billAddress" label="Fatura Adresi">
              <Radio.Group className="flex flex-col">
                <Radio value={TaxAddress.Company}> Bu adresi fatura adresim olarak kullan </Radio>
                <Radio className="mt-3" value={TaxAddress.Bill}>
                  Başka bir fatura adresi belirle{' '}
                </Radio>
              </Radio.Group>
            </Form.Item>
            {billAddress === TaxAddress.Bill && (
              <>
                <Row gutter={24}>
                  <Col span={12}>
                    <CountrySelect rules={[{ required: true }]} name="billCountry" />
                  </Col>
                  <Col span={12}>
                    <CitySelect rules={[{ required: true }]} name="billCity" />
                  </Col>
                </Row>
                <Form.Item label="Adres" rules={[{ required: true }]} name="billAddressTextarea">
                  <Input.TextArea placeholder="Adres" rows={3} />
                </Form.Item>
              </>
            )}
            <Row gutter={24}>
              <Col span={12}>
                <TaxOfficeSelect
                  name="taxOffice"
                  rules={[{ required: true }]}
                  country={billAddress === TaxAddress.Company ? companyCountry : billCountry}
                  city={billAddress === TaxAddress.Company ? companyCity : billCity}
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
    </FallbackPageWrapper>
  );
}
