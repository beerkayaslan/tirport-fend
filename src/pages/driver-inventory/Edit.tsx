import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Col, DatePicker, Form, message, Modal, Row } from 'antd';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

import { DriverInventoryIcon } from '@/assets/icons';
import Button from '@/components/Button/Button';
import FallbackPageWrapper from '@/components/Fallback/FallbackPageWrapper';
import InputPhone from '@/components/InputPhone/Index';
import ProjectSelect from '@/components/ProjectSelect/Index';
import { URLS } from '@/router/url';
import { useCompanyDriverAddMutation } from '@/store/api/company/api';
import { Response } from '@/types/utils';

interface CompanyDriverAdd {
  projectId: string;
  drivers: {
    phone: string;
    contractEndDate: string;
  }[];
}

export default function Edit() {
  const [driverAdd] = useCompanyDriverAddMutation();

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
        bulk: values.drivers
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
      <div className="mb-8 flex items-center gap-x-2.5">
        <DriverInventoryIcon />
        <span className="text-lg font-semibold">Sürücü Ekle</span>
      </div>
      <Form onFinish={onFinish} autoComplete="off" layout="vertical">
        <ProjectSelect
          rules={[{ required: true }]}
          label="Proje Seçiniz"
          name="projectId"
          rootClassName="!mb-6 w-1/2"
        />
        <Form.List name="drivers">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Row key={key} gutter={50}>
                  <Col span={12}>
                    <InputPhone
                      name={[name, 'phone']}
                      rules={[{ required: true }]}
                      label="Telefon Numarası"
                      {...restField}
                    />
                  </Col>
                  <Col span={11}>
                    <Form.Item
                      {...restField}
                      label="Sözleşme Bitiş Tarihi"
                      name={[name, 'contractEndDate']}
                      rules={[{ required: true }]}
                    >
                      <DatePicker className="w-full" maxDate={dayjs().endOf('day')} />
                    </Form.Item>
                  </Col>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Row>
              ))}
              <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                1 Kişi daha ekle
              </Button>
            </>
          )}
        </Form.List>
        <div className="flex justify-end">
          <Button htmlType="submit">Kaydet</Button>
        </div>
      </Form>
    </FallbackPageWrapper>
  );
}
