import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { LoginScreen } from '../Screen';

describe('LoginScreen', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen />);
    
    // Check if input fields and buttons are rendered
    expect(getByPlaceholderText('Username')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Sign In')).toBeTruthy();
  });

  it('calls login function with correct credentials', async () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen />);
    
    // Mock the login function
    const mockLogin = jest.fn();

    // Set values in the input fields
    fireEvent.changeText(getByPlaceholderText('Username'), 'testuser');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password');

    // Trigger the Sign In button click event
    fireEvent.press(getByText('Sign In'));

    // Wait for the login function to be called
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalled();
    });
  });

  it('displays error message on failed login attempt', async () => {
    const { getByPlaceholderText, getByText, findByText } = render(<LoginScreen />);
    
    // Mock the login function to return false (failed login attempt)
    const mockLogin = jest.fn().mockReturnValue(false);

    // Set values in the input fields
    fireEvent.changeText(getByPlaceholderText('Username'), 'testuser');
    fireEvent.changeText(getByPlaceholderText('Password'), 'wrongpassword');

    // Trigger the Sign In button click event
    fireEvent.press(getByText('Sign In'));

    // Wait for the error message to be displayed
    const errorMessage = await findByText('Authentication failed');
    expect(errorMessage).toBeTruthy();
  });
});
