import { Container, Heading } from "@chakra-ui/react";

export default function ContainerContent({ message, content }) {
  return (
    <Container my="10">
      <Heading
        as="h2" 
        size="lg" 
        borderBottom="2px" 
        borderColor="teal.500" 
        p="2"
        mb='1'
      >
        {message}
      </Heading>
      {content}
    </Container>
  )
}