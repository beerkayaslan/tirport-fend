import { Form, Select } from 'antd';
import { FormItemProps } from 'antd/lib';

import { useCityGetQuery } from '@/store/api/general/api';

export default function CitySelect({
  value,
  ...props
}: FormItemProps & {
  value?: string | number;
}) {
  const { data, isLoading } = useCityGetQuery({ take: 20, skip: 30, country: 'TURKEY' });

  // rename array list id to value and name to label
  const options = data?.data.map((item) => ({ value: item.id, label: item.name }));
  return (
    <Form.Item {...props}>
      <Select options={options} loading={isLoading} value={value} placeholder="Seçiniz" />
    </Form.Item>
  );
}
