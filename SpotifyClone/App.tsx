import React from 'react';

import {store} from './src/store/store';
import {AppProvider} from './src/globalContext';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import AppContent from './Main';
import {AudioPlayerProvider} from './src/api/services/audio.context';

export default function App() {
  return (
    <Provider store={store}>
      <AudioPlayerProvider>
        <AppProvider>
          <AppContent />
          <Toast />
        </AppProvider>
      </AudioPlayerProvider>
    </Provider>
  );
}
