import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import A0feef30 from "./pages/A0feef30";
import * as levels from "./pages/levels";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/E7a3" element={<levels.e7a3 />}></Route>
        <Route path="/E6e3" element={<levels.e6e3 />}></Route>
        <Route path="/E2622" element={<levels.e2622 />}></Route>
        <Route path="/E463" element={<levels.e463 />}></Route>
        <Route path="/E24a2" element={<levels.e24a2 />}></Route>
        <Route path="/E25e2" element={<levels.e25e2 />}></Route>
        <Route path="/E523" element={<levels.e523 />}></Route>
        <Route path="/E163" element={<levels.e163 />}></Route>
        <Route path="/A0feef30" element={<A0feef30 />}></Route>
      </Routes>
    </>
  );
}
