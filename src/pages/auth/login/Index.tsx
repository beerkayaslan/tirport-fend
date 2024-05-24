import { Form, Input, message } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { EyeIcon, EyeSlashIcon } from '@/assets/icons';
import Button from '@/components/Button/Button';
import useEnterKeyPress from '@/hooks/useEnterKeyPress';
import { useLoginMutation } from '@/store/api/auth/api';
import { SET_USER_COOKIE } from '@/store/reducer/authSlice';
import { LoginRequestDto } from '@/types/auth/type';
import type { Response } from '@/types/utils';

export function Component() {
  const [loginMutate] = useLoginMutation();
  const [submitLoader, setSubmitLoader] = useState(false);
  const dispatch = useDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [form] = Form.useForm();

  const onFinish = async (values: LoginRequestDto) => {
    setSubmitLoader(true);
    await loginMutate(values)
      .unwrap()
      .then((res) => {
        message.success('Giriş başarılı');
        dispatch(SET_USER_COOKIE(res));
      })
      .catch((err: Response) => {
        if (typeof err.data.message === 'string') {
          message.error(err.data.message);
        }
        if (Array.isArray(err.data.message)) {
          err.data.message.forEach((msg) => {
            message.error(msg);
          });
        }
        setSubmitLoader(false);
      });
  };

  useEnterKeyPress(form.submit);

  return (
    <div className="mx-auto w-full flex-1 pt-24">
      <header className="mb-8 flex items-center justify-between">
        <h3 className="text-2xl ">Giriş Yapın</h3>
        <Link to="#" className="text-lg font-semibold text-inherit underline">
          Hesap Oluştur
        </Link>
      </header>
      <Form onFinish={onFinish} form={form}>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Lütfen E-posta adresinizi giriniz!'
            }
          ]}
          className="mb-7"
        >
          <Input
            className=" h-12 !border-gray-400 !bg-primary text-lg text-white placeholder:text-gray-300"
            placeholder="E-posta"
            type="email"
            autoFocus
          />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: 'Lütfen Şifrenizi giriniz!' }]}>
          <Input.Password
            placeholder="Şifre"
            className="auth-password-input h-12 !border-gray-400 !bg-primary text-lg text-white placeholder:text-gray-300"
            iconRender={(visible) => {
              return (
                <>
                  {visible ? (
                    <EyeIcon onClick={() => setPasswordVisible((prevState) => !prevState)} className="cursor-pointer" />
                  ) : (
                    <EyeSlashIcon onClick={() => setPasswordVisible((prevState) => !prevState)} className="cursor-pointer" />
                  )}
                </>
              );
            }}
            visibilityToggle={{
              visible: passwordVisible,
              onVisibleChange: setPasswordVisible
            }}
          />
        </Form.Item>
        <div className="mb-5 flex justify-end text-gray-300">
          <Link to="/#" className="cursor-pointer select-none text-base font-semibold text-inherit !underline">
            Şifremi Unuttum
          </Link>
        </div>
        <Form.Item>
          <Button className="h-11 w-full font-bold" variant="white" htmlType="submit" loading={submitLoader}>
            GİRİŞ YAP
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
