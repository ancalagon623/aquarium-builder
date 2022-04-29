import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import axios from 'axios';
import styled from 'styled-components';
import { getBuild } from './reducers/actions';

export const fillerImg =
  'https://image.shutterstock.com/image-vector/aquarium-fish-bubbles-linear-icon-260nw-1588448356.jpg';

const UserPage = () => {
  const [builds, setBuilds] = useState([]);
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

  const editBuild = (id) => {
    localStorage.setItem('currentBuild', id);
    dispatch(getBuild(id, navigate, () => navigate('/builds/edit')));
  };

  useEffect(() => {
    fetchBuilds();
  }, []);

  return (
    <UserContainer>
      <HeaderBackground>
        <Header>
          <h2>Account Details</h2>
          <h4>username: {username}</h4>
          <h4>name: {name}</h4>
        </Header>
      </HeaderBackground>
      <BuildList>
        <ColumnHeader>
          <div />
          <h4>Setup Name</h4>
          <h4>Total Price</h4>
        </ColumnHeader>
        {builds.map((b, i) => (
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
              <EditButton onClick={() => editBuild(b.bld_id)}>Edit</EditButton>
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
  background-color: var(--theme);
  border-bottom-left-radius: 50px;
  padding-top: 2rem;
  padding-bottom: 0.1rem;
`;

const Header = styled.div`
  margin: 0 20% 7rem 20%;
`;

const ColumnHeader = styled.li`
  display: grid;
  text-align: center;
  grid-template-columns: 1fr 4fr 4fr;
  border: 1px solid black;
  border-radius: 5px;
  margin-bottom: 20px;
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
  grid-template-columns: 1fr 4fr 4fr 1fr;
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
`;

const PurchaseButton = styled.button`
  all: unset;
  background-color: #1764c9ce;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  transition: background-color 250ms ease-in-out, transform 150ms ease;
  padding: 1em 2em;
  &:hover {
    background-color: #2e02f189;
  }
  &:focus {
    background-color: #2e02f189;
    outline: 2px solid var(--theme);
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
    background-color: #2e02f189;
  }
  &:focus {
    background-color: #2e02f189;
    outline: 2px solid var(--theme);
    outline-offset: 2px;
  }
  &:active {
    transform: scale(0.9);
  }
`;
