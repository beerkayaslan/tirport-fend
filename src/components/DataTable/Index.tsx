import { Table } from 'antd';
import React, { memo, useState } from 'react';

import ProjectSelect from '@/components/ProjectSelect/Index';
import { useDataTableQuery } from '@/store/api/company/api';

import BlurScreen from '../BlurScreen';

export default memo(function Index({
  url,
  columns,
  projectidSelect,
  headerLeft,
  headerRight,
  customRender,
  customRenderOverlayClassname
}: {
  url: string;
  projectidSelect?: boolean;
  headerLeft?: JSX.Element | React.ReactNode | string | number | null;
  headerRight?: JSX.Element | React.ReactNode | string | number | null;
  customRender?: (data: never) => JSX.Element | React.ReactNode | string | number | null;
  customRenderOverlayClassname?: string;
  columns?: {
    render?: (data: never) => JSX.Element | React.ReactNode | string | number | null;
    title: string;
    key?: string;
  }[];
}) {
  const [query, setQuery] = useState({
    skip: 0,
    take: 20
  });

  const [loading, setLoading] = useState(true);

  const [projectid, setSelectProjectId] = useState<string | undefined>(undefined);

  return (
    <>
      {loading && <BlurScreen />}
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
          <CustomTable
            query={query}
            projectid={projectid}
            url={url}
            columns={columns}
            customRender={customRender}
            customRenderOverlayClassname={customRenderOverlayClassname}
            setLoading={setLoading}
          />
        ) : null
      ) : (
        <CustomTable
          query={query}
          url={url}
          columns={columns}
          customRender={customRender}
          customRenderOverlayClassname={customRenderOverlayClassname}
          setLoading={setLoading}
        />
      )}
    </>
  );
});

const CustomTable = ({
  query,
  projectid,
  url,
  columns,
  customRender,
  customRenderOverlayClassname,
  setLoading
}: {
  query: { skip: number; take: number };
  projectid?: string | undefined;
  url: string;
  setLoading: (value: boolean) => void;
  customRenderOverlayClassname?: string;
  customRender?: (data: never) => JSX.Element | React.ReactNode | string | number | null;
  columns?: {
    render?: (data: never) => JSX.Element | React.ReactNode | string | number | null;
    title: string;
    key?: string;
  }[];
}) => {
  const { data, isLoading } = useDataTableQuery({
    ...query,
    projectid,
    url
  });

  setLoading(isLoading);

  if (customRender) {
    if (data) {
      return (
        <div className={customRenderOverlayClassname}>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {(data as any)?.data.map((item: never) => customRender(item))}
        </div>
      );
    }
    return null;
  }

  return (
    <Table
      columns={columns?.map((column) => ({
        title: column.title,
        dataIndex: column.key,
        key: column.key,
        render: (text, record: never) => (column.render ? column.render(record) : text)
      }))}
      loading={isLoading}
      dataSource={
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (data as any)?.data.map((item: never, index: never) => ({
          ...(item as object),
          key: index
        })) || []
      }
      pagination={false}
    />
  );
};
