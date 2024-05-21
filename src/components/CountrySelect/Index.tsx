import { Form, Select } from 'antd';
import { FormItemProps } from 'antd/lib';

import { useContryGetQuery } from '@/store/api/general/api';

export default function CountrySelect({
  value,
  ...props
}: FormItemProps & {
  value?: string | number;
}) {
  const { data } = useContryGetQuery({ take: 10, skip: 0 });

  // rename array list id to value and name to label
  const options = data?.data.map((item) => ({ value: item.id, label: item.name }));
  return (
    <Form.Item {...props}>
      <Select options={options} value={value} placeholder="Seçiniz" />
    </Form.Item>
  );
}
