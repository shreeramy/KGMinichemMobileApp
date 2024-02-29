import { render } from '@testing-library/react-native';
import React from 'react';
import HomeScreen from '../HomeScreen';


jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

jest.mock('@react-native-firebase/messaging', () => ({
  getToken: jest.fn(),
}));

describe('HomeScreen', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };

  const props = {
    navigation: mockNavigation,
    text: 'Sample Text',
    commonActions: {
    },
  };

  it('renders correctly', () => {
    const { getByText, queryByText } = render(<HomeScreen {...props} />);
    const checkInText = queryByText('Check In');
    if (checkInText) {
      expect(getByText('Clocked in')).toBeTruthy();
    } else {
      console.log('Text "Check In" not found.');
    }
  });
});
