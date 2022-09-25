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
import { BiLockAlt } from 'react-icons/bi';
import NavBar from '../components/NavBar';
import FeatureCard from '../components/FeatureCard';
import Feature from '../components/Feature';
import Footer from '../components/Footer';
import Head from 'next/head';
import Image from 'next/image';
import NextLink from 'next/link';

export default function Home({ article }) {
  return (
    <Box as="main">
      <NavBar />
      <Head>
        <title>Floorp</title>
        <meta
          name="description"
          content="Floorp は Firefox ベースで作られており、日本で誕生し、プライバシーに優れた新しいブラウザです。"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
          mr={{ base: 0, lg: 24 }}
        >
          <Heading as="h1" fontSize="6xl" fontWeight="extrabold">
            Proident proident
            <br />
            <Text as="span" color="purple.500">
              Qui ad aute ea
            </Text>
          </Heading>
          <Text color="gray.600" mt={7}>
            長い文章長い文章長い文章長い文章長い文章長い文章長い文章長い文章長い文章長い文章長い文章長い文章長い文章長い文章長い文章
          </Text>
          <ButtonGroup size="lg" mt={12} mx={{ base: 'auto', lg: 0 }}>
            <NextLink href="download/" passHref>
              <Button as={Link} colorScheme="blue">
                Download
              </Button>
            </NextLink>
            <Button>Documentation</Button>
          </ButtonGroup>
        </Box>
        <AspectRatio
          flexShrink={0}
          ml={{ lg: 10 }}
          w={{ base: '80%', lg: '420px' }}
          h={{ lg: '300px' }}
          mt={{ base: 10 }}
          ratio={4 / 3}
        >
          <Box w="full" h="full" bg={'gray.200'} />
        </AspectRatio>
      </Container>
      <Box bg="gray.50">
        <Container maxW="container.lg" pt={32} pb={20}>
          <Heading as="h2">特徴</Heading>
          <Grid gridTemplateColumns={'repeat(auto-fill,minmax(240px,1fr))'} mt={10} gap={10}>
            <FeatureCard
              title="Nice Feature"
              description="すごい特徴すごい特徴すごい特徴すごい特徴すごい特徴すごい特徴すごい特徴すごい特徴すごい特徴すごい特徴すごい特徴すごい特徴すごい特徴"
              icon={<BiLockAlt size={20} />}
            />
            <FeatureCard
              title="Nice Feature"
              description="すごい特徴すごい特徴すごい特徴すごい特徴すごい特徴すごい特徴すごい特徴すごい特徴すごい特徴すごい特徴すごい特徴すごい特徴すごい特徴"
              icon={<BiLockAlt size={20} />}
            />
            <FeatureCard
              title="Nice Feature"
              description="すごい特徴すごい特徴すごい特徴すごい特徴すごい特徴すごい特徴すごい特徴すごい特徴すごい特徴すごい特徴すごい特徴すごい特徴すごい特徴"
              icon={<BiLockAlt size={20} />}
            />
            <FeatureCard
              title="Nice Feature"
              description="すごい特徴すごい特徴すごい特徴すごい特徴すごい特徴すごい特徴すごい特徴すごい特徴すごい特徴すごい特徴すごい特徴すごい特徴すごい特徴"
              icon={<BiLockAlt size={20} />}
            />
            <FeatureCard
              title="Nice Feature"
              description="すごい特徴すごい特徴すごい特徴すごい特徴すごい特徴すごい特徴すごい特徴すごい特徴すごい特徴すごい特徴すごい特徴すごい特徴すごい特徴"
              icon={<BiLockAlt size={20} />}
            />
            <FeatureCard
              title="Nice Feature"
              description="すごい特徴すごい特徴すごい特徴すごい特徴すごい特徴すごい特徴すごい特徴すごい特徴すごい特徴すごい特徴すごい特徴すごい特徴すごい特徴"
              icon={<BiLockAlt size={20} />}
            />
          </Grid>
        </Container>
      </Box>
      <Container maxW="container.lg">
        <Feature
          title="素晴らしい機能"
          description="すごい機能すごい機能すごい機能すごい機能すごい機能すごい機能すごい機能すごい機能すごい機能すごい機能"
          buttonLabel="ちょっと見てみる"
        />
        <Feature
          title="素晴らしい機能"
          description="すごい機能すごい機能すごい機能すごい機能すごい機能すごい機能すごい機能すごい機能すごい機能すごい機能"
          buttonLabel="ちょっと見てみる"
        />
        <Feature
          title="素晴らしい機能"
          description="すごい機能すごい機能すごい機能すごい機能すごい機能すごい機能すごい機能すごい機能すごい機能すごい機能"
          buttonLabel="ちょっと見てみる"
        />
      </Container>
      <Container maxW="container.lg">
        <Heading fontSize="3xl" mb={10}>
          最新の記事
        </Heading>
        <LinkBox>
          <NextLink href={article.link} passHref>
            <LinkOverlay>
              <HStack spacing={5} alignItems="start">
                <Box>
                  <Heading as="h3" fontSize="2xl" py={5}>
                    {article.title}
                  </Heading>
                  <Text color="gray.600">{article.description}</Text>
                </Box>
                <Box>
                  <Image
                    src="/floorp-thumbnail.png"
                    alt={article.title}
                    width={400}
                    height={225}
                    borderRadius="lg"
                  />
                </Box>
              </HStack>
            </LinkOverlay>
          </NextLink>
        </LinkBox>
        <Flex justifyContent="center" mt={5}>
          <NextLink href="https://blog.ablaze.one/category/ablaze/ablaze-project/floorp/" passHref>
            <Button as={Link}>もっと見る</Button>
          </NextLink>
        </Flex>
      </Container>
      <Container
        maxW="container.lg"
        bg="blue.50"
        borderRadius="xl"
        py={24}
        my={20}
        display="flex"
        flexDirection="column"
        alignContent="center"
      >
        <Heading as="h2" size="lg" textAlign="center">
          <Text as="span" color="blackAlpha.500">
            Ad labore eu magna deserunt sit eu irure
          </Text>{' '}
          aute reprehenderit reprehenderit
        </Heading>
        <Text color="gray.600" textAlign="center" mt={8}>
          ダミーのテキストダミーのテキストダミーのテキストダミーのテキストダミーのテキスト
        </Text>
        <Button colorScheme="blue" mx="auto" mt={10}>
          Download
        </Button>
      </Container>
      <Footer />
    </Box>
  );
}

export async function getStaticProps() {
  const res = await fetch('https://wpapi.ablaze.one/?home=https://blog.ablaze.one/&categories=1');
  const article = (await res.json()).items[0];

  return {
    props: {
      article,
    },
  };
}
