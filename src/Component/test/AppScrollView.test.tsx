import React from 'react';
import { render } from '@testing-library/react-native';
import AppScrollview from '../AppScrollview';
import { Text } from 'react-native'; 

describe('AppScrollview', () => {
  test('renders correctly with children', () => {
    const { getByText } = render(
      <AppScrollview>
        <Text>Child Component</Text>
      </AppScrollview>
    );
    expect(getByText('Child Component')).toBeTruthy();
  });

  test('hides vertical scrollbar', () => {
    const { getByTestId } = render(
      <AppScrollview>
        <Text>Child Component</Text>
      </AppScrollview>
    );
    const scrollView = getByTestId('app-scrollview');
    expect(scrollView.props.showsVerticalScrollIndicator).toBe(false);
  });

  test('hides horizontal scrollbar', () => {
    const { getByTestId } = render(
      <AppScrollview>
        <Text>Child Component</Text>
      </AppScrollview>
    );
    const scrollView = getByTestId('app-scrollview');
    expect(scrollView.props.showsHorizontalScrollIndicator).toBe(false);
  });
});
