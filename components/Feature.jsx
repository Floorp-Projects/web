import { Box, Flex, Heading, Text, Button } from '@chakra-ui/react';

function FeatureCard({ title, description, buttonLabel }) {
  return (
    <Flex
      my={20}
      alignItems="center"
      flexDirection={{ base: 'column', sm: 'row' }}
      _odd={{ flexDirection: { base: 'column', sm: 'row-reverse' } }}
    >
      <Box
        w={{ base: 'full', sm: '440px' }}
        my={{ base: 12, sm: 0 }}
        h="300px"
        bg="gray.200"
        mx="auto"
      />
      <Box w={{ base: 'full', sm: '440px' }} mx="auto" px={4}>
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
