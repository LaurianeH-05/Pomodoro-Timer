// // App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignUpPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<LoginPage />} />      </Routes>
    </Router>
  );
}

export default App;


// function TestComponent() {
//   return <h1>Hello World!</h1>;
// }

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<TestComponent />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
