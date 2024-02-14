// import React from 'react';
// import { render, fireEvent } from '@testing-library/react-native';
// import AttendanceHistoryScreen from '../AttendanceHistoryScreen';

// jest.mock('@react-native-async-storage/async-storage', () => ({
//     getItem: jest.fn(),
// }));

// const mockNavigation = {
//     navigate: jest.fn(),
//     addListener: jest.fn().mockReturnValue({}),
//     removeListener: jest.fn(),
// };


// describe('AttendanceHistoryScreen', () => {
//     test('renders without crashing', () => {
//         render(<AttendanceHistoryScreen navigation={mockNavigation} />);
//     });

//     it('navigates back when back button is pressed', () => {
//         const { getByTestId } = render(<AttendanceHistoryScreen />);
//         const backButton = getByTestId('backButton');
//         fireEvent.press(backButton);
//         // Add assertion to check if navigation occurred
//     });

//     it('navigates to LiveLocationScreen when an item is pressed', () => {
//         const { getByText } = render(<AttendanceHistoryScreen />);
//         const listItem = getByText('Check In');
//         fireEvent.press(listItem);
//         // Add assertion to check if navigation to LiveLocationScreen occurred with correct props
//     });
// });
