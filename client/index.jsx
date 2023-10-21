import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.jsx'
import { store } from './utils/store.js';
import './css/index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import {extendTheme, ChakraProvider } from '@chakra-ui/react'

// import { theme as origTheme } from '@chakra-ui/react'


const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
  // components: {
  //   Alert: {
  //     variants: {
  //       solid: (props) => { // only applies to `subtle` variant
  //         const { colorScheme: c } = props
  //         if (c !== 'blue') {
  //           // use original definition for all color schemes except "blue"
  //           return origTheme.components.Alert.variants.solid(props)
  //         }
  //         return {
  //           container: {
  //             bg: '#FFA500', // or literal color, e.g. "#0984ff"
  //           },
  //         }
  //       }
  //     }
  //   }
  // }
}


const theme = extendTheme({config})


if (module.hot) module.hot.accept();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </Router>
    </Provider>
  </React.StrictMode>
);
