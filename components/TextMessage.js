import { Alert, AlertIcon, Center, SlideFade } from "@chakra-ui/react";

export default function TextMessage({ startSlide, statusAlert, message }){
  return (
    <Center 
      height="100"
    >
      <SlideFade 
        in={startSlide} 
        offsetY="-20px"
      >
        <Alert 
          status={statusAlert} 
          variant="solid" 
          boxShadow="sm" 
          fontSize="lg" 
          p="3" 
          mx="auto"
          width={['90%', , '80%']}
          borderRadius="lg"
          textAlign="center"
        >
          <AlertIcon />{message}
        </Alert>
      </SlideFade>
    </Center>
  )
}