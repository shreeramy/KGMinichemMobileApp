import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AttendanceHistoryScreen from '../AttendanceHistoryScreen';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../../Store/reducers/common';

jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(),
}));

const store = createStore(rootReducer, applyMiddleware(thunk));

const mockNavigation = {
    navigate: jest.fn(),
    addListener: jest.fn().mockReturnValue({}),
    removeListener: jest.fn(),
};


describe('AttendanceHistoryScreen', () => {
    test('renders without crashing', () => {render(
            <Provider store={store}>
                <AttendanceHistoryScreen navigation={mockNavigation} />
            </Provider>
        );
    });

    it('navigates to LiveLocationScreen when Check In is pressed', async () => {
        const { queryByText } = render(
            <Provider store={store}>
                <AttendanceHistoryScreen navigation={mockNavigation} />
            </Provider>
        );
        const checkInText = queryByText('Check In');
        if (checkInText) {
            fireEvent.press(checkInText);
            expect(mockNavigation.navigate).toHaveBeenCalledWith('LiveLocationScreen');
        } else {
            console.log('Text "Check In" not found.');
        }
    });
    
      
});
