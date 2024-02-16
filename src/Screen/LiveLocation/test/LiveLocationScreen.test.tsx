import React from 'react';
import { render } from '@testing-library/react-native';
import LiveLocationScreen from '../LiveLocationScreen';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../../Store/reducers/common';

const store = createStore(rootReducer, applyMiddleware(thunk));


jest.mock('@react-native-community/geolocation', () => ({
    getCurrentPosition: jest.fn(),
}));

jest.mock('react-native-permissions', () => ({
    PERMISSIONS: {
        ANDROID: {
            ACCESS_FINE_LOCATION: 'android.permission.ACCESS_FINE_LOCATION',
        },
        IOS: {
            LOCATION_ALWAYS: 'ios.permission.LOCATION_ALWAYS',
        },
    },
    request: jest.fn(),
}));


describe('<LiveLocationScreen />', () => {
    test('renders without crashing', () => {
        render(
            <Provider store={store}>
                <LiveLocationScreen />
            </Provider>
        );
    });

    test('renders activity indicator when latitude and longitude are undefined', () => {
        const { getByTestId } = render(<Provider store={store}>
            <LiveLocationScreen />
        </Provider>);
        const activityIndicator = getByTestId('activity-indicator');
        expect(activityIndicator).toBeTruthy();
    });
});
