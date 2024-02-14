// import React from 'react';
// import { render, fireEvent } from '@testing-library/react-native';
// import EditOrderLineScreen from '../EditOrderLineScreen';

// describe('EditOrderLineScreen', () => {
//     const mockRouteParams = {
//         item: {
//           name: 'Sample Product',
//           product_uom_qty: 2,
//           product_uom: ['Unit'],
//           price_unit: 10,
//           id: 1,
//           product_id: [1],
//           order_id: [1],
//         },
//       };

//       test('renders without crashing', () => {
//         render(<EditOrderLineScreen route={{ params: mockRouteParams }} />);
//       });

// //   test('updates product name when input changes', () => {
// //     const { getByPlaceholderText } = render(<EditOrderLineScreen />);
// //     const productNameInput = getByPlaceholderText('Enter product name');
// //     fireEvent.changeText(productNameInput, 'New Product Name');
// //     expect(productNameInput.props.value).toBe('New Product Name');
// //   });

// //   test('updates quantity when input changes', () => {
// //     const { getByPlaceholderText } = render(<EditOrderLineScreen />);
// //     const quantityInput = getByPlaceholderText('Enter Qty');
// //     fireEvent.changeText(quantityInput, '5');
// //     expect(quantityInput.props.value).toBe('5');
// //   });

// //   test('updates unit of measure when input changes', () => {
// //     const { getByPlaceholderText } = render(<EditOrderLineScreen />);
// //     const uomInput = getByPlaceholderText('Enter Unit of Measure');
// //     fireEvent.changeText(uomInput, 'kg');
// //     expect(uomInput.props.value).toBe('kg');
// //   });

// //   test('updates price when input changes', () => {
// //     const { getByPlaceholderText } = render(<EditOrderLineScreen />);
// //     const priceInput = getByPlaceholderText('Enter price');
// //     fireEvent.changeText(priceInput, '10.99');
// //     expect(priceInput.props.value).toBe('10.99');
// //   });

// //   test('calls updateOrderLine1 when button is pressed', () => {
// //     const mockUpdateOrderLine1 = jest.fn();
// //     const { getByText } = render(<EditOrderLineScreen updateOrderLine1={mockUpdateOrderLine1} />);
// //     const button = getByText('Update Order');
// //     fireEvent.press(button);
// //     expect(mockUpdateOrderLine1).toHaveBeenCalled();
// //   });
// });
