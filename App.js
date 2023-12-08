import { ImageStore, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppButton from './src/Component/AppButton'
import { SvgIcon } from './src/Component/SvgIcons';
import {Loader} from './src/Helper';
import {AppLoader} from './src/Component';
import {Provider} from 'react-redux';
import RootComponent from './src/Router/RootComponent';
import store from './src/Store/store';

export default function App() {
  return (
    <Provider store={store}>
      <AppLoader ref={e => Loader.setLoader(e)} />
      <RootComponent />
    </Provider>
  );
}
