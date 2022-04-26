import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Header from './Header';
import UserPage from './UserPage';
import Start from './Start';
import NewBuild from './NewBuild';
import EditBuild from './EditBuild';

const App = () => {
  const currentBuild = useSelector((state) => state.currentBuild);
  const currentUser = useSelector((state) => state.user);
  const categories = useSelector((state) => state.categories);

  useEffect(() => {}, []);

  return (
    <MainDiv>
      <Header />
      <Content>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route
            path="create"
            element={<NewBuild user={currentUser} build={currentBuild} />}
          />
          <Route path="user" element={<UserPage user={currentUser} />} />
          <Route
            path="builds/:buildId/edit"
            element={<EditBuild build={currentBuild} categories={categories} />}
          />
        </Routes>
      </Content>
    </MainDiv>
  );
};

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
