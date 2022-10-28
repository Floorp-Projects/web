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

export default function Home({ article }) {
  return (
    <Box as="main">
      <Head>
        <title>Floorp</title>
        <meta
          name="description"
          content="Floorp は Firefox ベースで作られており、日本で誕生し、プライバシーに優れた新しいブラウザです。"
        />
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
            Floorp は Firefox
            をベースに、ウェブの公開性、匿名性、安全性、機能性のバランスにフォーカスを当てた日本製のウェブブラウザーです。
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
        <Container maxW="container.lg" pt={32} pb={20}>
          <Heading as="h2">特徴</Heading>
          <Grid gridTemplateColumns={'repeat(auto-fill,minmax(240px,1fr))'} mt={10} gap={10}>
            <FeatureCard
              title="強力なトラッカー保護"
              description="Floorp は既定で強力な追跡遮断機能が含まれており、ウェブに潜む様々な悪意あるトラッキングからユーザーを守ります。更に、指紋採取対策も。"
              icon={<BiShield size={20} />}
            />
            <FeatureCard
              title="幅広いカスタマイズ"
              description="Floorp のレイアウトカスタマイズは無制限。タブバーの位置をウインドウの一番下に移動したりタイトルバーを非表示にしたり。あなただけの Floorp を。"
              icon={<BiBrush size={20} />}
            />
            <FeatureCard
              title="切り替え可能なデザイン"
              description="Firefox の普通のテーマによるカスタマイズに加え、５つのデザインからブラウザーのインターフェイスを切り替えられます。更に、OS 固有のデザインも。"
              icon={<BiPaintRoll size={20} />}
            />
            <FeatureCard
              title="定期的なリリース"
              description="Floorp は Firefox ESR に基づき、４週間に一回の機能更新を行うラピッドリリースを採用するブラウザーです。Firefox より早くアップデートを提供し、セキュリティ問題を迅速に修正しています。"
              icon={<BiBadgeCheck size={20} />}
            />
            <FeatureCard
              title="情報収集なし"
              description="Floorp にはユーザーの情報を集める機能は備わっていません。私たちは、全ユーザーの総ダウンロード数とアップデート回数しか知りません！あなたの個人情報を知る必要はありません。"
              icon={<BiLockAlt size={20} />}
            />
            <FeatureCard
              title="完全なオープンソース"
              description="Floorp のソースコードは完全公開されており、誰でもソースコードを見たり Floorp を構築することができます。公開するのはブラウザー自体だけではありません。ビルド環境もオープンソースです。"
              icon={<BiCodeAlt size={20} />}
            />
          </Grid>
        </Container>
      </Box>
      <Container maxW="container.lg">
        <Feature
          title="両サイドに配置できるサイドバー"
          description="サイドバーは１つで満足でしょうか？サイドバーでウェブサイトを開きたいと思いませんか？ Floorp にはウェブパネルとブラウザー管理ツールを表示できるサイドバーが組み込まれており、快適なブラウジングが可能です。"
          buttonLabel="ちょっと見てみる"
          image="./feature1.svg"
          modalText="ああああああああああああああああああああああああああああああ"
          modalImage="./feature1.svg"
        />
        <Feature
          title="細部までカスタマイズできるレイアウト"
          description="ツリー型タブを組み込み、垂直タブとして使用、または併用したり。ブックマークバーのカスタマイズなども。痒い所に手が届く、そんなブラウザーです。"
          buttonLabel="ちょっと見てみる"
          image="./feature2.svg"
          modalText="ああああああああああああああああああああああああああああああ"
          modalImage="./feature1.svg"
        />
        <Feature
          title="ウェブとユーザーの双方を第一に考えました"
          description="Floorp はユーザーを追跡しません。また、ウェブサイトでの悪意ある追跡のみをブロックします。Floorp を使えば、ウェブサイト側、ユーザー側の双方に利益のあるインターネットを構築できます。"
          buttonLabel="ちょっと見てみる"
          image="./feature3.svg"
          modalText="ああああああああああああああああああああああああああああああ"
          modalImage="./feature1.svg"
        />
      </Container>
      <Container maxW="container.lg">
        <Heading fontSize="3xl" mt={20} mb={8}>
          最新の記事
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
            <Button as={Link}>もっと見る</Button>
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
              Create your
            </Text>{' '}
            own &#34;Browser&#34; with Floorp
          </Heading>
          <Text color="gray.600" textAlign="center" mt={5}>
            最新バージョンの Floorp を入手する
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

export async function getStaticProps() {
  const res = await fetch('https://wpapi.ablaze.one/?home=https://blog.ablaze.one/&categories=45');
  const article = (await res.json()).items[0];

  return {
    props: {
      article,
    },
  };
}
