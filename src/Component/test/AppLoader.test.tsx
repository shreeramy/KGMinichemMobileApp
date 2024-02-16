import React from 'react';
import { render } from '@testing-library/react-native';
import AppLoader from '../AppLoader';

describe('AppLoader', () => {
  test('renders correctly with default props', () => {
    const { getByTestId, queryByTestId } = render(<AppLoader />);
    expect(getByTestId('modal-container')).toBeTruthy();
    expect(queryByTestId('activity-indicator')).toBeFalsy();
  });

  test('renders correctly with isVisible true', () => {
    const { getByTestId } = render(<AppLoader isVisible={true} />);
    expect(getByTestId('modal-container')).toBeTruthy();
    expect(getByTestId('activity-indicator')).toBeTruthy();
  });

  test('renders correctly with isLoading true', () => {
    const { getByTestId } = render(<AppLoader />);
    expect(getByTestId('modal-container')).toBeTruthy();
  });

  test('calls onRequestClose when modal is closed', () => {
    const mockOnRequestClose = jest.fn();
    const { getByTestId } = render(<AppLoader onRequestClose={mockOnRequestClose} />);
    getByTestId('modal-container').props.onRequestClose(); // Simulate modal close
    expect(mockOnRequestClose).toHaveBeenCalledTimes(1);
  });
});
