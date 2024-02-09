import React from 'react'
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
