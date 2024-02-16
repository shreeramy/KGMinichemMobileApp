import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AppHeader from '../AppHeader';


jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn().mockImplementation((key) => {
        if (key === 'userId') return Promise.resolve('123');
        if (key === '@odopassword') return Promise.resolve('password');
        return Promise.resolve(null);
    }),
    setItem: jest.fn(),
}));


global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
        json: () =>
            Promise.resolve({
                result: [
                    {
                        last_check_in: '2024-02-08 09:00:00',
                        last_check_out: '2024-02-08 18:00:00',
                        attendance_id: [1],
                        employee_id: [1],
                        image_1920: 'base64-encoded-image',
                    },
                ],
            }),
    })
);

describe('AppHeader', () => {
    test('render', () => {
        render(<AppHeader />);
    });

    test('renders with custom title', () => {
        const { getByText } = render(<AppHeader title="Custom Title" />);
        expect(getByText('Custom Title')).toBeTruthy();
    });

    test('renders without back button', () => {
        const { queryByTestId } = render(<AppHeader isBackBtn={false} />);
        expect(queryByTestId('back-button')).toBeNull();
    });

    test('renders with drawer menu button', () => {
        const { getByTestId } = render(<AppHeader drawermenu={true} />);
        expect(getByTestId('drawer-menu')).toBeTruthy();
    });

    test('renders with user image', () => {
        const { getByTestId } = render(<AppHeader isRightImage={true} />);
        expect(getByTestId('user-image')).toBeTruthy();
    });

    test('calls onPressBack when back button is pressed', () => {
        const mockNavigation = {
            goBack: jest.fn(),
        };
        const { getByTestId } = render(<AppHeader navigation={mockNavigation} />);
        fireEvent.press(getByTestId('back-button'));
        expect(mockNavigation.goBack).toHaveBeenCalledTimes(1);
    });


});
