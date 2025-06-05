import { Box, Grid, GridItem } from '@chakra-ui/react'
import React, { ReactNode } from 'react'


import { Header, HeaderProps } from './Header'

const defMaxW = '1440px'
const header = '7.6rem'
const headerSlim = '4.6rem'
const gap = '0.5rem'

interface Props extends HeaderProps {
  children?: ReactNode
}

export const LayoutApp = ({ children, maxW, ...p }: Props) => (
  <Grid
    display={'grid'}
    overflow={'hidden'}
    w={'100vw'}
    h={'100vh'}
    maxWidth={'100vw'}
    maxHeight={'100vh'}
    gap={gap}
    gridTemplateRows={!!p.primaryRoutes?.length || !!p.secondaryRoutes?.length ? 
      `${header} calc(100vh - ${gap} - ${header})` :
      `${headerSlim} calc(100vh - ${gap} - ${headerSlim})`}
    gridTemplateColumns={`100vw`}
    gridTemplateAreas={`
  'header'
  'content'
  `}
  >
    <GridItem h={'full'} w={'full'} gridArea={'header'}>
      <Header {...p} maxW={maxW || defMaxW} />
    </GridItem>

    <GridItem
      h={'full'}
      w={'full'}
      display={'flex'}
      flex={1}
      justifyContent={'center'}
      overflow={'visible'}
      gridArea={'content'}
    >
      <Box h={'full'} w={'full'} maxW={maxW || defMaxW} overflow={'visible'} pb={'1'} px={'2'}>
        {children}
      </Box>
    </GridItem>
  </Grid>
)
