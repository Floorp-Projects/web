import { GridItem, HStack, Flex, Heading, Text } from '@chakra-ui/react';

function FeatureCard({ title, icon, description }) {
  return (
    <GridItem>
      <HStack spacing={5}>
        <Flex
          w={10}
          h={10}
          alignItems="center"
          justifyContent="center"
          borderColor="gray.200"
          borderWidth={1}
          bg="white"
          borderRadius="md"
        >
          {icon}
        </Flex>
        <Heading as="h3" fontSize="md" fontWeight="medium">
          {title}
        </Heading>
      </HStack>
      <Text mt={5} color="gray.600">
        {description}
      </Text>
    </GridItem>
  );
}

export default FeatureCard;
