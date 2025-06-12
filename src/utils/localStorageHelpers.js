// Save tasks to localStorage
export const saveTasksToStorage = (tasks, userId) => {
  const key = `tasks_${userId}`;
  localStorage.setItem(key, JSON.stringify(tasks));
};

// Load tasks from localStorage
export const loadTasksFromStorage = (userId) => {
  const key = `tasks_${userId}`;
  const tasks = localStorage.getItem(key);
  return tasks ? JSON.parse(tasks) : [];
};

// Save user session
export const saveUserSession = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

// Clear user session
export const clearUserSession = () => {
  localStorage.removeItem('user');
};

// Get user session
export const getUserSession = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}; 