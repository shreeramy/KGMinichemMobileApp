import AsyncStorage from '@react-native-async-storage/async-storage';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import {
    AppButton,
} from "../../../Component";
import rootReducer from '../../../Store/reducers/common';
import * as OdooApi from '../../OdooApi';
import LoginScreen from '../LoginScreen';

jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(),
    setItem: jest.fn(),
}));
jest.mock('@react-navigation/native', () => ({
    CommonActions: {
        reset: jest.fn(),
    },
}));

const store = createStore(rootReducer, applyMiddleware(thunk));

describe('LoginScreen', () => {
    let navigation;
    let Loader;
    afterEach(() => {
        jest.clearAllMocks();
    });
    beforeEach(() => {
        navigation = {
            dispatch: jest.fn(),
        };
        Loader = {
            isLoading: jest.fn(),
        };
    });


    it('renders correctly', () => {
        const { getByPlaceholderText, getAllByText } = render(
            <Provider store={store}>
                <LoginScreen />
            </Provider>
        );
        expect(getByPlaceholderText('Username')).toBeDefined();
        expect(getByPlaceholderText('Password')).toBeDefined();
        const signInElements = getAllByText('Sign In');
        expect(signInElements.length).toBeGreaterThan(0);
    });

    it('updates email and password input fields correctly', () => {
        const { getByPlaceholderText } = render(<Provider store={store}>
            <LoginScreen />
        </Provider>);
        const emailInput = getByPlaceholderText('Username');
        const passwordInput = getByPlaceholderText('Password');

        fireEvent.changeText(emailInput, 'admin');
        fireEvent.changeText(passwordInput, 'admin');

        expect(emailInput.props.value).toBe('admin');
        expect(passwordInput.props.value).toBe('admin');
    });

    test('simulate press event on TouchableOpacity with image', () => {
        const onPressMock = jest.fn();
        const { getByText } = render(
            <AppButton
                label="Sign In"
                onPress={onPressMock}
            />
        );
        const touchableOpacity = getByText('Sign In');
        fireEvent.press(touchableOpacity);
        expect(onPressMock).toHaveBeenCalled();
    });

    test('successful login', async () => {
        const email = 'admin';
        const password = 'admin';
        await OdooApi.authenticate(email, password);
    });

    test('failed login', async () => {
        const email = 'test@example.com';
        const password = 'password';
        const navigation = {
            dispatch: jest.fn(),
        };
        await OdooApi.authenticate(email, password);
        expect(AsyncStorage.setItem).not.toHaveBeenCalled();
        expect(navigation.dispatch).not.toHaveBeenCalled();
    });
});
