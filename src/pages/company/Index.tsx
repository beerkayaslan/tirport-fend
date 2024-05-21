import { Avatar } from 'antd';
import { Link } from 'react-router-dom';

import { BillInformationIcon, CompanyDetailInfoIcon, CompanyInfoIcon } from '@/assets/icons';
import FallbackPageWrapper from '@/components/Fallback/FallbackPageWrapper';
import { URLS } from '@/router/url';

export default function Company() {
  return (
    <FallbackPageWrapper>
      <div className="mb-8 flex items-center gap-x-2.5">
        <CompanyInfoIcon />
        <span className="text-lg font-semibold">Şirket Bilgileri</span>
      </div>
      <div className=" flex items-center gap-x-4">
        <Avatar size={60} className="bg-secondary">
          AÖ
        </Avatar>
        <div>
          <b className="mb-1 block text-base">Alp Özler Uluslarası Nakliyat Tah. Tic. Ltd. Şti.</b>
          <div>
            <b>TIRPORT Şirket ID: </b>
            <span>190120312498213</span>
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
          <div className="font-semibold">Company 2</div>
        </div>
        <div className="flex">
          <div className="w-40">Ülke:</div>
          <div className="font-semibold">Turkiye</div>
        </div>
        <div className="flex">
          <div className="w-40">İl:</div>
          <div className="font-semibold">İstanbul</div>
        </div>
        <div className="flex">
          <div className="w-40">Adres:</div>
          <div className="font-semibold">123 Business Rd 2</div>
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
          <div className="font-semibold">KADIKOY</div>
        </div>
        <div className="flex">
          <div className="w-40">Vergi Numarası:</div>
          <div className="font-semibold">1240567892</div>
        </div>
        <div className="flex">
          <div className="w-40">Ülke:</div>
          <div className="font-semibold">TURKEY</div>
        </div>
        <div className="flex">
          <div className="w-40">İl:</div>
          <div className="font-semibold">İstanbul</div>
        </div>
        <div className="flex">
          <div className="w-40">Açık Adres:</div>
          <div className="font-semibold">123 Business Rd 2</div>
        </div>
      </div>
      <div className="flex justify-end">
        <Link to="#" className="!text-red-500 underline">
          Hesabı Sil
        </Link>
      </div>
    </FallbackPageWrapper>
  );
}
