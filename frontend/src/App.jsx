import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Header from './Header';
import UserPage, { fillerImg } from './UserPage';
import Start from './Start';
import NewBuild from './NewBuild';
import EditBuild from './EditBuild';
import AddEquipment from './AddEquipment';
import ViewBuild from './ViewBuild';
import { hydrateUserInfo } from './reducers/actions';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [buildToView, setBuildToView] = useState({
    bld_id: 356,
    bld_name: 'No Build Selected',
    price: 0,
    img_url: fillerImg,
    equipment: {
      normalized: {},
      list: [],
    },
  });
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
          <Route path="/" element={<Start setBuildToView={setBuildToView} />} />
          <Route path="user" element={<UserPage />} />
          <Route
            path="builds/view"
            element={<ViewBuild build={buildToView} />}
          />
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
  background-repeat: no-repeat;
  background-size: cover;
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
