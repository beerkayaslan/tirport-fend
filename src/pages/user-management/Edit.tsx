import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Col, Flex, Form, Input, message, Modal, Row, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';

import { CompanyMiniIcon, MailIcon, UsersIcon } from '@/assets/icons';
import BlurScreen from '@/components/BlurScreen';
import Button from '@/components/Button/Button';
import ProjectSelect from '@/components/ProjectSelect/Index';
import { URLS } from '@/router/url';
import { useCompanyInviteUserMutation } from '@/store/api/company/api';
import { Response } from '@/types/utils';

interface User {
  users: {
    email: string;
    projectIds: string[];
  }[];
}

export function Component() {
  const [inviteUser, { isLoading }] = useCompanyInviteUserMutation();
  const navigate = useNavigate();

  const onFinish = (values: User) => {
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
  const sendHandle = (values: User) => {
    inviteUser({
      bulk: values.users
    })
      .unwrap()
      .then(() => {
        message.success('Başarılı bir şekilde eklendi');
        navigate(URLS.USER_MANAGEMENT);
      })
      .catch((err: Response) => {
        message.error(err.data.message);
      });
  };

  return (
    <>
      {isLoading && <BlurScreen />}
      <div className="mb-8 flex items-center gap-x-2.5">
        <UsersIcon />
        <span className="text-lg font-semibold">Yeni Kullanıcı Ekle</span>
      </div>
      <Flex align="center" gap="small" className="mb-6">
        <InfoCircleOutlined />
        <span className="text-base text-primary-light">En fazla 10 e-posta adresi girebilirsiniz.</span>
      </Flex>
      <div className="mb-3 border-b pb-3">
        <Row gutter={32}>
          <Col span={12} className="flex items-center gap-x-2">
            <MailIcon />
            <b className="text-base">E-Posta</b>
          </Col>
          <Col span={12} className="flex items-center gap-x-2">
            <CompanyMiniIcon className="w-8" />
            <b className="text-base">Proje</b>
          </Col>
        </Row>
      </div>
      <Form onFinish={onFinish} autoComplete="off" layout="vertical">
        <Form.List name="users" initialValue={[{ email: '', projectIds: [] }]}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Row key={key} gutter={32} className="mb-0.5">
                  <Col span={12}>
                    <Form.Item
                      {...restField}
                      name={[name, 'email']}
                      rules={[
                        {
                          required: true,
                          type: 'email',
                          message: 'Geçerli bir e-posta adresi girin.'
                        }
                      ]}
                      label="E-Posta"
                    >
                      <Input placeholder="E-Posta" />
                    </Form.Item>
                  </Col>
                  <Col span={12} className="flex gap-x-5">
                    <ProjectSelect
                      label="Projeler"
                      rules={[{ required: true }]}
                      name={[name, 'projectIds']}
                      rootClassName="w-full flex-1"
                      selectClassName="w-full flex-1"
                      className="w-full flex-1"
                      mode="multiple"
                      {...restField}
                    />
                    <Flex align="center" justify="center">
                      {fields.length > 1 ? (
                        <Tooltip title="Kaldır">
                          <MinusCircleOutlined className="text-lg text-red-500" onClick={() => remove(name)} />
                        </Tooltip>
                      ) : null}
                    </Flex>
                  </Col>
                </Row>
              ))}

              <Button disabled={fields.length === 10} type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                1 Kişi daha ekle
              </Button>
            </>
          )}
        </Form.List>
        <Flex justify="flex-end">
          <Button htmlType="submit">Gönder</Button>
        </Flex>
      </Form>
    </>
  );
}
