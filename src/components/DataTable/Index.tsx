import type { PaginationProps } from 'antd';
import { Pagination, Table } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';

import ProjectSelect from '@/components/ProjectSelect/Index';
import { useDataTableQuery } from '@/store/api/company/api';

import BlurScreen from '../BlurScreen';

export default function Index({
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
            <ProjectSelect onChange={(value) => setSelectProjectId(value)} selectedDefault rootClassName="w-96" selectClassName="h-11" />
          )}
        </div>
      </div>
      {projectidSelect ? (
        projectid ? (
          <CustomTable
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
          url={url}
          columns={columns}
          customRender={customRender}
          customRenderOverlayClassname={customRenderOverlayClassname}
          setLoading={setLoading}
        />
      )}
    </>
  );
}

const CustomTable = ({
  projectid,
  url,
  columns,
  customRender,
  customRenderOverlayClassname,
  setLoading
}: {
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
  const [skip, setSkip] = useState<number>(0);

  const take = 20;

  const { data, isLoading } = useDataTableQuery({
    skip,
    take,
    projectid,
    url
  });

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  const onChange: PaginationProps['onChange'] = (pageNumber) => {
    console.log('Page: ', pageNumber);
    setSkip(Number(pageNumber - 1) * take);
  };

  const pagination = useMemo(
    () => (
      <Pagination
        className="mt-5"
        showQuickJumper
        defaultCurrent={1}
        pageSize={take}
        showSizeChanger={false}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        total={(data as any)?.totalCount as number}
        showTotal={(total) => `Toplam ${total} kayıt`}
        onChange={onChange}
      />
    ),
    [data]
  );

  if (customRender) {
    if (data) {
      return (
        <>
          <div className={customRenderOverlayClassname}>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {(data as any)?.data.map((item: never) => customRender(item))}
          </div>
          {pagination}
        </>
      );
    }
    return null;
  }

  return (
    <>
      <Table
        className="rounded border"
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
      {pagination}
    </>
  );
};
