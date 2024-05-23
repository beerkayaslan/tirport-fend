import { Outlet } from 'react-router-dom';

import loginLeftImg from '@/assets/imgs/loginleft.png';
import logo from '@/assets/imgs/logo.png';

export default function AuthLayout() {
  return (
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
        <Outlet />
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
          <p className="mt-6 text-center text-sm">Tırport ©{new Date().getFullYear()} </p>
        </div>
      </div>
    </div>
  );
}
