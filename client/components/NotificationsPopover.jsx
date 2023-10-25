import React from 'react';
import {BellIcon} from '@chakra-ui/icons';
import { Box, StackDivider, Button, Flex, Popover, PopoverCloseButton, PopoverBody, PopoverContent, PopoverArrow, PopoverHeader, Text, PopoverTrigger, VStack } from '@chakra-ui/react';
import Notification from './Notification.jsx';

const NotificationPopover = ({notifications}) => { 
  
  return (
    <Box
    display='inline-block'
    >
      <Popover size='md' >
        <PopoverTrigger>
          <BellIcon className='bellIcon' />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>
            <Flex justify='space-between' align='center' p={2}>
              <Box>
                <Text as='b'>Notifications</Text>
              </Box>
              <Box>
                <Button size='xs' colorScheme={'blue'} variant='ghost'>
                Mark all as read
                </Button>
              </Box>
            </Flex>
            <Flex gap={4}>
            </Flex>
          </PopoverHeader>
          <PopoverBody>
            <VStack
              justify='flex-start'
              divider={<StackDivider bg='gray.600' m={'0 !important'} />}
              align='stretch'
            >
              {notifications ? notifications.map((notification) => (
                <Notification key={notification._id} {...notification} />
              )) : null}
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  )
}

export default NotificationPopover;