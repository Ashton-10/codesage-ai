import Upload from "./pages/Upload";
import GitHubReview from "./pages/GitHubReview";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import History from "./pages/History";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AIReview from "./pages/AIReview";
import Profile from "./pages/Profile";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
  path="/review"
  element={
    <ProtectedRoute>
      <Layout>
        <AIReview />
      </Layout>
    </ProtectedRoute>
  }
/>
<Route
  path="/upload"
  element={
    <ProtectedRoute>
      <Layout>
        <Upload />
      </Layout>
    </ProtectedRoute>
  }
/>
<Route
  path="/github"
  element={
    <ProtectedRoute>
      <Layout>
        <GitHubReview />
      </Layout>
    </ProtectedRoute>
  }
/>
<Route
  path="/history"
  element={
    <ProtectedRoute>
      <Layout>
        <History />
      </Layout>
    </ProtectedRoute>
  }
/>
<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Layout>
        <Profile />
      </Layout>
    </ProtectedRoute>
  }
/>

        <Route
          path="/"
          element={<Navigate to="/dashboard" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}