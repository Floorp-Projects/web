import { Box, Flex, Heading, Text, Button } from '@chakra-ui/react';

function FeatureCard({ title, description, buttonLabel }) {
  return (
    <Flex h="400px" alignItems="center" _odd={{ flexDirection: 'row-reverse' }}>
      <Box h="300px" w="420px" bg="gray.200" mx="auto" />
      <Box w="420px" mx="auto" px={7}>
        <Heading as="h2" fontSize="2xl" fontWeight="bold">
          {title}
        </Heading>
        <Text color="gray.600" mt={7}>
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
