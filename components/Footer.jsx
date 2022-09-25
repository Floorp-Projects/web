import {
  Box,
  ButtonGroup,
  IconButton,
  Container,
  Flex,
  Heading,
  Text,
  Link,
  VStack,
  Divider,
  HStack,
} from '@chakra-ui/react';
import { FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa';
import Image from 'next/image';
import NextLink from 'next/link';

function Footer() {
  return (
    <Box as="footer" bg="gray.50" borderTopColor="gray.200" borderTopWidth={1}>
      <Container maxW="container.lg">
        <VStack alignItems="start" py={10}>
          <Image src="/logo.svg" alt="logo" width={100} height={50} />
          <HStack justifyContent="space-between" w="full" alignItems="flex-end">
            <ButtonGroup spacing={4} mt={4}>
              <IconButton
                as={Link}
                icon={<FaDiscord size={20} />}
                href="https://discord.gg/ca7sH3ct"
                isExternal
              />
              <IconButton
                as={Link}
                icon={<FaTwitter size={20} />}
                href="https://twitter.com/Floorp_Browser"
                isExternal
              />
              <IconButton
                as={Link}
                icon={<FaGithub size={20} />}
                href="https://github.com/floorp-Projects/floorp/"
                isExternal
              />
            </ButtonGroup>
            <Text color="gray.500">© 2022 Ablaze</Text>
          </HStack>
        </VStack>
        <Divider mx={5} />
        <Box textAlign="center" p={4}>
          <NextLink href="https://ablaze.one">
            <a>
              <Image src="/ablaze-logo.svg" alt="ablaze" width={100} height={30} />
            </a>
          </NextLink>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
