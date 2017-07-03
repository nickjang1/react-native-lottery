import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import Types from '@actions/actionTypes';

export const initialState = Immutable({
  homeTab: 'AN10NA',
  spinnerVisible: false,
  containerKind: 0,
});
const homeTab = (state, action) => ({
  ...state,
  homeTab: action.homeTab,
});
const spinnerVisible = (state, action) => ({
  ...state,
  spinnerVisible: action.spinnerVisible,
});
const setContainerKind = (state, action) => ({
  ...state,
  containerKind: action.value,
});
const actionHandlers = {
  [Types.SET_HOME_TAB]: homeTab,
  [Types.SET_SPINNER_VISIBLE]: spinnerVisible,
  [Types.INITIAL_PAGE]: setContainerKind
};

export default createReducer(initialState, actionHandlers);
