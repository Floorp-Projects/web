import { Box, Button, ButtonGroup, Container, Heading, Skeleton, Text } from '@chakra-ui/react';
import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  return (
    <Box p={5}>
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
          <Heading as="h2" fontSize="6xl" fontWeight="extrabold">
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
    </Box>
  );
}
