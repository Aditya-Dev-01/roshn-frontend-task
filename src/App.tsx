import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { UserList } from './pages/UserList/UserList';
import { UserDetails } from './pages/UserDetails/UserDetails';
import { Container } from "@radix-ui/themes";

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-slate-50">
        <Container size="3" className="py-8">
          <Router>
            <Routes>
              <Route path="/" element={<UserList />} />
              <Route path="/user/:id" element={<UserDetails />} />
            </Routes>
          </Router>
        </Container>
      </div>
    </Provider>
  );
}

export default App;
