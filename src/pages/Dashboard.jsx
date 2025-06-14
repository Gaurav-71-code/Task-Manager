import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { loadTasksFromStorage } from '../utils/localStorageHelpers';
import { clearUserSession } from '../utils/localStorageHelpers';
import TaskCard from '../components/TaskCard';
import FilterPanel from '../components/FilterPanel';
import { setTasks } from '../redux/taskSlice';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const filters = useSelector((state) => state.tasks.filters);
  const user = useSelector((state) => state.tasks.user);

  useEffect(() => {
    if (user) {
      const savedTasks = loadTasksFromStorage(user.id);
      if (savedTasks.length > 0) {
        dispatch(setTasks(savedTasks));
      }
    }
  }, [dispatch, user]);

  const handleLogout = () => {
    clearUserSession();
    navigate('/login');
  };

  const filterTasks = (tasks) => {
    return tasks.filter(task => {
      const matchesPriority = filters.priority.length === 0 || filters.priority.includes(task.priority);
      const matchesStatus = filters.status.length === 0 || filters.status.includes(task.status);
      const matchesSearch = task.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                          task.description.toLowerCase().includes(filters.searchQuery.toLowerCase());
      
      return matchesPriority && matchesStatus && matchesSearch;
    });
  };

  const filteredTasks = filterTasks(tasks);

  const renderTaskColumn = (status) => {
    const columnTasks = filteredTasks.filter(task => task.status === status);
    
    return (
      <Col md={4} className="task-column">
        <div className="bg-light p-3 rounded h-100">
          <h5 className="mb-3">{status}</h5>
          {columnTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </Col>
    );
  };

  return (
    <Container fluid className="dashboard p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center">
          <img 
            src="/task-management-svgrepo-com.svg" 
            alt="G-ToDo Logo" 
            style={{ 
              width: '40px', 
              height: '40px', 
              marginRight: '10px',
              filter: 'invert(67%) sepia(31%) saturate(638%) hue-rotate(89deg) brightness(89%) contrast(87%)'
            }}
          />
          <h2 className="mb-0" style={{ color: '#8cc751' }}>G-ToDo</h2>
        </div>
        <div>
          <Button 
            variant="success" 
            className="me-2" 
            onClick={() => navigate('/add')}
            style={{ backgroundColor: '#8cc751', borderColor: '#8cc751' }}
          >
            Add Task
          </Button>
          <Button variant="outline-danger" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>

      <Row>
        <Col md={3}>
          <FilterPanel />
        </Col>
        <Col md={9}>
          <Row>
            {renderTaskColumn('To Do')}
            {renderTaskColumn('In Progress')}
            {renderTaskColumn('Completed')}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard; 