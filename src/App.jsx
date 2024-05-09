import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppContextProvider, useAppContext } from "./context/appContext";
import { ChakraProvider, Box, theme } from "@chakra-ui/react";
import Header from "./layout/Header";
import Chat from "./components/Chat";
import Footer from "./layout/Footer";
import "./App.css";

function App() {
  const { username, setUsername, routeHash } = useAppContext();

  if (routeHash) {
    if (routeHash.endsWith("&type=recovery")) window.location.replace(`/login/${routeHash}`)

    if (routeHash.startsWith("#error_code=404")) return <div>
      <p>This link has expired</p>
      <a href="/" style={{ cursor: "pointer" }} variant="link">Back to app</a>
    </div>
  }
  return <ChakraProvider theme={theme}>
    <AppContextProvider>
      <Box>
        <Router>
          <Routes>
            <Route path="/" element={
              <main style={{display: "flex" }}>
                <section style={{width: "30%"}}>
                  <Header />
                </section>
                <section style={{width: "70%"}}>
                  <Chat />
                  <Footer />
                </section>
              </main>
            }/>
            <Route path="*" element={<p>Not found</p>} />
          </Routes>
        </Router>
      </Box>
    </AppContextProvider>
  </ChakraProvider>
}

export default App;
