// import React from 'react';
// import { render, fireEvent, waitFor } from '@testing-library/react-native';
// import ProductCatalog from '../ProductCatalog';

// jest.mock('@react-native-async-storage/async-storage', () => ({
//     getItem: jest.fn(),
// }));

// describe('ProductCatalog component', () => {
//   test('renders correctly', async () => {
//     const { getByText, getByPlaceholderText } = render(<ProductCatalog />);
    
//     // Check if "Products" text is rendered
//     expect(getByText('Products')).toBeTruthy();
    
//     // Check if search input is rendered
//     const searchInput = getByPlaceholderText('Search');
//     expect(searchInput).toBeTruthy();
//   });

//   test('search functionality works', async () => {
//     const { getByPlaceholderText, getByTestId } = render(<ProductCatalog />);
//     const searchInput = getByPlaceholderText('Search');

//     // Enter text into search input
//     fireEvent.changeText(searchInput, 'Test Product');
    
//     // Get search button and press it
//     const searchButton = getByTestId('search-button');
//     fireEvent.press(searchButton);

//     // Wait for search results to appear
//     await waitFor(() => {
//       const searchResults = getByTestId('search-results');
//       expect(searchResults).toBeTruthy();
//     });
//   });

//   // Add more test cases as needed
// });
