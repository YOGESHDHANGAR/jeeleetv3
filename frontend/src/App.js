import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AdSpace from "./Components/Layout/AdSpace";
import Navbar from "./Components/Layout/Navbar";
import Home from "./Components/pages/Home/Home";
import QuestionDetail from "./Components/pages/Home/QuestionDetail";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="cotainer1">
          <Navbar />
          <div className="container1_1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/questions/:id" element={<QuestionDetail />} />
            </Routes>
          </div>
        </div>
        <div className="container2">
          <AdSpace />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
