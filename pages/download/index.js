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
  FormHelperText,
} from '@chakra-ui/react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Head from 'next/head';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import { Octokit } from '@octokit/rest';

function CustomDivider() {
  return (
    <Divider
      orientation="vertical"
      h={3}
      display="inline-block"
      mx={2}
      transform="translateY(1px)"
      borderColor="gray.600"
    />
  );
}

export default function Download({ release, assets, releasedOn }) {
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
            <FormHelperText>
              {assets[currentPlatform].fileSize}
              <CustomDivider />
              {releasedOn}
              <CustomDivider />
              {release}
            </FormHelperText>
          </FormControl>
          <NextLink href={assets[currentPlatform].url} passHref>
            <Button as={Link} mt={5}>
              {assets[currentPlatform].label}
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
              <Link href="https://github.com/floorp-projects/floorp" isExternal>
                https://github.com/floorp-projects/floorp
              </Link>
            </Box>
            <Box>
              <Heading as="h3" fontSize="xl" my={2}>
                Documentation
              </Heading>
              <Link
                href="https://github.com/Floorp-Projects/Floorp/blob/ESR102/.github/workflow.md"
                isExternal
              >
                https://github.com/Floorp-Projects/Floorp/blob/ESR102/.github/workflow.md
              </Link>
            </Box>
          </Stack>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}

export async function getStaticProps() {
  const octokit = new Octokit();
  const response = await octokit.rest.repos.getRelease({
    owner: 'Floorp-Projects',
    repo: 'Floorp',
    release_id: 'latest',
  });
  const platforms = ['Windows', 'macOS', 'Linux'];
  const labels = [
    'Download for Windows 64bit',
    'Download for macOS Universal',
    'Download for Linux',
  ];
  const fileNames = [
    'floorp-stub.installer.exe',
    'floorp-macOS-Univerasal.dmg',
    'linux-x86_64.tar.bz2',
  ];
  const date = new Date(response.data.published_at);
  const assets = fileNames.map((fileName, index) => {
    const asset = response.data.assets.find((asset) => asset.name.includes(fileName));
    return {
      platform: platforms[index],
      label: labels[index],
      url: asset.browser_download_url,
      fileSize:
        asset.size > 1024 * 1024
          ? `${Math.round(asset.size / 1024 / 1024)}MB`
          : `${Math.round(asset.size / 1024)}KB`,
    };
  });
  return {
    props: {
      release: `Release ${response.data.name}`,
      assets,
      releasedOn: `Released on ${date.toLocaleString('en', {
        month: 'long',
      })} ${date.getDate()}, ${date.getFullYear()}`,
    },
  };
}
