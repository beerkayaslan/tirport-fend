import "dayjs/locale/tr";

import { ConfigProvider } from "antd";
import trTR from "antd/locale/tr_TR";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import AuthProvider from "@/providers/AuthProvider";
import Router from "@/router/Router";
dayjs.locale("tr");
import Loader from "@/components/Loader";
import { RootState } from "@/store/index";
import { AuthStatusEnum } from "@/types/auth/type";

function App() {
  const AUTH_STATUS = useSelector(
    (state: RootState) => state.auth.AUTH_STATUS,
  ) as AuthStatusEnum;
  return (
    <>
      <ConfigProvider
        locale={trTR}
        theme={{
          token: {
            colorPrimary: "#002E6D",
          },
        }}
      >
        <AuthProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </AuthProvider>
      </ConfigProvider>
      {AUTH_STATUS === AuthStatusEnum.LOADING && <Loader />}
    </>
  );
}

export default App;
