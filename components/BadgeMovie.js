import { Badge } from "@chakra-ui/react";

export default function BadgeMovie({ variantBadge, content, colorBadge }) {
  return (
    <Badge
      colorScheme="teal"
      variant={variantBadge}
      p="2" 
      borderRadius="md" 
      color={colorBadge}
      m="1"
    >
      {content} 
    </Badge>
  )
}