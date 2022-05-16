import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const Header = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logOutHandler = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <HeaderContainer>
      <TopHeader>
        <Title>Aquarium Builder</Title>
        <UserControls>
          <div>
            {!user.loggedIn ? (
              <Link className="user-link" to="/login">
                Log In
              </Link>
            ) : (
              <Link className="user-link" to="/user">
                Hello, {user.username}!
              </Link>
            )}
            {' | '}
            {!user.loggedIn ? (
              <Link className="user-link" to="/signup">
                Sign Up
              </Link>
            ) : (
              <Link
                className="user-link"
                onClick={() => logOutHandler()}
                to="/"
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

          <Link className="nav-link" to="builds/create">
            <NavItem>Build an Aquarium</NavItem>
          </Link>

          {user.loggedIn ? (
            <Link className="nav-link" to="/user">
              <NavItem>My Aquariums</NavItem>
            </Link>
          ) : null}
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
  height: 80px;
  z-index: 900;
  background-color: var(--theme);
`;

const TopHeader = styled.div`
  display: grid;
  grid-template-columns: 5fr 1fr;
  text-align: left;
  align-content: center;
`;

const Title = styled.h1`
  text-align: left;
  display: inline-block;
  height: 80px;
  margin: 10px 0 0 1.7rem;
`;

const UserControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: wheat;
  height: 80px;
`;

const Navigator = styled.nav`
  position: fixed;
  border-style: solid;
  border-radius: 3px;
  border-color: wheat;
  top: 80px;
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
