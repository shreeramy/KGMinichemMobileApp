// import React from 'react';
// import { render } from '@testing-library/react-native';
// import LiveLocationScreen from '../LiveLocationScreen';

// jest.mock('@react-native-community/geolocation', () => ({
//     getCurrentPosition: jest.fn(),
//   }));

// jest.mock('react-native-permissions', () => ({
//     PERMISSIONS: {
//       ANDROID: {
//         ACCESS_FINE_LOCATION: 'android.permission.ACCESS_FINE_LOCATION',
//       },
//       IOS: {
//         LOCATION_ALWAYS: 'ios.permission.LOCATION_ALWAYS',
//       },
//     },
//     request: jest.fn(),
//   }));
  

// describe('<LiveLocationScreen />', () => {
//   test('renders without crashing', () => {
//     render(<LiveLocationScreen />);
//   });

// //   test('renders activity indicator when latitude and longitude are undefined', () => {
// //     const { getByTestId } = render(<LiveLocationScreen />);
// //     const activityIndicator = getByTestId('activity-indicator');
// //     expect(activityIndicator).toBeTruthy();
// //   });

// //   test('renders map when latitude and longitude are defined', () => {
// //     const { getByTestId } = render(
// //       <LiveLocationScreen
// //         route={{
// //           params: {
// //             attendanceData: [
// //               { lat: 40.7128, log: -74.006 },
// //               { lat: 34.0522, log: -118.2437 },
// //             ],
// //           },
// //         }}
// //       />
// //     );
// //     const map = getByTestId('map');
// //     expect(map).toBeTruthy();
// //   });
// });
