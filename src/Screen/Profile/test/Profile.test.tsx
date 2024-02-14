// import React from 'react';
// import { render, fireEvent, waitFor } from '@testing-library/react-native';
// import Profile from '../Profile';

// jest.mock('@react-native-async-storage/async-storage', () => ({
//     getItem: jest.fn(),
// }));

// jest.mock('react-native-fs', () => ({
//     readFile: jest.fn(), // Mocking the readFile function
// }));

// jest.mock('react-native-image-crop-picker', () => ({
//     openCamera: jest.fn(), // Mocking the openCamera function
// }));



// describe('Profile Component', () => {
//     test('renders correctly', () => {
//         const { getByText, getByPlaceholderText } = render(<Profile />);

//         // Check if the component renders the expected elements
//         expect(getByText('Profile')).toBeTruthy();
//         expect(getByPlaceholderText('Name')).toBeTruthy();
//         expect(getByPlaceholderText('Email')).toBeTruthy();
//         // Add similar assertions for other elements
//     });
//     // Add more test cases for user interactions, API calls, navigation, etc.
// });
