
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider, useSelector } from 'react-redux';
import OrderFilterScreen from '../index'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../../Store/reducers/common';

const store = createStore(rootReducer, applyMiddleware(thunk));;


jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));


const mockNavigation = {
  navigate: jest.fn(),
};


describe('OrderFilterScreen', () => {


  const initialState = {
    common: {
      filterItems: [

      ],
      orderModeData: [

      ],
      deliveryModeData: [

      ],
      invoiceModeData: [

      ],
      paymentModeData: [

      ],
    },
  };

  test('renders correctly', () => {
    (useSelector as jest.Mock).mockReturnValue(initialState);
    const { getByText } = render(
      <Provider store={store}>
        <OrderFilterScreen navigation={mockNavigation} />
      </Provider>
    );
    expect(getByText('Delivery')).toBeTruthy();
    expect(getByText('Invoice')).toBeTruthy();
    expect(getByText('Date-range')).toBeTruthy();
    expect(getByText('Payment mode')).toBeTruthy();
  });

});

