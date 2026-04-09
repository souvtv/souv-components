import { chakra } from '@chakra-ui/react'
import React from 'react'

type Props = React.ComponentProps<typeof chakra.svg>

export const VolkLogo = (props: Props) => (
  <chakra.svg {...props} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 324.22 324.22'}>
    <rect width={'324.22'} height={'324.22'} rx={'63.54'} ry={'63.54'} fill={'#272727'} />
    <path
      fill={'#fff'}
      d={
        'M79 79.96h30.67c3.31 0 6.01.75 8.12 2.25 2.1 1.5 3.61 3.5 4.51 5.98l31.8 87.96c1.43 3.83 2.88 8.01 4.34 12.52s2.84 9.25 4.12 14.21c1.05-4.96 2.27-9.7 3.67-14.21 1.39-4.51 2.76-8.68 4.12-12.52l31.58-87.96c.75-2.1 2.22-4 4.4-5.69s4.85-2.54 8.01-2.54h30.9l-65.86 164.3h-34.51z'
      }
    />
  </chakra.svg>
)
