// import React from 'react';
// import { render, fireEvent } from '@testing-library/react-native';
// import HomeScreen from '../HomeScreen';

// jest.mock('@react-native-async-storage/async-storage', () => ({
//     getItem: jest.fn(),
//   }));
  
// describe('HomeScreen', () => {
//     it('renders correctly', () => {
//         const { getByText } = render(<HomeScreen />);
//         expect(getByText('Clocked in')).toBeTruthy();
//       });
      
//       it('clicking on Check In button triggers clock in', async () => {
//         const { getByText } = render(<HomeScreen />);
//         const checkInButton = getByText('Check In');
//         fireEvent.press(checkInButton);
//         // Assert whatever should happen after clicking Check In button
//       });
      
//       it('clicking on Check Out button triggers clock out', async () => {
//         const { getByText } = render(<HomeScreen />);
//         const checkOutButton = getByText('Check Out');
//         fireEvent.press(checkOutButton);
//         // Assert whatever should happen after clicking Check Out button
//       });
      
  
//   // Add more tests for other functionalities, navigation, etc.
// });
