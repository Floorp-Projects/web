import {
  Box,
  ButtonGroup,
  IconButton,
  Container,
  Text,
  Link,
  VStack,
  Divider,
  HStack,
} from '@chakra-ui/react';
import { FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa';
import Image from 'next/image';
import NextLink from 'next/link';
import { useBuiltYear } from 'hooks/useBuiltYear';

function Footer() {
  const buildyear = useBuiltYear();
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
                href="https://aka.ablaze.one/discord"
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
            <Text color="gray.500">© {buildyear} Ablaze</Text>
          </HStack>
        </VStack>
        <Divider mx={5} w="unset" />
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
