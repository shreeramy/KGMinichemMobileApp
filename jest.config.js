module.exports = {
  preset: 'react-native',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!@react-native|react-native)'
  ],
  setupFiles: [
    "./node_modules/react-native-gesture-handler/jestSetup.js"
  ],

};