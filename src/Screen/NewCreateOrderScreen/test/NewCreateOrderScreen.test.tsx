// import React from 'react';
// import { render, fireEvent } from '@testing-library/react-native';
// import NewCreateOrderScreen from '../NewCreateOrderScreen';

// jest.mock('@react-native-async-storage/async-storage', () => ({
//     getItem: jest.fn(),
// }));

// const mockNavigation = {
//     navigate: jest.fn(),
//     addListener: jest.fn().mockReturnValue({}),
//     removeListener: jest.fn(),
// };

// describe('NewCreateOrderScreen component', () => {
//   test('renders correctly', () => {
//     const { getByText } = render(<NewCreateOrderScreen navigation={mockNavigation}/>);
//     expect(getByText('New')).toBeDefined();
//   });

//   test('clicking on "Add More" button adds an item', () => {
//     const { getByText, getByPlaceholderText } = render(<NewCreateOrderScreen />);
//     const addButton = getByText('Add More');

//     fireEvent.press(addButton);

//     // Check if an item is added
//     expect(getByPlaceholderText('Quantity')).toBeDefined();
//   });

//   test('clicking on "finish" button adds and finishes an item', () => {
//     const { getByText, getByPlaceholderText } = render(<NewCreateOrderScreen />);
//     const finishButton = getByText('finish');

//     fireEvent.press(finishButton);

//     // Check if an item is added and finished
//     expect(getByPlaceholderText('Quantity')).toBeDefined();
//     // Add more assertions if needed
//   });

//   // Add more test cases as needed
// });
