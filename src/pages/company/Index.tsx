import { Avatar } from 'antd';
import { Link } from 'react-router-dom';

import { BillInformationIcon, CompanyDetailInfoIcon, CompanyInfoIcon } from '@/assets/icons';
import BlurScreen from '@/components/BlurScreen';
import { URLS } from '@/router/url';
import { useCompanyInformationQuery } from '@/store/api/company/api';

export function Component() {
  const { data, isLoading } = useCompanyInformationQuery();

  return (
    <>
      {isLoading && <BlurScreen />}
      <div className="mb-8 flex items-center gap-x-2.5">
        <CompanyInfoIcon />
        <span className="text-lg font-semibold">Şirket Bilgileri</span>
      </div>
      <div className=" flex items-center gap-x-4">
        <Avatar size={60} className="bg-secondary">
          AÖ
        </Avatar>
        <div>
          <b className="mb-1 block text-base">{data?.name}</b>
          <div>
            <b>TIRPORT Şirket ID: </b>
            <span>{data?.id}</span>
          </div>
        </div>
      </div>
      <hr className="my-10" />
      <div className="flex items-center justify-between">
        <div className="mb-8 flex items-center gap-x-2.5">
          <CompanyDetailInfoIcon />
          <span className="text-lg font-semibold">Şirket Detay Bilgileri</span>
        </div>
        <Link to={URLS.COMPANY_EDIT} className="text-base underline">
          Düzenle
        </Link>
      </div>
      <div className="flex flex-col gap-y-3">
        <div className="flex">
          <div className="w-40">Şirket Unvanı:</div>
          <div className="font-semibold">{data?.name}</div>
        </div>
        <div className="flex">
          <div className="w-40">Ülke:</div>
          <div className="font-semibold">{data?.companyCountry.name}</div>
        </div>
        <div className="flex">
          <div className="w-40">İl:</div>
          <div className="font-semibold">{data?.companyCity.name}</div>
        </div>
        <div className="flex">
          <div className="w-40">Adres:</div>
          <div className="font-semibold">{data?.companyAddress}</div>
        </div>
      </div>
      <hr className="my-10" />
      <div className="mb-8 flex items-center gap-x-2.5">
        <BillInformationIcon />
        <span className="text-lg font-semibold">Fatura Bilgileri</span>
      </div>
      <div className="flex flex-col gap-y-3">
        <div className="flex">
          <div className="w-40">Vergi Dairesi:</div>
          <div className="font-semibold">{data?.taxOffice.name}</div>
        </div>
        <div className="flex">
          <div className="w-40">Vergi Numarası:</div>
          <div className="font-semibold">{data?.taxId}</div>
        </div>
        <div className="flex">
          <div className="w-40">Ülke:</div>
          <div className="font-semibold">{data?.invoiceCountry.name}</div>
        </div>
        <div className="flex">
          <div className="w-40">İl:</div>
          <div className="font-semibold">{data?.invoiceCity.name}</div>
        </div>
        <div className="flex">
          <div className="w-40">Açık Adres:</div>
          <div className="font-semibold">{data?.invoiceAddress}</div>
        </div>
      </div>
      <div className="flex justify-end">
        <Link to="#" className="!text-red-500 underline">
          Hesabı Sil
        </Link>
      </div>
    </>
  );
}
