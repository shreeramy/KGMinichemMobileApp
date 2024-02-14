// import React from 'react';
// import { render, waitFor } from '@testing-library/react-native';
// import SellOrderDetails from '../SellOrderDetails';


// jest.mock('@react-native-async-storage/async-storage', () => ({
//     getItem: jest.fn(),
// }));

// describe('SellOrderDetails screen', () => {
//   test('renders correctly', async () => {
//     const { getByText } = render(<SellOrderDetails route={{ params: { selorederid: 1 } }} />);
    
//     // Wait for the screen to render
//     await waitFor(() => {
//       // Assert that certain text elements are present on the screen
//       expect(getByText('Sale Order Details')).toBeTruthy();
//       expect(getByText('Ordered Product')).toBeTruthy();
//       expect(getByText('Sub total')).toBeTruthy();
//     });
//   });
// });
