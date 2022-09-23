import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  Heading,
  Skeleton,
  Text,
} from '@chakra-ui/react';
import { BiLockAlt } from 'react-icons/bi';
import FeatureCard from '../components/FeatureCard';
import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  return (
    <Box>
      <Head>
        <title>Floorp</title>
        <meta
          name="description"
          content="Floorp は Firefox ベースで作られており、日本で誕生し、プライバシーに優れた新しいブラウザです。"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container as="header" maxW="container.lg" py={20} px={15} display="flex">
        <Box mr={24}>
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
          <ButtonGroup size="lg" mt={12}>
            <Button colorScheme="blue">Download</Button>
            <Button>Documentation</Button>
          </ButtonGroup>
        </Box>
        <Skeleton flexShrink={0} isLoaded={false} ml="auto" w="420px" h="300px" />
      </Container>
      <Box
        bg="gray.50"
        backgroundImage="url('curve.svg')"
        backgroundSize="100%"
        backgroundRepeat="no-repeat"
        backgroundPosition="0 0"
      >
        <Container maxW={'container.lg'} pt={32} pb={20}>
          <Heading as="h2">特徴</Heading>
          <Grid gridTemplateColumns={'repeat(auto-fill,minmax(240px,1fr))'} mt={10} gap={6}>
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
    </Box>
  );
}
