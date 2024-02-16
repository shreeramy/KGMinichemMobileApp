import React from 'react';
import { render } from '@testing-library/react-native';
import AppContainer from '../AppContainer';
import { View } from 'react-native';

describe('AppContainer', () => {
  test('renders children with default props', () => {
    const { getByTestId } = render(
      <AppContainer>
        <View testID="child-view" />
      </AppContainer>
    );
    expect(getByTestId('child-view')).toBeTruthy();
  });

  test('renders children without SafeAreaView for top component', () => {
    const { getByTestId } = render(
      <AppContainer isSafeArea={false}>
        <View testID="child-view" />
      </AppContainer>
    );
    expect(getByTestId('child-view')).toBeTruthy();
  });

  test('renders children without SafeAreaView for bottom component', () => {
    const { getByTestId } = render(
      <AppContainer isBottomSafeArea={false}>
        <View testID="child-view" />
      </AppContainer>
    );
    expect(getByTestId('child-view')).toBeTruthy();
  });

  test('renders children without SafeAreaView for both top and bottom components', () => {
    const { getByTestId } = render(
      <AppContainer isSafeArea={false} isBottomSafeArea={false}>
        <View testID="child-view" />
      </AppContainer>
    );
    expect(getByTestId('child-view')).toBeTruthy();
  });
});
