import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from './Header';
import UserPage from './UserPage';
import Start from './Start';
import NewBuild from './NewBuild';
import EditBuild from './EditBuild';
import AddEquipment from './AddEquipment';
import ViewBuild from './ViewBuild';
import { hydrateUserInfo } from './reducers/actions';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(hydrateUserInfo(token, navigate));
    }
  }, []);

  return (
    <MainDiv>
      <Background />
      <Header />
      <Content>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="user" element={<UserPage />} />
          <Route path="builds/:buildId" element={<ViewBuild />} />
          <Route path="builds/create" element={<NewBuild />} />
          <Route path="builds/edit" element={<EditBuild />} />
          <Route path="builds/edit/add-equipment" element={<AddEquipment />} />
        </Routes>
      </Content>
    </MainDiv>
  );
};

export default App;

const Background = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url('https://i.ytimg.com/vi/MmP6Ia1GN8c/maxresdefault.jpg');
  position: fixed;
`;

const MainDiv = styled.div`
  height: 100vh;
  width: 100%;
  display: grid;
  font-family: 'Raleway', sans-serif;
  background-size: cover;
`;

const Content = styled.div`
  background-color: #f3f0ec;
  z-index: 2;
  border-radius: 5px;
  margin: 164px auto 0 auto;
  width: 80%;
  padding: 1rem;
`;
