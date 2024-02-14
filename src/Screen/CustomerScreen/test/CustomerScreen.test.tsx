// import React from 'react';
// import { render, fireEvent } from '@testing-library/react-native';
// import CustomerScreen from '../CustomerScreen';


// jest.mock('@react-native-async-storage/async-storage', () => ({
//     getItem: jest.fn(),
//     setItem: jest.fn()
//   }));

// describe('CustomerScreen', () => {
//   test('renders correctly', () => {
//     const { toJSON } = render(<CustomerScreen />);
//     expect(toJSON()).toMatchSnapshot();
//   });

//   test('updates search value on change', () => {
//     const { getByPlaceholderText } = render(<CustomerScreen />);
//     const searchInput = getByPlaceholderText('Search');
//     fireEvent.changeText(searchInput, 'example search');
//     expect(searchInput.props.value).toBe('example search');
//   });

//   // Add more test cases for other functionalities as needed
// });
