import { Table } from 'antd';
import React, { memo } from 'react';

import ProjectSelect from '@/components/ProjectSelect/Index';
import { useDataTableQuery } from '@/store/api/company/api';

export default memo(function Index({
  url,
  columns,
  projectidSelect,
  headerLeft,
  headerRight
}: {
  url: string;
  projectidSelect?: boolean;
  headerLeft?: JSX.Element | React.ReactNode | string | number | null;
  headerRight?: JSX.Element | React.ReactNode | string | number | null;
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

  const [projectid, setSelectProjectId] = React.useState<string | undefined>(undefined);

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-x-2.5">{headerLeft}</div>
        <div className="flex items-center justify-center gap-x-4">
          {headerRight}
          {projectidSelect && (
            <ProjectSelect
              onChange={(value) => setSelectProjectId(value)}
              selectedDefault
              rootClassName="w-96"
              selectClassName="h-11"
            />
          )}
        </div>
      </div>
      {projectidSelect ? (
        projectid ? (
          <CustomTable query={query} projectid={projectid} url={url} columns={columns} />
        ) : null
      ) : (
        <CustomTable query={query} url={url} columns={columns} />
      )}
    </>
  );
});

const CustomTable = ({
  query,
  projectid,
  url,
  columns
}: {
  query: { skip: number; take: number };
  projectid?: string | undefined;
  url: string;
  columns: {
    render?: (data: never) => JSX.Element | React.ReactNode | string | number | null;
    title: string;
    key?: string;
  }[];
}) => {
  console.log('projectid', projectid);
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
};
