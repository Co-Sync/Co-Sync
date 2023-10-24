import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.jsx'
import { store } from './utils/store.js';
import './css/index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { extendTheme, ChakraProvider,ColorModeScript} from '@chakra-ui/react';
// import theme from './theme.js'
import { popoverTheme } from './Popover.js';

export const theme = extendTheme({
  components: { Popover: popoverTheme },
})

if (module.hot) module.hot.accept();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
          <App />
        </ChakraProvider>
      </Router>
    </Provider>
  </React.StrictMode>
);
