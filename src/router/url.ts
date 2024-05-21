// auth
const LOGIN = '/login';
const REGISTER = '/register';

// routes
const INDEX = '/';

const DETAIL = 'detail/:id';
const EDIT = 'edit/:id';

const ADDRESS = 'address';
const COMPANY = 'company';
const DRIVER_INVENTORY = 'driver-inventory';
const PROJECT = 'project';
const USER = 'user';
const VEHICLE = 'vehicle';

export const ROUTES = {
  INDEX: { PATH: INDEX },
  LOGIN: { PATH: LOGIN },
  REGISTER: { PATH: REGISTER },

  ADDRESS: {
    PATH: ADDRESS,
    DETAIL: { PATH: DETAIL },
    EDIT: { PATH: EDIT }
  },

  COMPANY: {
    PATH: COMPANY,
    EDIT: { PATH: `${COMPANY}/${EDIT.replace(':id', '')}` }
  },

  DRIVER_INVENTORY: {
    PATH: DRIVER_INVENTORY,
    DETAIL: { PATH: DETAIL },
    EDIT: { PATH: EDIT }
  },

  PROJECT: {
    PATH: PROJECT,
    DETAIL: { PATH: DETAIL },
    EDIT: { PATH: EDIT }
  },

  USER: {
    PATH: USER,
    DETAIL: { PATH: DETAIL },
    EDIT: { PATH: EDIT }
  },

  VEHICLE: {
    PATH: VEHICLE,
    DETAIL: { PATH: DETAIL },
    EDIT: { PATH: EDIT }
  }
};

export const URLS = {
  INDEX,
  LOGIN,
  REGISTER,

  ADDRESS: `/${ADDRESS}`,
  ADDRESS_DETAIL: (id: string) => `/${ADDRESS}/${DETAIL.replace(':id', id)}`,
  ADDRESS_EDIT: (id: string) => `/${ADDRESS}/${EDIT.replace(':id', id)}`,

  COMPANY: `/${COMPANY}`,
  COMPANY_EDIT: `/${COMPANY}/${EDIT.replace('/:id', '')}`,

  DRIVER_INVENTORY: `/${DRIVER_INVENTORY}`,
  DRIVER_INVENTORY_DETAIL: (id: string) => `/${DRIVER_INVENTORY}/${DETAIL.replace(':id', id)}`,
  DRIVER_INVENTORY_EDIT: (id: string) => `/${DRIVER_INVENTORY}/${EDIT.replace(':id', id)}`,

  PROJECT: `/${PROJECT}`,
  PROJECT_DETAIL: (id: string) => `/${PROJECT}/${DETAIL.replace(':id', id)}`,
  PROJECT_EDIT: (id: string) => `/${PROJECT}/${EDIT.replace(':id', id)}`,

  USER: `/${USER}`,
  USER_DETAIL: (id: string) => `/${USER}/${DETAIL.replace(':id', id)}`,
  USER_EDIT: (id: string) => `/${USER}/${EDIT.replace(':id', id)}`,

  VEHICLE: `/${VEHICLE}`,
  VEHICLE_DETAIL: (id: string) => `/${VEHICLE}/${DETAIL.replace(':id', id)}`,
  VEHICLE_EDIT: (id: string) => `/${VEHICLE}/${EDIT.replace(':id', id)}`
};
