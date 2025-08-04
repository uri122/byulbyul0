import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddStore from "./pages/AddStore";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add-store" element={<AddStore />} />
    </Routes>
  );
}
