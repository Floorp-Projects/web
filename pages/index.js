import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  Heading,
  AspectRatio,
  Text,
  LinkOverlay,
  HStack,
  Flex,
  LinkBox,
  Link,
} from '@chakra-ui/react';
import { BiBadgeCheck, BiBrush, BiCodeAlt, BiLockAlt, BiPaintRoll, BiShield } from 'react-icons/bi';
import NavBar from '../components/NavBar';
import FeatureCard from '../components/FeatureCard';
import Feature from '../components/Feature';
import Footer from '../components/Footer';
import Head from 'next/head';
import Image from 'next/image';
import NextLink from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Home({ article }) {
  const { t } = useTranslation(['common', 'landing-page']);

  return (
    <Box as="main">
      <Head>
        <title>Floorp</title>
        <meta name="description" content={t('description')} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <Container
        as="header"
        maxW="container.lg"
        pt={40}
        pb={20}
        display="flex"
        flexWrap={{ base: 'wrap', lg: 'nowrap' }}
        justifyContent={{ base: 'center', lg: 'normal' }}
      >
        <Box
          display={{ base: 'flex', lg: 'block' }}
          flexDirection={{ base: 'column', lg: 'normal' }}
          mr={{ base: 0, lg: 12 }}
        >
          <Heading as="h1" fontSize="6xl" fontWeight="extrabold" wordBreak="break-word">
            Unlimited customization
            <br />
            <Text as="span" color="purple.500">
              with Floorp
            </Text>
          </Heading>
          <Text color="gray.600" mt={7}>
            {t('description')}
          </Text>
          <ButtonGroup size="lg" mt={12} mx={{ base: 'auto', lg: 0 }}>
            <NextLink href="download/" passHref>
              <Button as={Link} colorScheme="blue">
                Download
              </Button>
            </NextLink>
            <Button as={Link} href="https://github.com/Floorp-Projects/Floorp/" isExternal>
              View Source Code
            </Button>
          </ButtonGroup>
        </Box>
        <Flex alignItems="center">
          <AspectRatio flexShrink={0} w={{ base: '80%', lg: '420px' }} ratio={1920 / 1031}>
            <Image src="/hero.png" layout="fill" alt="Floorp Screenshot" />
          </AspectRatio>
        </Flex>
      </Container>
      <Box bg="gray.50">
        <Container maxW="container.lg" pt={32} pb={32}>
          <Heading as="h2">{t('landing-page:feature')}</Heading>
          <Grid gridTemplateColumns={'repeat(auto-fill,minmax(240px,1fr))'} mt={10} gap={10}>
            {[BiShield, BiBrush, BiPaintRoll, BiBadgeCheck, BiLockAlt, BiCodeAlt].map((Icon, i) => (
              <FeatureCard
                title={t(`landing-page:features.${i}.title`)}
                description={t(`landing-page:features.${i}.description`)}
                icon={<Icon size={20} />}
                key={i}
              />
            ))}
          </Grid>
        </Container>
      </Box>
      <Container maxW="container.lg">
        {Array.from({ length: 3 }, (_, i) => (
          <Feature
            title={t(`landing-page:columns.${i}.title`)}
            description={t(`landing-page:columns.${i}.description`)}
            image={`feature${i + 1}.svg`}
            // modalText={t(`landing-page:columns.${i}.modalText`)}
            key={i}
          />
        ))}
      </Container>
      <Container maxW="container.lg">
        <Heading fontSize="3xl" mt={20} mb={8}>
          {t('landing-page:latest-article')}
        </Heading>
        <LinkBox>
          <NextLink href={article.link} passHref>
            <LinkOverlay>
              <Flex
                gap={5}
                alignItems="center"
                flexDirection={{ base: 'column-reverse', md: 'row' }}
              >
                <Box>
                  <Heading as="h3" fontSize="2xl" py={5}>
                    {article.title}
                  </Heading>
                  <Text color="gray.600">{article.description}</Text>
                </Box>
                <Box borderRadius="lg" overflow="hidden" className="thumbnail-image">
                  <Image src="/floorp-thumbnail.png" alt={article.title} width={400} height={225} />
                </Box>
              </Flex>
            </LinkOverlay>
          </NextLink>
        </LinkBox>
        <Flex justifyContent="center" mt={5}>
          <NextLink href="https://blog.ablaze.one/category/ablaze/ablaze-project/floorp/" passHref>
            <Button as={Link}>{t('landing-page:see-more')}</Button>
          </NextLink>
        </Flex>
      </Container>
      <Container maxW="container.lg">
        <Box
          bg="blue.50"
          borderRadius="xl"
          py={20}
          my={16}
          display="flex"
          flexDirection="column"
          alignContent="center"
        >
          <Heading as="h2" size="lg" fontWeight="black" textAlign="center">
            <Text as="span" color="blackAlpha.500">
              Create
            </Text>{' '}
            your own &#34;Browser&#34;{' '}
            <Text as="span" color="blackAlpha.500">
              with Floorp
            </Text>
          </Heading>
          <Text color="gray.600" textAlign="center" mt={5}>
            {t('landing-page:download-floorp')}
          </Text>
          <NextLink href="download" passHref>
            <Button as={Link} colorScheme="blue" mx="auto" mt={10}>
              Download
            </Button>
          </NextLink>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}

export async function getStaticProps({ locale }) {
  const res = await fetch('https://wpapi.ablaze.one/?home=https://blog.ablaze.one/&categories=45');
  const article = (await res.json()).items[0];

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'landing-page'])),
      article,
    },
  };
}
