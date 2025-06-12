import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  user: null,
  filters: {
    priority: [],
    status: [],
    searchQuery: '',
  },
};

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addTask: (state, action) => {
      const task = {
        ...action.payload,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        isRecurring: action.payload.isRecurring || false,
        recurringInterval: action.payload.recurringInterval || null,
        dueDate: action.payload.dueDate,
        nextDueDate: action.payload.dueDate,
        timeRemaining: calculateTimeRemaining(action.payload.dueDate),
        userId: state.user?.id,
      };
      state.tasks.push(task);
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        const updatedTask = {
          ...state.tasks[index],
          ...action.payload,
          timeRemaining: calculateTimeRemaining(action.payload.dueDate),
        };
        state.tasks[index] = updatedTask;
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.tasks = [];
    },
    updateTimeRemaining: (state) => {
      state.tasks = state.tasks.map(task => ({
        ...task,
        timeRemaining: calculateTimeRemaining(task.dueDate),
      }));
    },
    handleRecurringTask: (state, action) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task && task.isRecurring) {
        const nextDueDate = calculateNextDueDate(task.dueDate, task.recurringInterval);
        task.dueDate = nextDueDate;
        task.nextDueDate = nextDueDate;
        task.timeRemaining = calculateTimeRemaining(nextDueDate);
        task.status = 'To Do';
      }
    },
    completeTask: (state, action) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        if (task.isRecurring) {
          const nextDueDate = calculateNextDueDate(task.dueDate, task.recurringInterval);
          task.dueDate = nextDueDate;
          task.nextDueDate = nextDueDate;
          task.timeRemaining = calculateTimeRemaining(nextDueDate);
          task.status = 'To Do';
        } else {
          task.status = 'Completed';
        }
      }
    },
  },
});

// Helper function to calculate time remaining
function calculateTimeRemaining(dueDate) {
  if (!dueDate) return 'No due date';
  
  const now = new Date();
  const due = new Date(dueDate);
  const diff = due - now;

  if (diff <= 0) return 'Overdue';

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) return `${days}d ${hours}h remaining`;
  if (hours > 0) return `${hours}h ${minutes}m remaining`;
  return `${minutes}m remaining`;
}

// Helper function to calculate next due date for recurring tasks
function calculateNextDueDate(currentDueDate, interval) {
  if (!currentDueDate) return null;
  
  const date = new Date(currentDueDate);
  switch (interval) {
    case 'daily':
      date.setDate(date.getDate() + 1);
      break;
    case 'weekly':
      date.setDate(date.getDate() + 7);
      break;
    case 'monthly':
      date.setMonth(date.getMonth() + 1);
      break;
    default:
      return currentDueDate;
  }
  return date.toISOString();
}

export const { 
  setTasks,
  addTask, 
  updateTask, 
  deleteTask, 
  setFilters, 
  setUser,
  updateTimeRemaining,
  handleRecurringTask,
  completeTask
} = taskSlice.actions;

export default taskSlice.reducer; 