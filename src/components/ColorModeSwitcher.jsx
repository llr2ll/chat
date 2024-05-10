import { useColorMode, useColorModeValue, IconButton } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

export function ColorModeSwitcher(props){
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const text = useColorModeValue("dark", "light");
  const { toggleColorMode } = useColorMode();

  return <IconButton aria-label={`Switch to ${text} mode`}
                     onClick={toggleColorMode}
                     icon={<SwitchIcon />}
                     variant="ghost"
                     color="current"
                     marginLeft="2"
                     fontSize="lg"
                     {...props}
                     size="md"/>
}
