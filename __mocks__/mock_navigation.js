// __mocks__/mockNavigation.js
import * as React from 'react';

const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function goBack() {
  navigationRef.current?.goBack();
}

export function resetRoot(state) {
  navigationRef.current?.resetRoot(state);
}

export function setParams(params) {
  navigationRef.current?.setParams(params);
}

export function getCurrentRoute() {
  return navigationRef.current?.getCurrentRoute();
}

export function useNavigation() {
  return {
    navigate,
    goBack,
    resetRoot,
    setParams,
    getCurrentRoute,
    dangerouslyGetParent: jest.fn(),
    dangerouslyGetState: jest.fn(),
    dispatch: jest.fn(),
  };
}

export function useRoute() {
  return {
    key: 'mock-route',
    name: 'mock-route',
    params: {},
  };
}
