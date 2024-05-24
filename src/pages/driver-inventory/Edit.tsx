import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Col, DatePicker, Form, message, Modal, Row, Switch, Tooltip } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { DriverInventoryIcon } from '@/assets/icons';
import BlurScreen from '@/components/BlurScreen';
import Button from '@/components/Button/Button';
import InputPhone from '@/components/InputPhone/Index';
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

export function Component() {
  const [driverAdd, { isLoading }] = useCompanyDriverAddMutation();

  const navigate = useNavigate();
  const [indefinite, setIndefinite] = useState<boolean[]>([]);

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
    <>
      {isLoading && <BlurScreen />}
      <div className="mb-8 flex items-center gap-x-2.5">
        <DriverInventoryIcon />
        <span className="text-lg font-semibold">Sürücü Ekle</span>
      </div>
      <Form onFinish={onFinish} autoComplete="off" layout="vertical">
        <ProjectSelect rules={[{ required: true }]} label="Proje Seçiniz" name="projectId" rootClassName="!mb-6 w-1/2" />
        <Form.List
          name="drivers"
          rules={[
            {
              validator: async (_, drivers) => {
                if (!drivers || drivers.length < 1) {
                  return Promise.reject(new Error(''));
                }
              }
            }
          ]}
          initialValue={[{ phone: '', contractEndDate: '', isIndefinite: false }]}
        >
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => (
                <div key={key} className="border-t pt-8">
                  <Row gutter={50}>
                    <Col span={12}>
                      <InputPhone name={[name, 'phone']} rules={[{ required: true }]} required label="Telefon Numarası" {...restField} />
                    </Col>
                    <Col span={11}>
                      <Form.Item
                        shouldUpdate={(prevValues, curValues) =>
                          prevValues.drivers[index]?.isIndefinite !== curValues.drivers[index]?.isIndefinite
                        }
                        className="!mb-0"
                      >
                        {() => (
                          <Form.Item
                            {...restField}
                            label="Sözleşme Bitiş Tarihi"
                            name={[name, 'contractEndDate']}
                            rules={[{ required: !indefinite[index] }]}
                          >
                            <DatePicker className="w-full" disabled={indefinite[index]} minDate={dayjs().endOf('day')} />
                          </Form.Item>
                        )}
                      </Form.Item>
                      <div className="mb-5 flex items-center">
                        <Form.Item {...restField} name={[name, 'isIndefinite']} rootClassName="!mb-0">
                          <Switch
                            checked={indefinite[index]}
                            onChange={(checked) => {
                              const newIndefinite = [...indefinite];
                              newIndefinite[index] = checked;
                              setIndefinite(newIndefinite);
                            }}
                          />
                        </Form.Item>
                        <span className="ml-2 ">Bitiş tarihini süresiz olarak belirle</span>
                      </div>
                    </Col>
                    <div className="flex items-center justify-center">
                      {fields.length > 1 ? (
                        <Tooltip title="Kaldır">
                          <MinusCircleOutlined className="text-lg text-red-500" onClick={() => remove(name)} />
                        </Tooltip>
                      ) : null}
                    </div>
                  </Row>
                </div>
              ))}
              <Button
                type="dashed"
                onClick={() => {
                  add();
                  setIndefinite([...indefinite, false]);
                }}
                icon={<PlusOutlined />}
              >
                1 Kişi daha ekle
              </Button>
            </>
          )}
        </Form.List>
        <div className="flex justify-end">
          <Button htmlType="submit">Kaydet</Button>
        </div>
      </Form>
    </>
  );
}
