import { Form, Input, message } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { EyeIcon, EyeSlashIcon } from "@/assets/icons";
import loginLeftImg from "@/assets/imgs/loginleft.png";
import logo from "@/assets/imgs/logo.png";
import Button from "@/components/Button/Button";
import FallbackPageWrapper from "@/components/Fallback/FallbackPageWrapper";
import useEnterKeyPress from "@/hooks/useEnterKeyPress";
import { useLoginMutation } from "@/store/api/auth/api";
import { SET_USER_COOKIE } from "@/store/reducer/authSlice";
import { LoginRequestDto } from "@/types/auth/type";
import type { ResponseError } from "@/types/utils";

export default function Login() {
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
        message.success("Giriş başarılı");
        dispatch(SET_USER_COOKIE(res));
      })
      .catch((err: ResponseError) => {
        if (typeof err.data.message === "string") {
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
    <FallbackPageWrapper>
      <div className="flex min-h-screen flex-col justify-between lg:flex-row">
        <div
          className="relative hidden h-screen overflow-hidden bg-cover bg-center bg-no-repeat pl-24 pt-20 text-gray-200 lg:block lg:w-2/3"
          style={{ backgroundImage: `url(${loginLeftImg})` }}
        >
          <header>
            <a href="/">
              <img src={logo} className="h-16 object-contain" alt="Logo" />
            </a>
            <div className="mt-12 inline-block bg-primary px-2.5 py-1 text-4xl">
              Yükleriniz uçtan uca
            </div>
            <br />
            <span className="mt-4 inline-block bg-primary px-2.5 py-1 text-4xl font-semibold">
              TIRPORT GÜVENCESİNDE
            </span>
          </header>
        </div>
        <div className="flex flex-col bg-primary px-5 pt-10 text-gray-200 lg:w-1/2 xl:px-14">
          <div className="mx-auto w-full flex-1 pt-24">
            <header className="mb-8 flex items-center justify-between">
              <h3 className="text-2xl ">Giriş Yapın</h3>
              <Link
                to="/#"
                className="text-lg font-semibold text-inherit underline"
              >
                Hesap Oluştur
              </Link>
            </header>
            <Form onFinish={onFinish} form={form}>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Lütfen E-posta adresinizi giriniz!",
                  },
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
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Lütfen Şifrenizi giriniz!" },
                ]}
              >
                <Input.Password
                  placeholder="Şifre"
                  className="auth-password-input h-12 !border-gray-400 !bg-primary text-lg text-white placeholder:text-gray-300"
                  iconRender={(visible) => {
                    return (
                      <>
                        {visible ? (
                          <EyeIcon
                            onClick={() =>
                              setPasswordVisible((prevState) => !prevState)
                            }
                            className="cursor-pointer"
                          />
                        ) : (
                          <EyeSlashIcon
                            onClick={() =>
                              setPasswordVisible((prevState) => !prevState)
                            }
                            className="cursor-pointer"
                          />
                        )}
                      </>
                    );
                  }}
                  visibilityToggle={{
                    visible: passwordVisible,
                    onVisibleChange: setPasswordVisible,
                  }}
                />
              </Form.Item>
              <div className="mb-5 flex justify-end text-gray-300">
                <Link
                  to="/#"
                  className="cursor-pointer select-none text-base font-semibold text-inherit !underline"
                >
                  Şifremi Unuttum
                </Link>
              </div>
              <Form.Item>
                <Button
                  className="h-11 w-full text-base font-bold"
                  variant="white"
                  htmlType="submit"
                  loading={submitLoader}
                >
                  GİRİŞ YAP
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="pb-10">
            <nav className="flex flex-wrap items-center justify-center gap-x-11 ">
              <a href="#" className="text-sm">
                Kullanım &amp; Şartları
              </a>
              <a href="#" className="text-sm">
                Gizlilik Politikası
              </a>
              <a href="#" className="text-sm">
                Yardım
              </a>
            </nav>
            <p className="mt-6 text-center text-sm">
              Tırport ©{new Date().getFullYear()}{" "}
            </p>
          </div>
        </div>
      </div>
    </FallbackPageWrapper>
  );
}
