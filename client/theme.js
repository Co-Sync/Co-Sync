import { extendTheme } from '@chakra-ui/react';

const theme = {
  config:{
    initialColorMode: 'dark',
    useSystemColorMode: true
  },
  styles: {
    global: {
      
      '@font-face': {
        'font-family': 'JetBrainsMono-Regular',
        'src': 'url(https://raw.githubusercontent.com/JetBrains/JetBrainsMono/master/fonts/ttf/JetBrainsMono-Regular.ttf)',
      },


      html: {
        'height': '100%',
        'width': '100%',
        'margin': '0',
        'padding': '0',
        /* background: radial-gradient(ellipse at bottom, #1B2735 0%, transparent), radial-gradient(ellipse at top, #090A0F 100%, transparent); */
        'background-image': 'url(https://images.pexels.com/photos/176851/pexels-photo-176851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
        'background-size': 'cover',
        'background-repeat': 'no-repeat',
        'background-position': 'center',
      },


      body :{
        margin: 0,
        padding: 0,
        '-webkit-font-smoothing': 'antialiased',
        '-moz-osx-font-smoothing': 'grayscale',
      },


      code: {
        'font-family': 'source-code-pro, Menlo, Monaco, Consolas, Courier New, monospace'
      },

      '.App': {
        display: 'flex',
        height: '100vh',
      },
    }
  }
}

export default extendTheme(theme)
