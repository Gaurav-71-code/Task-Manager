import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddTask from './pages/AddTask';
import EditTask from './pages/EditTask';
import NotFound from './pages/NotFound';
import { getUserSession } from './utils/localStorageHelpers';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const PrivateRoute = ({ children }) => {
  const user = getUserSession();
  if (!user) {
    return <Navigate to="/login" state={{ message: "You must log in first to access this page." }} replace />;
  }
  return children;
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/add" element={<PrivateRoute><AddTask /></PrivateRoute>} />
            <Route path="/edit/:id" element={<PrivateRoute><EditTask /></PrivateRoute>} />
            <Route path="/404" element={<NotFound />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App; 