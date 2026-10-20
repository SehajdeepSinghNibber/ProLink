import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import IsLoading from "./components/IsLoading";
import { Toaster } from "react-hot-toast";
import { userDataContext } from "./context/UserContext";
import { useContext } from "react";

const App = () => {
  const { userData, isLoading } = useContext(userDataContext);

  if (isLoading) {
    return <IsLoading />;
  }

  return (
    <div>
      <Toaster position="top-center" />

      <Routes>
        <Route
          path="/"
          element={
            userData ? <HomePage /> : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/signup"
          element={
            userData ? <Navigate to="/" replace /> : <SignUp />
          }
        />

        <Route
          path="/login"
          element={
            userData ? <Navigate to="/" replace /> : <LogIn />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
