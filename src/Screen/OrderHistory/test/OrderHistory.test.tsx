import React from 'react';
import { render } from '@testing-library/react-native';
import OrderHistory from '../OrderHistory';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../../Store/reducers/common';

const store = createStore(rootReducer, applyMiddleware(thunk));

describe('OrderHistory component', () => {
    test('renders correctly', () => {
        const { getByText, getAllByTestId } = render(
            <Provider store={store}>


                <OrderHistory /> </Provider>);


        expect(getByText('Order History')).toBeTruthy();


        const items = getAllByTestId('order-history-item');
        expect(items.length).toBe(5);

    });


});
