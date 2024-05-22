import { Form, Select, Skeleton } from 'antd';
import { FormItemProps } from 'antd/lib';
import { useEffect } from 'react';

import { useProjectsGetQuery } from '@/store/api/company/api';

export default function ProjectSelect({
  value,
  selectClassName,
  selectedDefault,
  onChange,
  ...props
}: FormItemProps & {
  value?: string | number;
  selectClassName?: string;
  selectedDefault?: boolean;
  onChange?: (value: string) => void;
}) {
  const { data, isLoading } = useProjectsGetQuery({ take: 20, skip: 0 });

  // rename array list id to value and name to label
  const options = data?.data.map((item) => ({ value: item.id, label: item.name }));

  useEffect(() => {
    if (selectedDefault) {
      onChange?.(data?.data[0].id as string);
    }
  }, [data]);

  if (!options) return <Skeleton.Input className={selectClassName} />;

  return (
    <Form.Item {...props} className="!mb-0">
      <Select
        loading={isLoading}
        className={selectClassName}
        options={options}
        defaultValue={value || (selectedDefault && options[0].value)}
        onChange={(value) => onChange?.(value as string)}
        placeholder="Proje Seçiniz"
      />
    </Form.Item>
  );
}
