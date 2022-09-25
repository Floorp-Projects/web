import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Container,
  Heading,
  Link,
  Divider,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Head from 'next/head';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';

const platforms = [
  {
    platform: 'Windows',
    label: 'Download for Windows 64bit',
    url: 'https://github.com/Floorp-Projects/Floorp/releases/latest/download/floorp-stub.installer.exe',
  },
  {
    platform: 'macOS',
    label: 'Download for macOS Univerasal',
    url: 'https://github.com/floorp-Projects/floorp/releases/latest/download/floorp-macOS-Univerasal.dmg',
  },
  {
    platform: 'Linux',
    label: 'Download from FLATHUB',
    url: 'https://flathub.org/apps/details/one.ablaze.floorp',
  },
];

export default function Download() {
  const [currentPlatform, setCurrentPlatform] = useState(0);
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf('windows') !== -1) setCurrentPlatform(0);
    else if (userAgent.indexOf('mac os x') !== -1) setCurrentPlatform(1);
    else setCurrentPlatform(2);
  }, []);

  const handlePlatformChange = (e) => {
    setCurrentPlatform(e.target.value);
  };

  return (
    <Box as="main">
      <NavBar />
      <Head>
        <title>Download - Floorp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container as="header" maxW="container.lg" pt={28} pb={10}>
        <Heading as="h1">Download</Heading>
        <Box maxW="container.sm" mx="auto" py={20}>
          <FormControl>
            <FormLabel>Platform</FormLabel>
            <Select value={currentPlatform} onChange={handlePlatformChange}>
              <option value="0">Windows</option>
              <option value="1">macOS</option>
              <option value="2">Linux</option>
            </Select>
          </FormControl>
          <NextLink href={platforms[currentPlatform].url}>
            <Button as={Link} mt={5}>
              {platforms[currentPlatform].label}
            </Button>
          </NextLink>
          <Text color="gray.500" textAlign="center" my={12}>
            OR
          </Text>
          <Heading as="h2" fontSize="2xl" textAlign="center" my={5}>
            Build from Source Code
          </Heading>
          <Stack spacing={5}>
            <Box>
              <Heading as="h3" fontSize="xl" my={2}>
                Source Code
              </Heading>
              <NextLink href="https://github.com/floorp-projects/floorp" passHref>
                <Link>https://github.com/floorp-projects/floorp</Link>
              </NextLink>
            </Box>
            <Box>
              <Heading as="h3" fontSize="xl" my={2}>
                Documentation
              </Heading>
              <NextLink
                href="https://github.com/Floorp-Projects/Floorp/blob/ESR102/.github/workflow.md"
                passHref
              >
                <Link>
                  https://github.com/Floorp-Projects/Floorp/blob/ESR102/.github/workflow.md
                </Link>
              </NextLink>
            </Box>
          </Stack>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}
