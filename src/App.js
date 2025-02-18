import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import PlaygroundScreen from "./screens/PlaygroundScreen";
import { PlaygroundProvider } from "./Providers/PlaygroundProvider";
import { ModalProvider } from './Providers/ModalProvider';
function App() {
  return (
    <BrowserRouter>
    <ModalProvider>
      <PlaygroundProvider>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/playground/:fileId/:folderId" element={<PlaygroundScreen />} />
        </Routes>
      </PlaygroundProvider>
      </ModalProvider>
    </BrowserRouter>
  );
}

export default App;
