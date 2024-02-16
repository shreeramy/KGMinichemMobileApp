import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AppTextInput from '../AppTextInput';

describe('AppTextInput', () => {
  test('renders correctly with default props', () => {
    const { getByPlaceholderText } = render(<AppTextInput />);
    const input = getByPlaceholderText(''); 
    expect(input).toBeTruthy();
  });

  test('renders correctly with provided props', () => {
    const { getByPlaceholderText, getByTestId } = render(
      <AppTextInput
        placeHolder="Username"
        value="JohnDoe"
        onChangeText={() => {}}
        keyboardType="default"
        secureTextEntry={false}
        leftImage={true}
      />
    );
    const input = getByPlaceholderText('Username');
    const leftImage = getByTestId('left-image'); 
    expect(input).toBeTruthy();
    expect(leftImage).toBeTruthy();
    expect(input.props.value).toBe('JohnDoe');
  });

  test('invokes onChangeText callback on text change', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <AppTextInput
        placeHolder="Username"
        onChangeText={onChangeText}
      />
    );
    const input = getByPlaceholderText('Username');
    fireEvent.changeText(input, 'NewValue');
    expect(onChangeText).toHaveBeenCalledWith('NewValue');
  });

  
});
