import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./routes/ProtectedRoute";

import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Home from "./components/Home";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div className="w-full min-h-screen bg-base-100">
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

