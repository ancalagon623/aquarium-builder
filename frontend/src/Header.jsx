import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logOutHandler = () => {
    // logout here
    console.log('click');
  };

  return (
    <HeaderContainer>
      <TopHeader>
        <Title>Aquarium Builder</Title>
        <UserControls>
          <div>
            {!loggedIn ? (
              <Link className="user-link" to="/login">
                Log In
              </Link>
            ) : (
              <Link className="user-link" to="/user">
                Username
              </Link>
            )}
            {' | '}
            {!loggedIn ? (
              <Link className="user-link" to="/signup">
                Sign Up
              </Link>
            ) : (
              <Link
                className="user-link"
                onClick={() => logOutHandler()}
                to="/start"
              >
                Log out
              </Link>
            )}
          </div>
        </UserControls>
      </TopHeader>

      <Navigator>
        <NavList>
          <Link className="nav-link" to="/">
            <NavItem>Home</NavItem>
          </Link>

          <Link className="nav-link" to="/create">
            <NavItem>Build an Aquarium</NavItem>
          </Link>

          <Link className="nav-link" to="/browse">
            <NavItem>Browse All Aquariums</NavItem>
          </Link>
        </NavList>
      </Navigator>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  font-family: 'Shadows Into Light', cursive;
  font-size: 1.2rem;
  width: 100%;
  margin-right: 50px;
  position: fixed;
  height: 95px;
  z-index: 900;
  background-color: var(--theme);
`;

const TopHeader = styled.div`
  display: grid;
  grid-template-columns: 5fr 1fr;
  text-align: left;
`;

const Title = styled.h1`
  text-align: left;
  display: inline-block;
  margin-left: 1.7rem;
`;

const UserControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: wheat;
`;

const Navigator = styled.nav`
  position: fixed;
  border-style: solid;
  border-radius: 3px;
  border-color: wheat;
  top: 95px;
  width: 100%;
  background-color: var(--theme);
`;

const NavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  display: inline-block;
  padding: 1.2rem;
  margin: 0.3em;
  border: 3px solid transparent;
  &:hover {
    background-color: #00000084;
    border-radius: 8px;
  }
`;
