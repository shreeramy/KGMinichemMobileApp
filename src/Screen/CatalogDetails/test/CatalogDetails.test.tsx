// import React from 'react';
// import { render, fireEvent } from '@testing-library/react-native';
// import CatalogDetails from '../CatalogDetails';



// describe('CatalogDetails component', () => {
//   it('renders correctly', () => {
//     const { getByText } = render(<CatalogDetails />);
//     expect(getByText('Description')).toBeTruthy();
//     expect(getByText('More images')).toBeTruthy();
//   });

//   test('navigates to ProductCatalog screen on "More images" press', () => {
//     const navigationMock = { navigate: jest.fn() };
//     const { getByText } = render(<CatalogDetails navigation={navigationMock} />);
//     fireEvent.press(getByText('More images'));
//     expect(navigationMock.navigate).toHaveBeenCalledWith('ProductCatalog');
//   });

// //   test('navigates to PdfViewer screen on press of PDF image', () => {
// //     const navigationMock = { navigate: jest.fn() };
// //     const { getByTestId } = render(<CatalogDetails navigation={navigationMock} route={{ params: { pdf: true } }} />);
// //     fireEvent.press(getByTestId('pdfImage'));
// //     expect(navigationMock.navigate).toHaveBeenCalledWith('PdfViewer', { pdf: true });
// //   });

//   // Add more test cases for other functionalities and UI components as needed
// });
