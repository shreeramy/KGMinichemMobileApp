// import React from 'react';
// import { render, fireEvent, waitFor } from '@testing-library/react-native';
// import LoginScreen from '../LoginScreen';
// import * as OdooApi from '../../OdooApi';

// jest.mock('@react-native-async-storage/async-storage', () => ({
//   getItem: jest.fn(),
//   setItem: jest.fn(),
// }));
// jest.mock('@react-navigation/native', () => ({
//   CommonActions: {
//     reset: jest.fn(),
//   },
// }));

// describe('LoginScreen', () => {
//   afterEach(() => {
//     jest.clearAllMocks();
//   });


//   it('renders correctly', () => {
//     const { getByPlaceholderText, getByText } = render(<LoginScreen />);
//     expect(getByPlaceholderText('Username')).toBeDefined();
//     expect(getByPlaceholderText('Password')).toBeDefined();
//     expect(getByText('Sign In')).toBeDefined();
//   });

//   it('updates email and password input fields correctly', () => {
//     const { getByPlaceholderText } = render(<LoginScreen />);
//     const emailInput = getByPlaceholderText('Username');
//     const passwordInput = getByPlaceholderText('Password');

//     fireEvent.changeText(emailInput, 'admin');
//     fireEvent.changeText(passwordInput, 'admin');

//     expect(emailInput.props.value).toBe('admin');
//     expect(passwordInput.props.value).toBe('admin');
//   });

//   it('calls login API when Sign In button is pressed', async () => {
//     const { getByText } = render(<LoginScreen />);
//     const signInButton = getByText('Sign In');

//     fireEvent.press(signInButton);

   
//   });

//   it('displays error message on failed authentication', async () => {
//     const { getByText } = render(<LoginScreen />);
//     const signInButton = getByText('Sign In');

//     fireEvent.press(signInButton);

//   });
// });
