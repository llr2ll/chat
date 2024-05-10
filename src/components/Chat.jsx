import { Badge, Box, Container } from "@chakra-ui/react";
import { useAppContext } from "../context/appContext";
import { BsChevronDoubleDown } from "react-icons/bs";
import { useEffect, useState } from "react";
import Messages from "./Messages";

export default function Chat() {
  const { scrollRef, onScroll, scrollToBottom, isOnBottom, unviewedMessageCount } = useAppContext();
  const [height, setHeight] = useState(window.innerHeight - 65);

  useEffect(() => window.addEventListener("resize", setHeight(window.innerHeight - 65)), []);

  return <Container width="100%" margin={0} padding={0} maxWidth="auto">
    <Box bg="#fffcf6" p="5" overflow="auto" borderRadius="10px" height={height} onScroll={onScroll} ref={scrollRef}>
      <Messages />
      
      {!isOnBottom && (
        <div style={{ position: "sticky", bottom: 8, float: "right", cursor: "pointer" }} onClick={scrollToBottom}>
          {unviewedMessageCount > 0 ?
              <Badge ml="1" fontSize="0.8em" colorScheme="green" display="flex" borderRadius="7px" padding="3px 5px" alignItems="center">
                {unviewedMessageCount}
              
                <BsChevronDoubleDown style={{ marginLeft: "3px" }} />
              </Badge> 
            : 
              <BsChevronDoubleDown style={{ marginLeft: "3px" }} />
          }
        </div>
      )}
    </Box>
  </Container>
}
