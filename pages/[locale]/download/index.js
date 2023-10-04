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
  Alert,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react';
import NavBar from 'components/NavBar';
import Footer from 'components/Footer';
import Head from 'next/head';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import { Octokit } from '@octokit/rest';
import { Trans, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getStaticPaths } from 'lib/getStatic';
import { getI18nProps } from '../../../lib/getStatic';

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
  const { t } = useTranslation('download-page');

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf('windows') !== -1) setCurrentPlatform(0);
    else if (userAgent.indexOf('mac os x') !== -1) setCurrentPlatform(3);
    else setCurrentPlatform(5);
  }, []);

  const handlePlatformChange = (e) => {
    setCurrentPlatform(e.target.value);
  };

  // Floorp Daylight has so many build. Have to move to GitHub Releases.
  const daylightBuild = (
    <>
    <Heading as="h2" fontSize="xl" my={5}>
      Download from GitHub Releases
    </Heading>

    <Alert p={5} borderRadius="xl" display="block">
          <Trans t={t} i18nKey="daylight-alert">
            Floorp Daylight is a beta version of Floorp. It is not recommended to use it for production. Please use it at your own risk.
          </Trans>
     </Alert>

    <NextLink href={"https://github.com/Floorp-Projects/Floorp/releases/tag/beta"} passHref>
      <Button as={Link} mt={5}>
        Go to GitHub Releases
      </Button>
    </NextLink>
    </>
  )

  const linux = (
    <>
      <Heading as="h2" fontSize="xl" my={5}>
        Install from PPA
      </Heading>
      <Box bg="gray.50" borderRadius="lg" mt={7} p={5} w="full">
        <UnorderedList listStyleType={'"$ "'} fontFamily="monospace" fontSize="md">
          <ListItem>
            curl -fsSL https://ppa.ablaze.one/KEY.gpg | sudo gpg --dearmor -o
            /usr/share/keyrings/Floorp.gpg
          </ListItem>
          <ListItem>
            sudo curl -sS --compressed -o /etc/apt/sources.list.d/Floorp.list
            &apos;https://ppa.ablaze.one/Floorp.list&apos;
          </ListItem>
          <ListItem>sudo apt update</ListItem>
          <ListItem>sudo apt install floorp</ListItem>
        </UnorderedList>
      </Box>
      <Heading as="h2" fontSize="xl" my={5}>
        Install from Flathub
      </Heading>
      <Box bg="gray.50" borderRadius="lg" mt={7} p={5} w="full">
        <UnorderedList listStyleType={'"$ "'} fontFamily="monospace" fontSize="md">
          <ListItem>flatpak install flathub one.ablaze.floorp</ListItem>
          <ListItem>flatpak run one.ablaze.floorp</ListItem>
        </UnorderedList>
      </Box>
    </>
  )

  return (
    <Box as="main">
      <NavBar />
      <Head>
        <title>Download - Floorp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container as="header" maxW="container.lg" pt={28} pb={10}>
        <Heading as="h1" mb={10}>
          Download
        </Heading>
        <Alert p={5} borderRadius="xl" display="block">
          <Trans t={t} i18nKey="download-alert">
            ダウンロードすることで
            <Link href="https://docs.ablaze.one/floorp_privacy_policy">プライバシーポリシー</Link>
            に同意したものとします。
          </Trans>
        </Alert>
        <Box maxW="container.sm" mx="auto" py={20}>
          <FormControl>
            <FormLabel>Platform</FormLabel>
            <Select value={currentPlatform} onChange={handlePlatformChange}>
              <option value="0"><Trans t={t} i18nKey="windows64bit-online-installer"/></option>
              <option value="1"><Trans t={t} i18nKey="windows64bit-offline-installer"/></option>
              <option value="2">Windows 32bit</option>
              <option value="3">macOS</option>
              <option value="4">Windows portable version</option>
              <option value="5">Linux</option>
              <option value="6">Daylight (beta)</option>
            </Select>
            {currentPlatform != 5 && currentPlatform != 6 ? (
              <FormHelperText>
                {assets[currentPlatform].fileSize}
                <CustomDivider />
                {releasedOn}
                <CustomDivider />
                {release}
              </FormHelperText>
            ) : null}
          </FormControl>

          { currentPlatform == 5 ? linux : "" }
          { currentPlatform == 6 ? daylightBuild : "" }
          { currentPlatform != 5 && currentPlatform != 6 ? (
          <NextLink href={assets[currentPlatform].url} passHref>
            <Button as={Link} mt={5}>
              {assets[currentPlatform].label}
              </Button>
              </NextLink>
            ) : "" }

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

function getAssetInfo(asset) {
  const fileSize = asset.size / 1024 / 1024;
  return {
    url: asset.browser_download_url,
    label: asset.name,
    fileSize: `${fileSize.toFixed(2)} MB`,
  };
}

export async function getStaticProps(ctx) {
  const octokit = new Octokit();
  const response = await octokit.rest.repos.getRelease({
    owner: 'Floorp-Projects',
    repo: 'Floorp',
    release_id: 'latest',
  });
  const platforms = ['Windows 64bit', 'Windows 32bit', 'Windows 64bit Offline', 'macOS', 'Linux'];
  const fileNames = ['floorp-stub.installer.exe', 'floorp-win64.installer.exe', 'floorp-win32.installer.exe', 'floorp-macOS-universal.dmg'];
  const date = new Date(response.data.published_at);
  const assets = fileNames.map((fileName, index) => {
    const asset = response.data.assets.find((asset) => asset.name.includes(fileName));
    return {
      platform: platforms[index],
      ...getAssetInfo(asset),
    };
  });

  const portableResponse = await octokit.rest.repos.getRelease({
    owner: 'Floorp-Projects',
    repo: 'Floorp-Portable',
    release_id: 'latest',
  });
  let targetAsset = portableResponse.data.assets.find((asset) => asset.name.includes('windows'));
  assets.push({
    platform: 'Portable version',
    ...getAssetInfo(targetAsset),
  });

  return {
    props: {
      release: `Release ${response.data.name}`,
      assets,
      releasedOn: `Released on ${date.toLocaleString('en', {
        month: 'long',
      })} ${date.getDate()}, ${date.getFullYear()}`,
      ...(await getI18nProps(ctx, ['download-page'])),
    },
  };
}

export { getStaticPaths };
