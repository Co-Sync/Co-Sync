import React from 'react';
import {Button} from '@chakra-ui/button';
import { useColorMode } from '@chakra-ui/color-mode';
import {SunIcon, MoonIcon} from '@chakra-ui/icons'
import { ClassNames } from '@emotion/react';

const ToggleColorMode = () => {
  const {toggleColorMode, colorMode} = useColorMode();
  return(<Button onClick={()=>toggleColorMode()}>{colorMode === 'dark' ? <SunIcon color="yellow"/> : <MoonIcon/>}</Button>)
}
 
export default ToggleColorMode;