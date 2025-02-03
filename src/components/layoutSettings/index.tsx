import { Grid, GridItem } from '@chakra-ui/react'
import React from 'react'

import { SideBar, SidebarProps } from './SideBar'

const sideBar = '10rem'
const gap = '2rem'

interface Props extends SidebarProps {
  children?: React.ReactNode
}

export const LayoutSettings = ({ children, ...p }: Props) => (
  <Grid
    display={'grid'}
    overflow={'hidden'}
    w={'100%'}
    h={'100%'}
    gap={gap}
    gridTemplateRows={`100%`}
    gridTemplateColumns={`${sideBar} calc(100% - ${gap} - ${sideBar})`}
    gridTemplateAreas={`
  'sidebar content'
  `}
  >
    <GridItem h={'100%'} w={'100%'} overflow={'auto'} gridArea={'sidebar'}>
      <SideBar {...p} />
    </GridItem>
    <GridItem h={'100%'} w={'100%'} overflow={'auto'} gridArea={'content'}>
      {children}
    </GridItem>
  </Grid>
)
