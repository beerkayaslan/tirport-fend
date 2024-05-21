import { Select } from 'antd';

import { useTaxOfficeGetQuery } from '@/store/api/general/api';

export default function TaxOfficeSelect({
  value,
  city,
  country
}: {
  city: string;
  country: string;
  value?: string;
}) {
  const { data } = useTaxOfficeGetQuery({ take: 10, skip: 0, city, country });

  if (!city || !country) {
    return null;
  }

  console.log(data);

  return null;

  // rename array list id to value and name to label
  // const options = data?.data.map((item) => ({ value: item.id, label: item.name }));

  // return <Select options={options} value={value} placeholder="Seçiniz"></Select>;
}
