import { Form, Select } from 'antd';
import { FormItemProps } from 'antd/lib';

import { useTaxOfficeGetQuery } from '@/store/api/general/api';

export default function TaxOfficeSelect({
  value,
  city,
  country,
  ...props
}: FormItemProps & {
  value?: string | number;
  city: string;
  country: string;
}) {
  const { data } = useTaxOfficeGetQuery({ take: 10, skip: 0, city, country });

  const options = data
    ? (data as unknown as { id: string; name: string; cityId: string; countryId: string }[]).map(
        (item) => ({
          label: item.name,
          value: item.id
        })
      )
    : [];

  return (
    <Form.Item label="Vergi Dairesi" {...props}>
      <Select options={options} value={value} placeholder="Seçiniz" />
    </Form.Item>
  );
}
