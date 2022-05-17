import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import axios from 'axios';
import styled from 'styled-components';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { getBuild } from './reducers/actions';

export const fillerImg =
  'https://image.shutterstock.com/image-vector/aquarium-fish-bubbles-linear-icon-260nw-1588448356.jpg';

const UserPage = () => {
  const [builds, setBuilds] = useState([]);
  const [buildToDelete, setBuildToDelete] = useState(0);
  const { username, name } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchBuilds = async () => {
    const token = localStorage.getItem('token');

    const options = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const { data, status } = await axios.get(
        `${process.env.REACT_APP_BACKEND}/api/me/aquariums`,
        options
      );

      if (status === 200) {
        setBuilds(data);
      }
    } catch (err) {
      if (err.response.status === 401) {
        dispatch({ type: 'LOGIN_REQUIRED', payload: { navigate } });
      }
    }
  };

  const deleteBuild = async (id) => {
    const token = localStorage.getItem('token');

    const options = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const { data, status } = await axios.delete(
        `${process.env.REACT_APP_BACKEND}/api/me/aquariums/${id}`,
        options
      );

      if (status === 200) {
        setBuilds((state) => state.filter((b) => b.bld_id !== data.bld_id));
      }
    } catch (err) {
      if (err.response.status === 401) {
        dispatch({ type: 'LOGIN_REQUIRED', payload: { navigate } });
      }
    }
  };

  const editBuildHandler = (id) => {
    localStorage.setItem('currentBuild', id);
    dispatch(getBuild(id, navigate, () => navigate('/builds/edit')));
  };

  const deleteBuildHandler = (id) => {
    setBuildToDelete(id);
  };

  const confirmDelete = (id) => {
    if (id === parseInt(localStorage.getItem('currentBuild'))) {
      localStorage.removeItem('currentBuild');
      dispatch({ type: 'RESET' });
    }
    deleteBuild(id);
  };

  useEffect(() => {
    fetchBuilds();
  }, []);

  useEffect(() => {
    const closePopUp = (e) => {
      if (
        !e.target.className.split(' ').includes('delete-button') &&
        !e.target.className.split(' ').includes('warning-popup')
      ) {
        setBuildToDelete(0);
      }
    };
    document.body.addEventListener('click', closePopUp);
    return () => {
      document.body.removeEventListener('click', closePopUp);
    };
  }, []);

  return (
    <UserContainer>
      <HeaderBackground>
        <Header>
          <AccountDetailHeader>Account Details</AccountDetailHeader>
          <AccountDetailLineWrapper>
            <AccountDetailLineHeader>Username</AccountDetailLineHeader>
            <AccountDetailValue>{username}</AccountDetailValue>
          </AccountDetailLineWrapper>
          <AccountDetailLineWrapper>
            <AccountDetailLineHeader>Name</AccountDetailLineHeader>
            <AccountDetailValue>{name}</AccountDetailValue>
          </AccountDetailLineWrapper>
        </Header>
      </HeaderBackground>
      <BuildList>
        <ColumnHeader>
          <Spacer />
          <h4>Setup Name</h4>
          <h4>Total Price</h4>
          <Spacer />
          <Spacer />
        </ColumnHeader>
        {builds.map((b) => (
          <BuildItem key={b.bld_id}>
            <ImageWrapper>
              <Image src={b.img_url || fillerImg} alt={b.bld_name} />
            </ImageWrapper>
            <BuildName>{b.bld_name}</BuildName>
            <Price>
              {(b.price / 100).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </Price>
            <ButtonWrapper>
              <EditButton onClick={() => editBuildHandler(b.bld_id)}>
                <FaEdit />
              </EditButton>
            </ButtonWrapper>
            <ButtonWrapper>
              <DeleteButton
                className="delete-button"
                onClick={() => deleteBuildHandler(b.bld_id)}
              >
                <FaTrash />
              </DeleteButton>
              {b.bld_id === buildToDelete ? (
                <DeleteChecker className="warning-popup">
                  <span>Are you sure?</span>
                  <ConfirmDelete onClick={() => confirmDelete(b.bld_id)}>
                    Delete
                  </ConfirmDelete>
                </DeleteChecker>
              ) : null}
            </ButtonWrapper>
          </BuildItem>
        ))}
      </BuildList>
    </UserContainer>
  );
};

export default UserPage;

const UserContainer = styled.div``;

const HeaderBackground = styled.div`
  position: relative;
  height: 250px;
  background-color: var(--theme);
  border-radius: 5px;
  border-bottom-left-radius: 50px;
  padding-top: 2rem;
  padding-bottom: 0.1rem;
`;

const Header = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  border-radius: 5px;
  box-shadow: inset 0 0 8px 0 #09317c;
  font-family: 'Open Sans', sans-serif;
  left: 20%;
  top: 10%;
  bottom: 20%;
  background-color: whitesmoke;
`;

const AccountDetailHeader = styled.h2`
  margin: 0;
  border-bottom: 3px solid #09317c94;
  text-align: center;
`;

const AccountDetailLineHeader = styled.div`
  padding: 5px;
  border: 1px solid #09317c;
  border-radius: 10px;
  box-shadow: 0 0 5px 0 #09317c;
`;

const AccountDetailLineWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
`;

const AccountDetailValue = styled.span`
  padding: 3px;
`;

const ColumnHeader = styled.li`
  display: grid;
  gap: 10px;
  text-align: center;
  grid-template-columns: 1fr 4fr 4fr 1fr 1fr;
  border: 1px solid black;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const Spacer = styled.div`
  width: 100px;
`;

const BuildName = styled.span`
  height: fit-content;
  text-align: center;
  margin: auto;
`;

const BuildList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0 5%;
`;

const BuildItem = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr 4fr 4fr 1fr 1fr;
  border-bottom: 0.5px solid #05177a7e;
  margin-bottom: 10px;
`;

const ImageWrapper = styled.span`
  border: 2px solid rgba(0, 0, 0, 0.5);
  border-radius: 3px;
  margin-bottom: 10px;
  text-align: center;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
`;

const Price = styled.span`
  height: fit-content;
  text-align: right;
  margin: auto;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
`;

const DeleteChecker = styled.div`
  position: absolute;
  top: -2.2rem;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 5px 5px 2px rgba(0, 0, 0, 0.144);
  font-size: 13px;
  background-color: aliceblue;
  display: grid;
  grid-template-rows: 1fr 1fr;
`;

const ConfirmDelete = styled.button`
  all: unset;
  background-color: #f0250a;
  margin-top: 5px;
  border-radius: 3px;
  cursor: pointer;
  text-align: center;
  transition: background-color 250ms ease-in-out, transform 150ms ease;
  &:hover {
    background-color: #f102ddec;
  }
  &:focus {
    background-color: #f102ddec;
  }
  &:active {
    transform: scale(0.9);
  }
`;

const DeleteButton = styled.button`
  all: unset;
  background-color: #a5051b;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  transition: background-color 250ms ease-in-out, transform 150ms ease;
  padding: 1em 2em;
  &:hover {
    background-color: #f10252ed;
  }
  &:focus {
    background-color: #f10252ed;
    outline: 2px solid #640323eb;
    outline-offset: 2px;
  }
  &:active {
    transform: scale(0.9);
  }
`;

const EditButton = styled.button`
  all: unset;
  background-color: #1764c9ce;
  border-radius: 5px;
  font-size: 1rem;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  cursor: pointer;
  text-align: center;
  transition: background-color 250ms ease-in-out, transform 150ms ease;
  padding: 1em 2em;
  &:hover {
    background-color: #09a8f1d2;
  }
  &:focus {
    background-color: #09a8f1d2;
    outline: 2px solid var(--theme);
    outline-offset: 2px;
  }
  &:active {
    transform: scale(0.9);
  }
`;
