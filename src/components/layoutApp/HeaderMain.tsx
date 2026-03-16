import { Card, Heading, Icon, type IconProps, type CardRootProps, type HeadingProps } from '@chakra-ui/react'

import { Row } from '../row'
import { SouvLogo } from '../svg/SouvLogo'

const Root = (p: CardRootProps) => (
  <Card.Root w={'full'} h={'3.6rem'} variant={'subtle'} borderRadius={'xl'} {...p}>
    <Card.Body padding={'2'}>
      <Row w={'full'} h={'full'} justify={'start'} align={'center'} gap={{ base: '1', tablet: '2' }} overflow={'hidden'}>
        {p.children}
      </Row>
    </Card.Body>
  </Card.Root>
)

const Logo = (p: IconProps) => <Icon size={'4xl'}>{p.children || <SouvLogo fill={'theme.fg'} />}</Icon>
const Title = (p: HeadingProps) => <Heading size={'subtitle'}>{p.children}</Heading>

export const HeaderMain = {
  Logo,
  Root,
  Title,
}
