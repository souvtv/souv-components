import { chakra } from '@chakra-ui/react'
import { type ComponentProps, h } from 'preact'

import { getThemeColor } from '@client/theme/colors'

interface Props extends ComponentProps<typeof chakra.svg> {
  app?: typeof window.APP
}

export const SouvLogo = ({ app = window.APP, ...props }: Props) => {
  const fill = getThemeColor(app, 'default')

  return (
    <chakra.svg
      fill={fill}
      {...props}
      data-name={'Layer 1'}
      xmlns={'http://www.w3.org/2000/svg'}
      viewBox={'-1 -1 171 171'}
    >
      <path
        className={'cls-1'}
        d={
          'M84.13 0a84.34 84.34 0 1 0 32.22 6.44A84.18 84.18 0 0 0 84.13 0Zm46.4 132.46c-14.41 13.63-31.81 20.67-46.4 20.09-14.59.58-32-6.44-46.42-20.09C14.87 110.81 8.26 80.71 23 65.2c13.27-14 39.39-11.29 61.17 5.35 21.74-16.64 47.83-19.36 61.15-5.35 14.68 15.52 8.06 45.63-14.79 67.26Z'
        }
      />
      <path
        className={'cls-1'}
        d={
          'M101.23 108.29s-8-27.75 17.47-31.53c0 0 18.64-2.53 13.91 12.83a26 26 0 0 1-4.61 7.25c-4.76 4.78-14.71 12.76-26.77 11.45Zm-34.23 0s8-27.75-17.46-31.53c0 0-18.63-2.51-13.92 12.81a25.25 25.25 0 0 0 4.17 6.82c4.58 4.71 14.78 13.25 27.21 11.9ZM84.13 141s-9.41-8.47-9.41-14.93 18.79-6.76 18.79 0S84.13 141 84.13 141Z'
        }
      />
    </chakra.svg>
  )
}
