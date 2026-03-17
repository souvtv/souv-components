import { Flex, type FlexProps } from '@chakra-ui/react'
import React from 'react'

export const Row = React.forwardRef<HTMLDivElement, FlexProps>((p, ref) => <Flex direction={'row'} {...p} ref={ref} />)
