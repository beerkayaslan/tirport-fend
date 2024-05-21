import { Form, Input, Radio } from 'antd';

import { CompanyInfoIcon } from '@/assets/icons';
import CitySelect from '@/components/CitySelect/Index';
import CountrySelect from '@/components/CountrySelect/Index';
import FallbackPageWrapper from '@/components/Fallback/FallbackPageWrapper';
import TaxOfficeSelect from '@/components/TaxOfficeSelect/Index';

export default function CompanyEdit() {
  return (
    <FallbackPageWrapper>
      <div className="mb-8 flex items-center gap-x-2.5">
        <CompanyInfoIcon />
        <span className="text-lg font-semibold">Şirket Bilgileri</span>
      </div>
      <Form requiredMark layout="vertical">
        <Form.Item label="Şirket Ünvanı" required name="company">
          <Input placeholder="Şirket Ünvanı" />
        </Form.Item>
        <Form.Item label="Ülke" required name="companyCountry">
          <CountrySelect />
        </Form.Item>
        <Form.Item label="Şehir" required name="companyCountry">
          <CitySelect />
        </Form.Item>
        <Form.Item label="Adres" required name="companyAddress">
          <Input.TextArea placeholder="Adres" rows={3} />
        </Form.Item>
        <Form.Item>
          <Radio.Group className="flex flex-col">
            <Radio value="1"> Bu adresi fatura adresim olarak kullan </Radio>
            <Radio className="mt-3" value="2">
              Başka bir fatura adresi belirle{' '}
            </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <TaxOfficeSelect country="TURKEY" city="34" />
        </Form.Item>
      </Form>
    </FallbackPageWrapper>
  );
}
