import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import CustomerScreen from '../CustomerScreen';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../../Store/reducers/common';
import { NavigationContainer } from '@react-navigation/native';
import { Screen } from '../../../Helper';

const store = createStore(rootReducer, applyMiddleware(thunk));

jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(),
    setItem: jest.fn()
  }));

describe('CustomerScreen', () => {
  test('renders correctly', () => {
    const { toJSON } = render(
        <Provider store={store}>
       <CustomerScreen />
    </Provider>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  test('updates search value on change', () => {
    const { getByPlaceholderText } = render(<Provider store={store}>
        <CustomerScreen />
     </Provider>);
    const searchInput = getByPlaceholderText('Search');
    fireEvent.changeText(searchInput, 'example search');
    expect(searchInput.props.value).toBe('example search');
  });
});
