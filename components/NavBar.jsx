import { Box, ButtonGroup, Button, Container, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import Image from 'next/image';
import { BiLinkExternal, BiStar } from 'react-icons/bi';

function NavBar() {
  return (
    <Box
      as="nav"
      h={16}
      w="full"
      position="fixed"
      bg="white"
      borderBottomColor="gray.200"
      borderBottomWidth={1}
      zIndex={5}
    >
      <Container
        maxW="container.lg"
        h="full"
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <NextLink href="/">
          <a className="logo-image">
            <Image src="/logo.svg" alt="logo" width={100} height={50} />
          </a>
        </NextLink>
        <ButtonGroup spacing={4}>
          <Box display={{ base: 'none', sm: 'block' }}>
            <Button
              as={Link}
              href="https://github.com/floorp-Projects/floorp/"
              variant="ghost"
              textDecoration="none!important"
              leftIcon={<BiStar color="#ECC94B" />}
              rightIcon={<BiLinkExternal />}
              isExternal
            >
              Star us on GitHub
            </Button>
          </Box>
          <NextLink href="/download/" passHref>
            <Button as={Link} textDecoration="none!important" colorScheme="blue">
              Download
            </Button>
          </NextLink>
        </ButtonGroup>
      </Container>
    </Box>
  );
}

export default NavBar;
