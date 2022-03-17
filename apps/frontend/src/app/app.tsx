import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import styled from 'styled-components';
import { Home, ReceiptsRoutes, UploadReceipt } from './pages';
import { store } from './store/store';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <StyledApp>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="home" element={<Home />} />
            <Route path="receipts/upload" element={<UploadReceipt />} />
            <Route path="receipts/*" element={<ReceiptsRoutes />} />

            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </Router>
      </Provider>
    </StyledApp>
  );
}

export default App;
