import { Input, Stack, IconButton, useToast, Box, Container } from "@chakra-ui/react";
import { useAppContext } from "../context/appContext";
import { FaPaperclip } from "react-icons/fa";
import supabase from "../supabaseClient";
import { useRef, useState } from "react";
import { BiSend } from "react-icons/bi";

export default function MessageForm() {
  const { username, country, session } = useAppContext();
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    if (!message) return;

    setMessage("");

    try {
      const { error } = await supabase.from("messages").insert([
        {
          text: message,
          username,
          country,
          is_authenticated: session ? true : false,
        },
      ]);

      if (error) {
        toast({
          title: "Error sending",
          description: error.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        return;
      }
    } 
    catch (error) {} 
    finally { setIsSending(false) }
  };

  async function handleFileChange(event){
    const selectedFile = event.target.files[0];
    
    if (!selectedFile) return;
    setIsSending(true);

    try {
      const { data, error } = await supabase
        .storage
        .from('chats_assests')
        .upload('public/avatar1.png', selectedFile, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) {
        toast({
          title: "Error sending",
          description: error.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        return;
      }
    } 
    catch (error) {} 
    finally { setIsSending(false) }
  }

  return <Box py="10px" pt="15px" bg="var(--light-background)" borderRadius={"10px 0"}>
    <Container width="100%" margin={0}>
      <form onSubmit={handleSubmit} autoComplete="off">
        <Stack direction="row">
          <input ref={inputRef} style={{height: 0, width: 0}} onChange={handleFileChange} type="file" />

          <IconButton onClick={() => inputRef.current.click()}
                      icon={<FaPaperclip />}
                      isLoading={isSending}
                      disabled={!message}
                      colorScheme="teal"
                      aria-label="Send"
                      fontSize="20px"/>
                      
          <IconButton onClick={() => inputRef.current.click()}
                      icon={<FaPaperclip />}
                      isLoading={isSending}
                      disabled={!message}
                      colorScheme="teal"
                      aria-label="Send"
                      fontSize="20px"/>

          <IconButton onClick={() => inputRef.current.click()}
                      icon={<FaPaperclip />}
                      isLoading={isSending}
                      disabled={!message}
                      colorScheme="teal"
                      aria-label="Send"
                      fontSize="20px"/>

          <Input onChange={e => setMessage(e.target.value)}
                  placeholder="Digite uma mensagem"
                  value={message}
                  name="message"
                  border="none"
                  bg="white"
                  autoFocus/>

          <IconButton isLoading={isSending}
                      disabled={!message}
                      colorScheme="teal"
                      icon={<BiSend />}
                      aria-label="Send"
                      fontSize="20px"
                      type="submit"/>
        </Stack>
      </form>
    </Container>
  </Box>
}
