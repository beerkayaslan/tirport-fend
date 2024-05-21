import { Form, Input, Radio } from 'antd';

import { CompanyInfoIcon } from '@/assets/icons';
import CountrySelect from '@/components/CountrySelect/Index';
import FallbackPageWrapper from '@/components/Fallback/FallbackPageWrapper';

export default function CompanyEdit() {
  return (
    <FallbackPageWrapper>
      <div className="mb-8 flex items-center gap-x-2.5">
        <CompanyInfoIcon />
        <span className="text-lg font-semibold">Şirket Bilgileri</span>
      </div>
      <Form requiredMark layout="vertical">
        <Form.Item label="Şirket Ünvanı" required>
          <Input placeholder="Şirket Ünvanı" />
        </Form.Item>
        <CountrySelect />
      </Form>
    </FallbackPageWrapper>
  );
}
