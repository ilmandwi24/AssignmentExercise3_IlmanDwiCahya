import { produce } from 'immer';

import {
  SET_LOCAL,
  SET_THEME,
  SET_POPUP,
  SET_LOADING,
  SET_COUNTRY_LIST,
  UPDATE_YEARLY_SELECT_PLAN,
  SET_STEPNEXT,
  SET_STEPBACK,
  SET_INFO,
  SET_PACKAGE_SELECT_PLAN,
  SET_ADDONS,
  SET_SIDEBARSTEP,
  SET_UPDATEADDONS,
} from '@containers/App/constants';

export const initialState = {
  locale: 'en',
  theme: 'dark',
  popup: {
    open: false,
    title: '',
    message: '',
  },
  loading: false,
  countryList: [],
  selectPlan: {
    paket: '',
    tahunan: false,
    price_dolar_monthly: 0,
    price_dolar_yearly: 0,
    price_rupiah_monthly: 0,
    price_rupiah_yearly: 0,
    lang_title: '',
    lang_biling: '',
    lang_price_monthly: '',
    lang_price_yearly: '',
  },
  step: 1,
  info: {
    name: '',
    email: '',
    phone: '',
  },
  addOns: [],
};

export const storedKey = ['locale', 'theme', 'info'];

const appReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_LOCAL:
        draft.locale = action.locale;
        break;
      case SET_THEME:
        draft.theme = action.theme;
        break;
      case SET_POPUP:
        draft.popup = action.popup;
        break;
      case SET_LOADING:
        draft.loading = action.loading;
        break;
      case SET_COUNTRY_LIST:
        draft.countryList = action.countryList;
        break;
      case UPDATE_YEARLY_SELECT_PLAN:
        draft.selectPlan = {
          ...draft.selectPlan,
          tahunan: action.biling.tahunan,
          lang_biling: action.biling.lang_biling,
        };
        break;
      case SET_PACKAGE_SELECT_PLAN:
        draft.selectPlan = { ...draft.selectPlan, ...action.paket };
        break;
      case SET_STEPNEXT:
        draft.step += 1;
        break;
      case SET_STEPBACK:
        draft.step -= 1;
        break;
      case SET_INFO:
        draft.info = action.info;
        break;
      case SET_ADDONS:
        if (action.isAdding) {
          draft.addOns.push({ id: action.id, addons: action.addons, price: action.price });
        } else {
          draft.addOns = draft.addOns.filter((item) => item.addons !== action.addons);
        }
        break;
      case SET_SIDEBARSTEP:
        draft.step = action.step;
        break;
      case SET_UPDATEADDONS:
        draft.addOns = draft.addOns.map((item) => ({
          ...item,
          price: action.tahunan ? item.price * 12 : item.price,
        }));
        break;
    }
  });

export default appReducer;
