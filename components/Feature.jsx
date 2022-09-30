import { Box, Flex, Heading, Text, Button } from '@chakra-ui/react';
import Image from 'next/image';

function FeatureCard({ title, image, description, buttonLabel }) {
  return (
    <Flex
      my={20}
      alignItems="center"
      flexDirection={{ base: 'column', sm: 'row' }}
      _odd={{ flexDirection: { base: 'column', sm: 'row-reverse' } }}
    >
      {image ? (
        <Box w={{ base: 'full', sm: '480px' }} my={{ base: 12, sm: 0 }} h="270px" mx="auto">
          <Image src={image} width="480px" height="270px" alt="Feature Image" />
        </Box>
      ) : (
        <Box
          w={{ base: 'full', sm: '480px' }}
          my={{ base: 12, sm: 0 }}
          h="270px"
          bg="gray.200"
          mx="auto"
        />
      )}
      <Box w={{ base: 'full', sm: '480px' }} mx="auto" px={4}>
        <Heading as="h2" fontSize="xl" fontWeight="bold">
          {title}
        </Heading>
        <Text color="gray.600" fontSize="sm" lineHeight="" mt={7}>
          {description}
        </Text>
        <Button w="full" mt={7} variant="outline">
          {buttonLabel}
        </Button>
      </Box>
    </Flex>
  );
}

export default FeatureCard;
