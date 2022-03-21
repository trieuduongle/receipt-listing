import { Layout } from 'antd';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import styled from 'styled-components';
import { Header } from './containers';
import { AuthGuard } from './guards';
import { Home, Login, ReceiptsRoutes, UploadReceipt } from './pages';
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
            <Route path="login" element={<Login />} />

            <Route element={<AuthGuard />}>
              <Route
                path="main/*"
                element={
                  <Layout>
                    <Header />
                    <Routes>
                      <Route path="home" element={<Home />} />
                      <Route
                        path="receipts/upload"
                        element={<UploadReceipt />}
                      />
                      <Route path="receipts/*" element={<ReceiptsRoutes />} />
                      <Route path="*" element={<Navigate to="home" />} />
                    </Routes>
                  </Layout>
                }
              />
            </Route>

            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Router>
      </Provider>
    </StyledApp>
  );
}

export default App;
