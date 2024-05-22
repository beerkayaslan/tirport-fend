import { Form, Select } from 'antd';
import { FormItemProps } from 'antd/lib';

import { useProjectsGetQuery } from '@/store/api/company/api';

export default function ProjectSelect({
  value,
  selectClassName,
  ...props
}: FormItemProps & {
  value?: string | number;
  selectClassName?: string;
  selectedDefault?: boolean;
}) {
  const { data } = useProjectsGetQuery({ take: 10, skip: 0 });

  // rename array list id to value and name to label
  const options = data?.data.map((item) => ({ value: item.id, label: item.name }));

  return (
    <Form.Item {...props} className="!mb-0">
      <Select
        className={selectClassName}
        options={options}
        value={value}
        placeholder="Proje Seçiniz"
      />
    </Form.Item>
  );
}
