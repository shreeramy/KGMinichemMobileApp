import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import EditOrderLineScreen from '../EditOrderLineScreen';

jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(),
}));

describe('EditOrderLineScreen', () => {
    const mockRouteParams = {
        item: {
            name: 'Sample Product',
            product_uom_qty: 2,
            product_uom: ['Unit'],
            price_unit: 10,
            id: 1,
            product_id: [1],
            order_id: [1],
        },
    };

    test('renders without crashing', () => {
        const { getByPlaceholderText, getByText } = render(<EditOrderLineScreen route={{ params: mockRouteParams }} />);
        expect(getByPlaceholderText('Enter product name')).toBeTruthy();
        expect(getByPlaceholderText('Enter Qty')).toBeTruthy();
        expect(getByPlaceholderText('Enter Unit of Measure')).toBeTruthy();
        expect(getByPlaceholderText('Enter price')).toBeTruthy();
        expect(getByText('Update Order')).toBeTruthy();
    });

    test('updates state when input changes', () => {
        const { getByPlaceholderText } = render(<EditOrderLineScreen route={{ params: mockRouteParams }} />);
        const productNameInput = getByPlaceholderText('Enter product name');
        const qtyInput = getByPlaceholderText('Enter Qty');
        const uomInput = getByPlaceholderText('Enter Unit of Measure');
        const priceInput = getByPlaceholderText('Enter price');

        fireEvent.changeText(productNameInput, 'New Product Name');
        fireEvent.changeText(qtyInput, '5');
        fireEvent.changeText(uomInput, 'Unit');
        fireEvent.changeText(priceInput, '10');

        expect(productNameInput.props.value).toBe('New Product Name');
        expect(qtyInput.props.value).toBe('5');
        expect(uomInput.props.value).toBe('Unit');
        expect(priceInput.props.value).toBe('10');
    });

});
