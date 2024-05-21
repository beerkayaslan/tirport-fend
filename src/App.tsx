import 'dayjs/locale/tr';

import { ConfigProvider } from 'antd';
import trTR from 'antd/locale/tr_TR';
import dayjs from 'dayjs';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import AuthProvider from '@/providers/AuthProvider';
import Router from '@/router/Router';
import { store } from '@/store/index';

dayjs.locale('tr');

function App() {
  return (
    <Provider store={store}>
      <ConfigProvider
        locale={trTR}
        theme={{
          token: {
            colorPrimary: '#002E6D',
            colorPrimaryText: '#002E6D',
            colorText: '#002E6D',
            colorTextBase: '#002E6D',
            fontFamily: 'Montserrat, sans-serif'
          }
        }}
      >
        <AuthProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </AuthProvider>
      </ConfigProvider>
    </Provider>
  );
}

export default App;
