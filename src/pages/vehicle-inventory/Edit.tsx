import { Col, DatePicker, Form, message, Modal } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { VehicleInventoryIcon } from '@/assets/icons';
import BlurScreen from '@/components/BlurScreen';
import Button from '@/components/Button/Button';
import FallbackPageWrapper from '@/components/Fallback/FallbackPageWrapper';
import ProjectSelect from '@/components/ProjectSelect/Index';
import { URLS } from '@/router/url';
import { useCompanyDriverAddMutation } from '@/store/api/company/api';
import { Response } from '@/types/utils';

interface CompanyDriverAdd {
  projectId: string;
  drivers: {
    phone: string;
    contractEndDate: string | null;
    isIndefinite: boolean;
  }[];
}

export default function Edit() {
  const [driverAdd, { isLoading }] = useCompanyDriverAddMutation();

  const navigate = useNavigate();

  const onFinish = (values: CompanyDriverAdd) => {
    Modal.confirm({
      title: 'Kaydetmek istediğinize emin misiniz?',
      onOk: () => sendHandle(values),
      footer: (_, { OkBtn, CancelBtn }) => (
        <>
          <CancelBtn />
          <OkBtn />
        </>
      )
    });
  };

  const sendHandle = (values: CompanyDriverAdd) => {
    driverAdd({
      body: {
        bulk: values.drivers.map((driver) => ({
          phone: driver.phone,
          contractEndDate: driver.isIndefinite ? null : driver.contractEndDate
        }))
      },
      projectId: values.projectId
    })
      .unwrap()
      .then(() => {
        message.success('Başarılı bir şekilde eklendi');
        navigate(URLS.DRIVER_INVENTORY);
      })
      .catch((err: Response) => {
        message.error(err.data.message);
      });
  };

  return (
    <FallbackPageWrapper>
      {isLoading && <BlurScreen />}
      <div className="mb-8 flex items-center gap-x-2.5">
        <VehicleInventoryIcon />
        <span className="text-lg font-semibold">Araç Ekle</span>
      </div>
      <Form onFinish={onFinish} layout="vertical">
        <ProjectSelect
          rules={[{ required: true }]}
          label="Proje Seçiniz"
          name="projectId"
          rootClassName="!mb-6 w-1/2"
        />

        <div className="flex justify-end">
          <Button htmlType="submit">Kaydet</Button>
        </div>
      </Form>
    </FallbackPageWrapper>
  );
}
