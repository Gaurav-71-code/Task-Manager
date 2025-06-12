import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/taskSlice';
import { saveUserSession } from '../utils/localStorageHelpers';
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const user = { id: 1, name: credentials.username };
      dispatch(setUser(user));
      saveUserSession(user);
      navigate('/dashboard');
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center login-container" style={{ minHeight: '100vh' }}>
      <Card className="p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <Card.Body>
          <div className="text-center mb-4">
            <div className="logo-container mb-3">
              <div className="logo-circle">
                <span className="logo-check">✓</span>
              </div>
            </div>
            <h2 className="h3 mb-4">Welcome Back</h2>
          </div>
          {message && <Alert variant="warning" className="mb-3">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                required
                className="form-control-lg"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
                className="form-control-lg"
              />
            </Form.Group>

            <Button 
              variant="primary" 
              type="submit" 
              className="w-100 btn-lg"
              disabled={isLoading}
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