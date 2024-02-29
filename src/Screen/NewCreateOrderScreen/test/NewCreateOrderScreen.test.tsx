import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import NewCreateOrderScreen from '../NewCreateOrderScreen';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../../Store/reducers/common';
import * as OdooApi from '../../OdooApi';
import AsyncStorage from '@react-native-async-storage/async-storage';


const store = createStore(rootReducer, applyMiddleware(thunk));

jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(),
}));

jest.mock('@react-native-firebase/messaging', () => ({
  getToken: jest.fn(),
}));

jest.mock('react-native-push-notification', () => ({
  configure: jest.fn(),
  localNotification: jest.fn(),
}));

global.fetch = jest.fn().mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce({
      result: [{ id: 1,
        name: "Product 1",
        price: 10.99,
        category: "Category 1"}],
    }),
  });

const mockNavigation = {
    navigate: jest.fn(),
    addListener: jest.fn().mockReturnValue({}),
    removeListener: jest.fn(),
};


describe('NewCreateOrderScreen', () => {
  test('renders correctly', () => {
    const { getByText } = render(
    <Provider store={store}>
    <NewCreateOrderScreen navigation={mockNavigation} />
    </Provider>);
    expect(getByText('New')).toBeTruthy();
  });

  test('fetches customer data successfully', async () => {
    AsyncStorage.getItem = jest.fn().mockImplementationOnce(() => Promise.resolve('mockedUserId'));
    await OdooApi.searchRead(
      'mockedUserId',
      'res.partner',
      [['id', '!=', 0]],
      20,
      0 
    );
  });
});
