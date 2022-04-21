import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';
import UserPage from './UserPage';
import Create from './Create';
import Start from './Start';

const App = () => (
  <RootDiv>
    <Header />
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="create" element={<Create />} />
      <Route path="user" element={<UserPage />} />
    </Routes>
  </RootDiv>
);

export default App;

const RootDiv = styled.div`
  height: 200vh;
  width: 100%;
  background-image: url('https://i.ytimg.com/vi/MmP6Ia1GN8c/maxresdefault.jpg');
  display: grid;
  font-family: 'Raleway', sans-serif;
  background-size: cover;
`;
