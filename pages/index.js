import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  Heading,
  AspectRatio,
  Text,
  Flex,
} from '@chakra-ui/react';
import { BiLockAlt } from 'react-icons/bi';
import FeatureCard from '../components/FeatureCard';
import Feature from '../components/Feature';
import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  return (
    <Box mx={5}>
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
        py={20}
        px={29}
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
            <Button colorScheme="blue">Download</Button>
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
      <Container
        maxW="container.lg"
        bg="blue.50"
        borderRadius="xl"
        py={24}
        my={10}
        display="flex"
        flexDirection="column"
        alignContent="center"
      >
        <Heading as="h2" size="lg" textAlign="center">
          <Text as="span" color="blackAlpha.500">
            Proident proident
          </Text>{' '}
          Qui ad aute ea
        </Heading>
        <Button colorScheme="blue" mx="auto" mt={10}>
          Download
        </Button>
      </Container>
    </Box>
  );
}
