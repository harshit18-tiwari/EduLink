// Authentication check
document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  const protectedPaths = ['/profile', '/skills', '/help-requests', '/sessions'];
  const authPaths = ['/login', '/register'];
  const currentPath = window.location.pathname;

  if (token && authPaths.includes(currentPath)) {
    window.location.href = '/';
    return;
  }

  if (!token && protectedPaths.includes(currentPath)) {
    window.location.href = '/login';
  }

  // Initialize tooltips
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.map((tooltipTriggerEl) => {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
});

// API utilities
export const apiRequest = async (endpoint, method = 'GET', body = null) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  
  const token = localStorage.getItem('token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`/api${endpoint}`, config);
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};
