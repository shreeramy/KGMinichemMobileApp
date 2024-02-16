import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Locationsendscreen from '../Locationsendscreen';


jest.mock('@react-native-community/geolocation', () => ({
    getCurrentPosition: jest.fn(),
}));

jest.mock('react-native-image-crop-picker', () => ({
    openCamera: jest.fn().mockResolvedValue({ path: 'mocked_image_path' }),
}));

jest.mock('rn-fetch-blob', () => ({
    fs: {
        readFile: jest.fn().mockResolvedValue('mocked_base64_image_data'),
    },
}));

const mockNavigation = {
    navigate: jest.fn(),
    addListener: jest.fn().mockReturnValue({}),
    removeListener: jest.fn(),
};


describe('<Locationsendscreen />', () => {
    test('renders without crashing', () => {
        render(<Locationsendscreen navigation={mockNavigation} />);
    });

    test('renders image picker button', () => {
        const { getByTestId } = render(<Locationsendscreen navigation={mockNavigation} />);
        const imagePickerButton = getByTestId('image-picker-button');
        expect(imagePickerButton).toBeTruthy();
    });

    test('opens camera when image picker button is pressed', () => {
        const { getByTestId } = render(<Locationsendscreen navigation={mockNavigation} />);
        const imagePickerButton = getByTestId('image-picker-button');
        fireEvent.press(imagePickerButton);
        // assert camera is opened
    });

    test('updates text input value', () => {
        const { getByPlaceholderText } = render(<Locationsendscreen navigation={mockNavigation} />);
        const textInput = getByPlaceholderText('Send location name');
        fireEvent.changeText(textInput, 'New Location');
        expect(textInput.props.value).toBe('New Location');
    });

    // Add more test cases as needed for other functionalities
});
