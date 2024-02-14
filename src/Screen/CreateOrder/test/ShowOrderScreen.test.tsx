// import React from 'react';
// import { render, fireEvent } from '@testing-library/react-native';
// import ShowOrderScreen from '../ShowOrderScreen'; 

// // Mock navigation props
// const navigationMock = {
//   navigate: jest.fn(),
//   push: jest.fn(),
//   goBack: jest.fn(),
// };

// // Mock route params
// const routeParams = {
//   useridsend: '123',
//   status: 'orderhistry', // Adjust as needed
// };

// describe('ShowOrderScreen', () => {
//   test('renders correctly', () => {
//     const { getByText } = render(<ShowOrderScreen navigation={navigationMock} route={{ params: routeParams }} />);
//     expect(getByText('Order History')).toBeTruthy();
//   });

// //   test('navigates to SellOrderDetails screen on press of an order item', () => {
// //     const { getByText } = render(<ShowOrderScreen navigation={navigationMock} route={{ params: routeParams }} />);
// //     fireEvent.press(getByText('Order#123')); // Adjust the order number as needed
// //     expect(navigationMock.push).toHaveBeenCalledWith('SellOrderDetails', { selorederid: '123' });
// //   });

// //   test('toggles search input visibility on press of search button', () => {
// //     const { getByText, getByPlaceholderText, queryByPlaceholderText } = render(<ShowOrderScreen navigation={navigationMock} route={{ params: routeParams }} />);
// //     fireEvent.press(getByText('Search'));
// //     expect(queryByPlaceholderText('Search')).toBeTruthy(); // Search input should be visible
// //     fireEvent.press(getByText('Search')); // Press again to hide search input
// //     expect(getByPlaceholderText('Search')).toBeFalsy(); // Search input should be hidden
// //   });

// //   test('updates search value on change', () => {
// //     const { getByPlaceholderText } = render(<ShowOrderScreen navigation={navigationMock} route={{ params: routeParams }} />);
// //     const searchInput = getByPlaceholderText('Search');
// //     fireEvent.changeText(searchInput, 'example search');
// //     expect(searchInput.props.value).toBe('example search');
// //   });
// });
