import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';
import UserPage from './UserPage';
import Create from './Create';
import Start from './Start';

const App = () => (
  <MainDiv>
    <Header />
    <Content>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="create" element={<Create />} />
        <Route path="user" element={<UserPage />} />
      </Routes>
    </Content>
  </MainDiv>
);

export default App;

const MainDiv = styled.div`
  height: 100vh;
  width: 100%;
  background-image: url('https://i.ytimg.com/vi/MmP6Ia1GN8c/maxresdefault.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  display: grid;
  font-family: 'Raleway', sans-serif;
  background-size: cover;
`;

const Content = styled.div`
  background-color: #f3f0ec;
  margin-top: 179px;
  margin-left: 10vw;
  margin-right: 10vw;
`;
