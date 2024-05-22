import { Form, Select } from 'antd';
import { FormItemProps } from 'antd/lib';

import { useProjectsGetQuery } from '@/store/api/company/api';

export default function ProjectSelect({
  value,
  selectClassName,
  selectedDefault,
  ...props
}: FormItemProps & {
  value?: string | number;
  selectClassName?: string;
  selectedDefault?: boolean;
}) {
  const { data, isLoading } = useProjectsGetQuery({ take: 10, skip: 0 });

  // rename array list id to value and name to label
  const options = data?.data.map((item) => ({ value: item.id, label: item.name }));

  return (
    <Form.Item {...props} className="!mb-0">
      <Select
        loading={isLoading}
        className={selectClassName}
        options={options}
        value={value || (selectedDefault && options?.[0].value)}
        placeholder="Proje Seçiniz"
      />
    </Form.Item>
  );
}
