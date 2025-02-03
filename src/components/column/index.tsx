import { Flex, type FlexProps } from '@chakra-ui/react'
import React from 'react'

export const Column = React.forwardRef<HTMLDivElement, FlexProps>((p, ref) => <Flex direction={'column'} {...p} ref={ref} />)
