import { popoverAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';
import {mode}  from '@chakra-ui/theme-tools'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys); 

const baseStyle = definePartsStyle((props) => ({
  content: {
    boxShadow: 'lg',
    w: '330px',
  },
  header: {
    pb: 0,
    borderBottomWidth: '1px',
    borderBottomColor: mode('gray.200', 'gray.500')(props),
  },
  body: {
    p: 0,
  }
}));

const sizes = {
  xl: definePartsStyle({
    content: {
      w: '400px',
    },
  }),
};

const rounded = definePartsStyle({
  content: {
    borderRadius: '35px',
  },
});

const variants = {
  rounded,
};

export const popoverTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  sizes,
});