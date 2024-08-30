import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import styled from 'styled-components';

const OutletContainer = styled.div`
  margin-top: 45px;
`
function App() {
  return (
    <div className="App">
      <Header />
      <OutletContainer>
        <Outlet />
      </OutletContainer>
    </div>
  );
}

export default App;
