import React from 'react'
import { Avatar, AvatarBadge, Box, Flex, VStack, Text} from '@chakra-ui/react'


const Notification = ({ message, createdAt, hasBadge, colorMode, ...rest }) => {

  return (
    <Box
      bg={
        hasBadge
          ? colorMode === 'light'
            ? 'gray.100'
            : 'gray.700'
          : 'transparent'
      }
      {...rest}
    >
      <Flex gap={3} p={2}>
        <Box>
          <Avatar size='sm' name={name} src='src' >
            {hasBadge && (
              <AvatarBadge
                placement='top-start'
                bg={colorMode === 'light ' ? 'blue.600' : 'blue.300'}
                borderWidth='2px'
                boxSizxe='12px'
              />
            )}
          </Avatar>
        </Box>
        <VStack>
          <Box> 
            <Text fontSize={'sm'}>
              {/* <b>{name}</b> {action} */}
              {message}
            </Text>
          </Box>
        </VStack>
        <Box alignSelf={'flex-start'} mt='0 !important'>
          <Text fontSize={'xs'} fontweight='lighter'>
            {createdAt}
          </Text>
        </Box>
      </Flex>
    </Box>
  )
};

export default Notification;