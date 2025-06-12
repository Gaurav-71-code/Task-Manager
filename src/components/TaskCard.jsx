import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { deleteTask, completeTask } from '../redux/taskSlice';
import { useNavigate } from 'react-router-dom';

const TaskCard = ({ task }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'secondary';
    }
  };

  const handleComplete = () => {
    dispatch(completeTask(task.id));
  };

  return (
    <Card className="mb-3 task-card">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title className="mb-0">{task.title}</Card.Title>
          <Badge bg={getPriorityColor(task.priority)} className="ms-2">
            {task.priority}
          </Badge>
        </div>
        
        <Card.Text className="text-muted mb-2">{task.description}</Card.Text>
        
        <div className="d-flex align-items-center mb-2">
          <i className="bi bi-clock me-2"></i>
          <small className="text-muted">{task.timeRemaining}</small>
          {task.isRecurring && (
            <Badge bg="info" className="ms-2">
              {task.recurringInterval}
            </Badge>
          )}
        </div>

        <div className="d-flex gap-2 mt-3 flex-wrap">
          {task.status !== 'Completed' && (
            <Button 
              variant="success" 
              size="sm" 
              onClick={handleComplete}
              className="flex-grow-0"
            >
              {task.isRecurring ? 'Complete & Reschedule' : 'Complete'}
            </Button>
          )}
          <Button 
            variant="primary" 
            size="sm" 
            onClick={() => navigate(`/edit/${task.id}`)}
            className="flex-grow-0"
          >
            Edit
          </Button>
          {!task.isRecurring && (
            <Button 
              variant="danger" 
              size="sm" 
              onClick={() => dispatch(deleteTask(task.id))}
              className="flex-grow-0"
            >
              Delete
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default TaskCard; 