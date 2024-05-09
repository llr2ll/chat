import { Input, Stack, IconButton, useToast, Box, Container } from "@chakra-ui/react";
import { useAppContext } from "../context/appContext";
import supabase from "../supabaseClient";
import { BiSend } from "react-icons/bi";
import { useState } from "react";

export default function MessageForm() {
  const { username, country, session } = useAppContext();
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState("");
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

  return <Box py="10px" pt="15px" bg="var(--light-background)" borderRadius={"10px 0"}>
    <Container maxW="600px">
      <form onSubmit={handleSubmit} autoComplete="off">
        <Stack direction="row">
          <Input
            name="message"
            placeholder="Digite uma mensagem"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            bg="white"
            border="none"
            autoFocus
            maxLength="500"
          />
          <IconButton
            colorScheme="teal"
            aria-label="Send"
            fontSize="20px"
            icon={<BiSend />}
            type="submit"
            disabled={!message}
            isLoading={isSending}
          />
        </Stack>
      </form>
    </Container>
  </Box>
}
