import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AppButton from '../AppButton';

describe('AppButton', () => {
  test('renders correctly with text label', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <AppButton label="Press Me" onPress={mockOnPress} />
    );
    const button = getByText('Press Me');
    fireEvent.press(button);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  test('renders correctly with image', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <AppButton
        label="Press Me"
        onPress={mockOnPress}
        isImage={true}
        tintColor="red"
      />
    );
    const button = getByTestId('app-button');
    fireEvent.press(button);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  test('renders correctly with disabled state', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <AppButton label="Press Me" onPress={mockOnPress} disable={true} />
    );
    const button = getByText('Press Me');
    fireEvent.press(button);
    expect(mockOnPress).not.toHaveBeenCalled();
  });
});
