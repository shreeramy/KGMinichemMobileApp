# KGMinichemMobileApp

KGMinichemMobileApp is a React Native mobile application designed to streamline and manage various business operations for users on the go. The app allows users to check in and check out for attendance, create sales orders, take photos of work with location capture, view product catalogs, view previously created orders, create new customers, and more. The backend is powered by Odoo, utilizing its REST API for seamless integration.

## Features

- **Checkin/Checkout Attendance**: Easily log your attendance with a simple check-in/check-out feature.
- **Create Sales Orders**: Generate and manage sales orders directly from the app.
- **Capture Work Photos with Location**: Take photos of your work and automatically capture the location for accurate record-keeping.
- **View Product Catalog**: Browse through the product catalog to find and view details of products.
- **View Previous Orders**: Access previously created orders to review and manage them.
- **Create Customers**: Add new customers to the system with ease.

## Technologies Used

- **Frontend**: React Native
- **Backend**: Odoo (REST API)

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js and npm
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)
- Odoo instance with REST API enabled

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/shreeramy/KGMinichemMobileApp.git
   cd KGMinichemMobileApp
   ```

2. **Install the required npm packages:**

   ```bash
   npm install
   ```

3. **Configure the Odoo Backend:**

   - Update the API endpoints and credentials in the app configuration to connect with your Odoo instance.

4. **Run the Application:**

   - For iOS:

     ```bash
     npx react-native run-ios
     ```

   - For Android:

     ```bash
     npx react-native run-android
     ```

## Usage

1. **Checkin/Checkout Attendance**: Navigate to the attendance section and tap the check-in or check-out button to log your attendance.
2. **Create Sales Orders**: Go to the sales order section, fill in the necessary details, and submit to create a new sales order.
3. **Capture Work Photos**: Access the camera feature from the work section, take a photo, and the app will automatically capture your location.
4. **View Product Catalog**: Browse the product catalog section to view details of available products.
5. **View Previous Orders**: Navigate to the orders section to view and manage previously created orders.
6. **Create Customers**: Go to the customer section, fill in the customer details, and submit to add a new customer to the system.

## Contributing

We welcome contributions to improve KGMinichemMobileApp! To contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Built with [React Native](https://reactnative.dev/)
- Powered by [Odoo](https://www.odoo.com/)
