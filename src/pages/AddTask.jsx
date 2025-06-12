import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../redux/taskSlice';
import { saveTasksToStorage } from '../utils/localStorageHelpers';

const AddTask = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.tasks.user);
  const tasks = useSelector((state) => state.tasks.tasks);
  
  const [task, setTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'To Do',
    dueDate: '',
    isRecurring: false,
    recurringInterval: 'daily',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    const newTask = {
      ...task,
      id: Date.now().toString(),
      dueDate: new Date(task.dueDate).toISOString(),
      userId: user.id,
    };
    
    dispatch(addTask(newTask));
    saveTasksToStorage([...tasks, newTask], user.id);
    navigate('/dashboard');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <Container className="py-4">
      <Card className="p-4">
        <h2 className="mb-4">Add New Task</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              required
              placeholder="Enter task title"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={task.description}
              onChange={handleChange}
              rows={3}
              placeholder="Enter task description"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Priority</Form.Label>
            <Form.Select
              name="priority"
              value={task.priority}
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="datetime-local"
              name="dueDate"
              value={task.dueDate}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              name="isRecurring"
              label="Recurring Task"
              checked={task.isRecurring}
              onChange={handleChange}
            />
          </Form.Group>

          {task.isRecurring && (
            <Form.Group className="mb-3">
              <Form.Label>Recurring Interval</Form.Label>
              <Form.Select
                name="recurringInterval"
                value={task.recurringInterval}
                onChange={handleChange}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </Form.Select>
            </Form.Group>
          )}

          <div className="d-flex gap-2">
            <Button variant="primary" type="submit">
              Add Task
            </Button>
            <Button variant="secondary" onClick={() => navigate('/dashboard')}>
              Cancel
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default AddTask; 