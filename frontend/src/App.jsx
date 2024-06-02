import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Heading } from "./components/Heading";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Heading label={"Home Page"} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sendMoney" element={<SendMoney />} />


        

        <Route path="*" element={<Heading label={"404 Not Found"} />} />
      </Routes>
    </Router>
  );
}

export default App;