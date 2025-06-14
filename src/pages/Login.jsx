import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/taskSlice';
import { saveUserSession, clearUserSession } from '../utils/localStorageHelpers';
import { Container, Card, Button, Alert, Form } from 'react-bootstrap';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const message = location.state?.message;
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (message) {
      console.log('Message received:', message);
    }
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.username && credentials.password) {
      setIsLoading(true);
      clearUserSession();
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('tasks_')) {
          localStorage.removeItem(key);
        }
      });
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      const user = { id: Date.now(), name: credentials.username };
      dispatch(setUser(user));
      saveUserSession(user);
      navigate('/dashboard');
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center login-container" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <Card className="p-4 shadow" style={{ 
        maxWidth: '400px', 
        width: '100%', 
        border: 'none', 
        borderRadius: '25px',
        overflow: 'hidden'
      }}>
        <Card.Body>
          <div className="text-center mb-4">
            <div className="logo-container mb-3">
              <img 
                src="/task-management-svgrepo-com.svg" 
                alt="G-ToDo Logo" 
                style={{ 
                  width: '80px', 
                  height: '80px',
                  filter: 'invert(67%) sepia(31%) saturate(638%) hue-rotate(89deg) brightness(89%) contrast(87%)'
                }}
              />
            </div>
            <h2 className="h3 mb-4" style={{ color: '#8cc751' }}>Welcome to G-ToDo</h2>
          </div>
          {message && <Alert variant="warning" className="mb-3" style={{ borderRadius: '15px' }}>{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#495057', fontWeight: '500' }}>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                required
                className="form-control-lg"
                style={{
                  backgroundColor: '#ffffff',
                  border: '2px solid #e9ecef',
                  borderRadius: '15px',
                  padding: '12px 20px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                  fontSize: '1rem'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#8cc751';
                  e.target.style.boxShadow = '0 0 0 0.2rem rgba(140, 199, 81, 0.25)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e9ecef';
                  e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
                }}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label style={{ color: '#495057', fontWeight: '500' }}>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
                className="form-control-lg"
                style={{
                  backgroundColor: '#ffffff',
                  border: '2px solid #e9ecef',
                  borderRadius: '15px',
                  padding: '12px 20px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                  fontSize: '1rem'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#8cc751';
                  e.target.style.boxShadow = '0 0 0 0.2rem rgba(140, 199, 81, 0.25)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e9ecef';
                  e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
                }}
              />
            </Form.Group>

            <Button 
              variant="success" 
              type="submit" 
              className="w-100 btn-lg"
              disabled={isLoading}
              style={{ 
                backgroundColor: '#8cc751', 
                borderColor: '#8cc751',
                padding: '12px 20px',
                borderRadius: '15px',
                fontWeight: '500',
                boxShadow: '0 2px 4px rgba(140, 199, 81, 0.2)',
                transition: 'all 0.3s ease',
                fontSize: '1.1rem'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#7ab540';
                e.target.style.borderColor = '#7ab540';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#8cc751';
                e.target.style.borderColor = '#8cc751';
              }}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login; 