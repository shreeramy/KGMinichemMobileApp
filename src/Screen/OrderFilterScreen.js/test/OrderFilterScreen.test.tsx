// import React from 'react';
// import { render, fireEvent } from '@testing-library/react-native';
// import OrderFilterScreen from '../index';

// describe('OrderFilterScreen component', () => {
//   test('renders correctly', () => {
//     const { getByText } = render(<OrderFilterScreen route={undefined} navigation={undefined} />);
//     expect(getByText('Order')).toBeDefined();
//     expect(getByText('Delivery')).toBeDefined();
//     expect(getByText('Invoice')).toBeDefined();
//     expect(getByText('Date-range')).toBeDefined();
//     expect(getByText('Payment mode')).toBeDefined();
//   });

//   test('clicking on menu item selects it', () => {
//     const { getByText } = render(<OrderFilterScreen route={undefined} navigation={undefined} />);
//     const orderMenuItem = getByText('Order');

//     fireEvent.press(orderMenuItem);
//   });

//   test('clicking on checkbox toggles its state', () => {
//     const { getByText, getByTestId } = render(<OrderFilterScreen route={undefined} navigation={undefined} />);
//     const quationCheckbox = getByTestId('quotation-checkbox');

//     fireEvent.press(quationCheckbox);

//     expect(quationCheckbox.props.isChecked).toBeTruthy();
//   });

//   test('clicking on "CLEAR FILTERS" button clears all filters', () => {
//     const { getByText, getByTestId } = render(<OrderFilterScreen route={undefined} navigation={undefined} />);
//     const clearFiltersButton = getByText('CLEAR FILTERS');

//     fireEvent.press(clearFiltersButton);

//     const quotationCheckbox = getByTestId('quotation-checkbox');
//     expect(quotationCheckbox.props.isChecked).toBeFalsy();
//     // Assert for other filters if needed
//   });

//   test('clicking on "APPLY" button applies the selected filters', () => {
//     const { getByText, getByTestId } = render(<OrderFilterScreen route={undefined} navigation={undefined} />);
//     const applyButton = getByText('APPLY');

//     fireEvent.press(applyButton);

//     // Add assertions to check if the filters are applied correctly
//   });

//   // Add more test cases as needed
// });
