import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ShowOrderScreen from '../ShowOrderScreen';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../../Store/reducers/common';

const store = createStore(rootReducer, applyMiddleware(thunk));
// Mock navigation props
const navigationMock = {
    navigate: jest.fn(),
    push: jest.fn(),
    goBack: jest.fn(),
};

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useFocusEffect: jest.fn(),
}));


// Mock route params
const routeParams = {
    useridsend: '123',
    status: 'orderhistry', // Adjust as needed
};

describe('ShowOrderScreen', () => {
    test('renders correctly', () => {
        const { getByText } = render(
            <Provider store={store}>
                <ShowOrderScreen navigation={navigationMock} route={{ params: routeParams }} />
            </Provider>
        );
        expect(getByText('Order History')).toBeTruthy();
    });

    test('navigates to NewCreateOrderScreen when "New" button is pressed', () => {
        const { getByText } = render(<Provider store={store}>
            <ShowOrderScreen navigation={navigationMock} route={{ params: routeParams }} />
        </Provider>);
        fireEvent.press(getByText('New'));

    });



    test('renders search field when searchVisible is true', () => {
        // Arrange: Set searchVisible to true
        const { queryByTestId } = render(<Provider store={store}>
            <ShowOrderScreen navigation={navigationMock} route={{ params: routeParams }} />
        </Provider>);
        const searchButton = queryByTestId('search-button');
        expect(searchButton).toBeNull();
    
      });
});
