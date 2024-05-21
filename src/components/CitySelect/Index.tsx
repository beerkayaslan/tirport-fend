import { Select } from 'antd';

import { useCityGetQuery } from '@/store/api/general/api';

export default function CitySelect({ value }: { value?: string }) {
  const { data } = useCityGetQuery({ take: 10, skip: 0, country: 'TURKEY' });

  // rename array list id to value and name to label
  const options = data?.data.map((item) => ({ value: item.id, label: item.name }));

  return <Select options={options} value={value} placeholder="Seçiniz"></Select>;
}
