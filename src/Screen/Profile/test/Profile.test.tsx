import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Profile from '../Profile';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../../Store/reducers/common';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../../Helper/Loader';

const store = createStore(rootReducer, applyMiddleware(thunk));

jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(),
}));

jest.mock('react-native-fs', () => ({
    readFile: jest.fn(), 
}));

jest.mock('react-native-image-crop-picker', () => ({
    openCamera: jest.fn(), // Mocking the openCamera function
}));

const mockIsLoading = jest.fn();
jest.mock('../../../Helper/Loader', () => ({
  isLoading: mockIsLoading,
}));


describe('Profile Component', () => {
    test('renders correctly', () => {
        const { getByText, getByPlaceholderText } = render(
            <Provider store={store}>
                <Profile /></Provider>
        );

        expect(getByText('Profile')).toBeTruthy();
        expect(getByPlaceholderText('Name')).toBeTruthy();
        expect(getByPlaceholderText('Email')).toBeTruthy();
    });
});
