import { Table } from 'antd';
import React from 'react';

import { useDataTableQuery } from '@/store/api/company/api';

export default function Index({
  url,
  columns,
  projectid
}: {
  url: string;
  projectid?: string;
  columns: {
    render?: (data: never) => JSX.Element | React.ReactNode | string | number | null;
    title: string;
    key?: string;
  }[];
}) {
  const [query, setQuery] = React.useState({
    skip: 0,
    take: 20
  });

  const { data, isLoading } = useDataTableQuery({
    ...query,
    projectid,
    url
  });

  return (
    <Table
      columns={columns.map((column) => ({
        title: column.title,
        dataIndex: column.key,
        key: column.key,
        render: (text, record: never) => (column.render ? column.render(record) : text)
      }))}
      loading={isLoading}
      dataSource={
        data?.data.map((item: never, index: never) => ({
          ...item,
          key: index
        })) || []
      }
      pagination={false}
    />
  );
}
