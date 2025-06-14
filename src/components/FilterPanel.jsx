import { Form, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../redux/taskSlice';

const FilterPanel = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.tasks.filters);

  const handlePriorityChange = (priority) => {
    const newPriorities = filters.priority.includes(priority)
      ? filters.priority.filter(p => p !== priority)
      : [...filters.priority, priority];
    
    dispatch(setFilters({ priority: newPriorities }));
  };

  const handleStatusChange = (status) => {
    const newStatuses = filters.status.includes(status)
      ? filters.status.filter(s => s !== status)
      : [...filters.status, status];
    
    dispatch(setFilters({ status: newStatuses }));
  };

  const handleSearch = (e) => {
    dispatch(setFilters({ searchQuery: e.target.value }));
  };

  return (
    <div className="filter-panel p-3 bg-white rounded shadow-sm mb-4">
      <h5 className="mb-3">Filters</h5>
      
      <div className="mb-3">
        <h6>Priority</h6>
        {['high', 'medium', 'low'].map((priority) => (
          <Form.Check
            key={priority}
            type="checkbox"
            label={priority.charAt(0).toUpperCase() + priority.slice(1)}
            checked={filters.priority.includes(priority)}
            onChange={() => handlePriorityChange(priority)}
            className="mb-2"
          />
        ))}
      </div>

      <div className="mb-3">
        <h6>Status</h6>
        {['To Do', 'In Progress', 'Completed'].map((status) => (
          <Form.Check
            key={status}
            type="checkbox"
            label={status}
            checked={filters.status.includes(status)}
            onChange={() => handleStatusChange(status)}
            className="mb-2"
          />
        ))}
      </div>

      <div>
        <h6>Search</h6>
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Search tasks..."
            value={filters.searchQuery}
            onChange={handleSearch}
          />
        </InputGroup>
      </div>
    </div>
  );
};

export default FilterPanel; 