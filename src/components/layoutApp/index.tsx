import { Box, Grid, GridItem } from '@chakra-ui/react'
import React from 'react'


import { Header, HeaderProps } from './Header'

const defMaxW = '1440px'
const header = '9rem'

interface Props extends HeaderProps {
  children?: React.ReactNode
}

export const LayoutApp = ({ children, maxW, ...p }: Props) => (
  <Grid
    display={'grid'}
    overflow={'hidden'}
    w={'100vw'}
    h={'100vh'}
    maxWidth={'100vw'}
    maxHeight={'100vh'}
    gridTemplateRows={`${header} calc(100vh - ${header})`}
    gridTemplateColumns={`100vw`}
    gridTemplateAreas={`
  'header'
  'content'
  `}
  >
    <GridItem h={'100%'} w={'100%'} gridArea={'header'}>
      <Header {...p} maxW={maxW || defMaxW} />
    </GridItem>
    <GridItem
      h={'100%'}
      w={'100%'}
      display={'flex'}
      flex={1}
      justifyContent={'center'}
      overflow={'visible'}
      gridArea={'content'}
    >
      <Box
        h={'100%'}
        w={'100%'}
        maxW={maxW || defMaxW}
        overflow={'visible'}
        pb={'1rem'}
        pl={'2rem'}
        pr={'2rem'}
        pt={'1.5rem'}
      >
        {children}
      </Box>
    </GridItem>
  </Grid>
)
