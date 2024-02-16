import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import EditProfile from '../EditProfile';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../../Store/reducers/common';

const store = createStore(rootReducer, applyMiddleware(thunk));

// Mock the AsyncStorage module
jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(),
}));

describe('<EditProfile />', () => {
    test('renders profile information correctly', () => {
        // Mock user data
        const mockUser = {
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            mobile: '+1234567890',
            street: '123 Main St',
            city: 'Anytown',
            state_id: ['1', 'State Name'],
            image_1920: 'base64ImageString', // Sample base64 image string
        };

        // Render the component with mocked navigation
        const { getByText, getByTestId } = render(
            <Provider store={store}>
                <EditProfile route={{ params: { user: mockUser } }} />
            </Provider>
        );

        // Assert that profile information is rendered correctly
        expect(getByText('Profile')).toBeTruthy();
        expect(getByTestId('profile-image')).toBeTruthy();
        expect(getByText('John Doe')).toBeTruthy();
        expect(getByText('john@example.com')).toBeTruthy();
        expect(getByText('+1234567890')).toBeTruthy();
        expect(getByText('123 Main St, Anytown, State Name')).toBeTruthy();
    });

    test('navigates to ShowOrderScreen when order history is pressed', () => {
        const mockNavigate = jest.fn();
        const { getByText } = render(
            <Provider store={store}>
                <EditProfile navigation={{ navigate: mockNavigate }} route={{ params: { user: {} } }} />
            </Provider>
        );
        const orderHistoryButton = getByText('Order history');
        fireEvent.press(orderHistoryButton);
        expect(mockNavigate).toHaveBeenCalledWith('ShowOrderScreen', { useridsend: undefined, status: 'orderhistry' });
    });

    // Add more test cases for other user interactions, if any
});
