import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';
import Image from 'next/image';

function FeatureCard({ title, image, description, buttonLabel, modalText, modalImage }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex
      my={20}
      alignItems="center"
      flexDirection={{ base: 'column', sm: 'row' }}
      _odd={{ flexDirection: { base: 'column', sm: 'row-reverse' } }}
    >
      <Box w={{ base: 'full', sm: '480px' }} my={{ base: 12, sm: 0 }} h="270px" mx="auto">
        <Image src={image} width="480px" height="270px" alt="Feature Image" />
      </Box>
      <Box w={{ base: 'full', sm: '480px' }} mx="auto" px={4}>
        <Heading as="h2" fontSize="xl" fontWeight="bold">
          {title}
        </Heading>
        <Text color="gray.600" fontSize="sm" lineHeight="" mt={7}>
          {description}
        </Text>
        <Button w="full" mt={7} variant="outline" onClick={onOpen}>
          {buttonLabel}
        </Button>
        <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent px={5} py={10}>
            <ModalHeader>{title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody display="flex" gap="2">
              <Text>{modalText}</Text>
              <Box flexShrink={0}>
                <Image src={modalImage} width="360px" height="203px" objectFit="cover" alt="Feature Image" />
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </Flex>
  );
}

export default FeatureCard;
