import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import { ProjectsContextProvider } from './context/ProjectContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ProjectsContextProvider>
    <App />
    </ProjectsContextProvider>
  </Provider>
);
