import { Avatar, Box, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import { useAppContext } from "../context/appContext";

export default function Header() {
  const { username, randomUsername, session } = useAppContext();
  
  return <Box padding='4' boxShadow='lg' bg='white' display="flex">
    <SkeletonCircle size='10' isLoaded={true}>
      <Avatar name={username} src='https://bit.ly/dan-abramov' />
    </SkeletonCircle>
    <SkeletonText ml='5' noOfLines={3} width="100%"/>
  </Box>
}