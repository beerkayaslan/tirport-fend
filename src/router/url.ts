// auth
const LOGIN = "/login";
const REGISTER = "/register";

// routes
const INDEX = "/";

const DETAIL = "detail/:id";
const EDIT = "edit/:id";

const ADDRESS = "address";
const COMPANY = "company";
const DRIVER = "driver";
const PROJECT = "project";
const USER = "user";
const VEHICLE = "vehicle";

export const ROUTES = {
  INDEX: { PATH: INDEX },
  LOGIN: { PATH: LOGIN },
  REGISTER: { PATH: REGISTER },

  ADDRESS: {
    PATH: ADDRESS,
    DETAIL: { PATH: DETAIL },
    EDIT: { PATH: EDIT },
  },

  COMPANY: {
    PATH: COMPANY,
    DETAIL: { PATH: DETAIL },
    EDIT: { PATH: EDIT },
  },

  DRIVER: {
    PATH: DRIVER,
    DETAIL: { PATH: DETAIL },
    EDIT: { PATH: EDIT },
  },

  PROJECT: {
    PATH: PROJECT,
    DETAIL: { PATH: DETAIL },
    EDIT: { PATH: EDIT },
  },

  USER: {
    PATH: USER,
    DETAIL: { PATH: DETAIL },
    EDIT: { PATH: EDIT },
  },

  VEHICLE: {
    PATH: VEHICLE,
    DETAIL: { PATH: DETAIL },
    EDIT: { PATH: EDIT },
  },
};

export const URLS = {
  INDEX,
  LOGIN,
  REGISTER,

  ADDRESS: `/${ADDRESS}`,
  ADDRESS_DETAIL: (id: string) => `/${ADDRESS}/${DETAIL.replace(":id", id)}`,
  ADDRESS_EDIT: (id: string) => `/${ADDRESS}/${EDIT.replace(":id", id)}`,

  COMPANY: `/${COMPANY}`,
  COMPANY_DETAIL: (id: string) => `/${COMPANY}/${DETAIL.replace(":id", id)}`,
  COMPANY_EDIT: (id: string) => `/${COMPANY}/${EDIT.replace(":id", id)}`,

  DRIVER: `/${DRIVER}`,
  DRIVER_DETAIL: (id: string) => `/${DRIVER}/${DETAIL.replace(":id", id)}`,
  DRIVER_EDIT: (id: string) => `/${DRIVER}/${EDIT.replace(":id", id)}`,

  PROJECT: `/${PROJECT}`,
  PROJECT_DETAIL: (id: string) => `/${PROJECT}/${DETAIL.replace(":id", id)}`,
  PROJECT_EDIT: (id: string) => `/${PROJECT}/${EDIT.replace(":id", id)}`,

  USER: `/${USER}`,
  USER_DETAIL: (id: string) => `/${USER}/${DETAIL.replace(":id", id)}`,
  USER_EDIT: (id: string) => `/${USER}/${EDIT.replace(":id", id)}`,

  VEHICLE: `/${VEHICLE}`,
  VEHICLE_DETAIL: (id: string) => `/${VEHICLE}/${DETAIL.replace(":id", id)}`,
  VEHICLE_EDIT: (id: string) => `/${VEHICLE}/${EDIT.replace(":id", id)}`,
};
