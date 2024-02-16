import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import SellOrderDetails from '../SellOrderDetails';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../../Store/reducers/common';

jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(),
}));


const store = createStore(rootReducer, applyMiddleware(thunk));

const mockAddListener = jest.fn();

jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({
      addListener: mockAddListener, // Provide a mock implementation for addListener
    }),
  }));

const mockNavigation = {
    navigate: jest.fn(),
    addListener: jest.fn().mockReturnValue({}),
    removeListener: jest.fn(),
};


describe('SellOrderDetails screen', () => {
  test('renders correctly', async () => {
    const { getByText } = render(
        <Provider store={store}>
        <SellOrderDetails navigation={mockNavigation} route={{ params: { selorederid: 1 } }} />
      </Provider>
   );
    await waitFor(() => {
      expect(getByText('Sale Order Details')).toBeTruthy();
      expect(getByText('Ordered Product')).toBeTruthy();
      expect(getByText('Sub total')).toBeTruthy();
    });
  });
});
