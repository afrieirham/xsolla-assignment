import React from 'react'
import { Box, Flex, Heading, IconButton, Img, Text } from '@chakra-ui/react'

import OutlineBookmarkIcon from '../icons/OutlineBookmarkIcon'
import FilledBookmarkIcon from '../icons/FilledBookmarkIcon'


function EventCard({ id, name, image, favourite, manageFavourite }) {


  const onClick = () => {
    if (favourite) {
      manageFavourite.remove(id)
    } else {
      manageFavourite.add(id)
    }
  }

  return (
    <Flex
      p='6'
      color='white'
      height='300px'
      position='relative'
      bgGradient='linear(black 0%, transparent 50%, black 100%)'
      borderRadius='md'
      flexDirection='column'
      justifyContent='space-between'
      backgroundPosition='center'
    >
      <Img
        src={image}
        top='0'
        left='0'
        width='100%'
        zIndex='hide'
        height='300px'
        position='absolute'
        objectFit='cover'
        borderRadius='md'
      />
      <Flex justifyContent='space-between' alignItems='center'>
        <Box borderWidth='1.5px' px='2' borderRadius='md'>
          <Text fontSize='3xl'>{id}</Text>
        </Box>
        <IconButton _hover={{ bg: 'transparent' }} _active={{ bg: 'transparent' }} variant='ghost' onClick={onClick} aria-label='toggle favourite' icon={favourite ? <FilledBookmarkIcon /> : <OutlineBookmarkIcon />} />
      </Flex>
      <Flex >
        <Heading fontSize='3xl'>{name}</Heading>
      </Flex>
    </Flex>
  )
}

export default EventCard