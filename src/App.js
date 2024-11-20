import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import Playground from "./screens/PlaygroundScreen";
import { PlaygroundProvider } from "./Providers/PlaygroundProvider";
import { ModalProvider } from './Providers/ModalProvider';
function App() {
  return (
    <BrowserRouter>
    <ModalProvider>
      <PlaygroundProvider>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/playground/:folderId/:playgroundId" element={<Playground />} />
        </Routes>
      </PlaygroundProvider>
      </ModalProvider>
    </BrowserRouter>
  );
}

export default App;
