import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './stores/store';
import RouterConfig from './RouterConfig';
import { loadUserFromStorage } from './stores/slices/authSlice';

function AppContent() {
  useEffect(() => {
    store.dispatch(loadUserFromStorage());
  }, []);

  return <RouterConfig />;
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;