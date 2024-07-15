import {
  SET_LOCAL,
  SET_THEME,
  SET_POPUP,
  SET_LOADING,
  GET_COUNTRY_LIST,
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

export const setLocale = (locale) => ({
  type: SET_LOCAL,
  locale,
});

export const setTheme = (theme) => ({
  type: SET_THEME,
  theme,
});

export const showPopup = (title = '', message = '') => ({
  type: SET_POPUP,
  popup: {
    open: true,
    title,
    message,
  },
});

export const hidePopup = () => ({
  type: SET_POPUP,
  popup: {
    open: false,
    title: '',
    message: '',
  },
});

export const setLoading = (loading) => ({
  type: SET_LOADING,
  loading,
});

export const getCountryList = (callbackSuccess, callbackFailed) => ({
  type: GET_COUNTRY_LIST,
  callbackSuccess,
  callbackFailed,
});

export const setCountryList = (countryList) => ({
  type: SET_COUNTRY_LIST,
  countryList,
});

export const updateYearlySelectPlan = (biling) => ({
  type: UPDATE_YEARLY_SELECT_PLAN,
  biling,
});

export const setPackageSelectPlan = (paket) => ({
  type: SET_PACKAGE_SELECT_PLAN,
  paket,
});
export const setStepNext = () => ({
  type: SET_STEPNEXT,
});

export const setStepBack = () => ({
  type: SET_STEPBACK,
});

export const setInfo = (info) => ({
  type: SET_INFO,
  info,
});

export const setAddOns = (id, addons, price, isAdding) => ({
  type: SET_ADDONS,
  id,
  addons,
  price,
  isAdding,
});
export const setSidebarStep = (step) => ({
  type: SET_SIDEBARSTEP,
  step,
});

export const updateAddOns = (tahunan) => ({
  type: SET_UPDATEADDONS,
  tahunan,
});
