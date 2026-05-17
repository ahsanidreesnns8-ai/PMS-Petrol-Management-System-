/**
 * Simple global app state (notifications, sidebar)
 * Auth is handled by Context API
 */
let listeners = [];
let state = { sidebarOpen: true, notification: null };

export const appStore = {
  getState: () => state,
  subscribe: (fn) => {
    listeners.push(fn);
    return () => {
      listeners = listeners.filter((l) => l !== fn);
    };
  },
  setSidebarOpen: (open) => {
    state = { ...state, sidebarOpen: open };
    listeners.forEach((fn) => fn(state));
  },
  setNotification: (notification) => {
    state = { ...state, notification };
    listeners.forEach((fn) => fn(state));
  },
  clearNotification: () => {
    state = { ...state, notification: null };
    listeners.forEach((fn) => fn(state));
  },
};
