import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CatalogDetails from '../CatalogDetails';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../../Store/reducers/common';

const store = createStore(rootReducer, applyMiddleware(thunk));

describe('CatalogDetails component', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Provider store={store}>
        <CatalogDetails />
        </Provider>);
    expect(getByText('Description')).toBeTruthy();
    expect(getByText('More images')).toBeTruthy();
  });

  test('navigates to ProductCatalog screen on "More images" press', () => {
    const navigationMock = { navigate: jest.fn() };
    const { getByText } = render(
    <Provider store={store}>
    <CatalogDetails navigation={navigationMock} />
    </Provider>);
    fireEvent.press(getByText('More images'));
    expect(navigationMock.navigate).toHaveBeenCalledWith('ProductCatalog');
  });

});
