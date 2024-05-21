import { Form, Input, Radio } from 'antd';

import { CompanyInfoIcon } from '@/assets/icons';
import Button from '@/components/Button/Button';
import CitySelect from '@/components/CitySelect/Index';
import CountrySelect from '@/components/CountrySelect/Index';
import FallbackPageWrapper from '@/components/Fallback/FallbackPageWrapper';
import TaxOfficeSelect from '@/components/TaxOfficeSelect/Index';

export default function CompanyEdit() {
  const [form] = Form.useForm();

  // watch
  const country = Form.useWatch('companyCountry', form);
  const city = Form.useWatch('companyCity', form);

  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <FallbackPageWrapper>
      <div className="mb-8 flex items-center gap-x-2.5">
        <CompanyInfoIcon />
        <span className="text-lg font-semibold">Şirket Bilgileri</span>
      </div>
      <Form requiredMark layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item label="Şirket Ünvanı" rules={[{ required: true }]} name="company">
          <Input placeholder="Şirket Ünvanı" />
        </Form.Item>
        <CountrySelect rules={[{ required: true }]} name="companyCountry" />
        <CitySelect rules={[{ required: true }]} name="companyCity" />
        <Form.Item label="Adres" rules={[{ required: true }]} name="companyAddress">
          <Input.TextArea placeholder="Adres" rows={3} />
        </Form.Item>
        <Form.Item rules={[{ required: true }]} name="billAddress" label="Fatura Adresi">
          <Radio.Group className="flex flex-col">
            <Radio value="1"> Bu adresi fatura adresim olarak kullan </Radio>
            <Radio className="mt-3" value="2">
              Başka bir fatura adresi belirle{' '}
            </Radio>
          </Radio.Group>
        </Form.Item>
        <TaxOfficeSelect
          name="taxOffice"
          rules={[{ required: true }]}
          country={country}
          city={city}
        />
        <Form.Item label="Vergi Numarası" rules={[{ required: true }]} name="taxId">
          <Input placeholder="Vergi Numarası" />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">Kaydet</Button>
        </Form.Item>
      </Form>
    </FallbackPageWrapper>
  );
}
