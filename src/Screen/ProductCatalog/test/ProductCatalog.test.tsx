import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ProductCatalog from '../ProductCatalog';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../../Store/reducers/common';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as OdooApi from '../../OdooApi';

const store = createStore(rootReducer, applyMiddleware(thunk));

jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(),
}));

describe('ProductCatalog component', () => {
    beforeEach(() => {
        jest.clearAllMocks(); 
      });
    test('renders correctly', async () => {
        const { getByText, getByPlaceholderText } = render(
            <Provider store={store}>
                <ProductCatalog /></Provider>);

        
        expect(getByText('Products')).toBeTruthy();

        
        const searchInput = getByPlaceholderText('Search');
        expect(searchInput).toBeTruthy();
    });

    test('search functionality works', async () => {
        const { getByPlaceholderText, getByTestId } = render(<Provider store={store}>
            <ProductCatalog /></Provider>);
        const searchInput = getByPlaceholderText('Search');

        fireEvent.changeText(searchInput, 'Test Product');

        const searchButton = getByTestId('search-button');
        fireEvent.press(searchButton);

        await waitFor(() => {
            const searchResults = getByTestId('search-results');
            expect(searchResults).toBeTruthy();
        });
    });

    test('fetches Product data successfully', async () => {
        AsyncStorage.getItem = jest.fn().mockImplementationOnce(() => Promise.resolve('mockedUserId'));
        await OdooApi.get_all_product_details(
          'mockedUserId',
          [['id', '!=', 0]],
        );
      });
});
