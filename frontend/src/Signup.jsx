import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signup } from './reducers/actions';

const Signup = () => {
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const loginError = useSelector((state) => state.user.loginError);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [validationError, setValidationError] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (loggedIn === true) {
  //     navigate('/');
  //   }
  // }, [loggedIn]);

  const handleInputChange = (e) => {
    if (e.target.id === 'username') {
      setUsername(e.target.value);
    } else if (e.target.id === 'name') {
      setFullName(e.target.value);
    } else if (e.target.id === 'confirm-password') {
      setConfirmPassword(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError([]);
    if (username && password && fullName) {
      setUsername('');
      setPassword('');
      setFullName('');
      // dispatch signup request here
      dispatch(signup({ name: fullName, username, password }, navigate));
    } else {
      if (!username) {
        setValidationError((s) => [...s, 'username']);
      }
      if (!password) {
        setValidationError((s) => [...s, 'password']);
      }
      if (!fullName) {
        setValidationError((s) => [...s, 'name']);
      }
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Background>
      <BackButton onClick={goBack}>{'<  Back'}</BackButton>
      <HomeButton onClick={() => navigate('/')}>Home</HomeButton>
      <LoginBackground>
        <LoginForm onSubmit={handleSubmit}>
          <h3 className="login-tag">Create an Account</h3>
          <Label htmlFor="name">Your Name</Label>
          <Input
            type="text"
            id="name"
            value={fullName}
            onChange={handleInputChange}
          />
          {validationError.includes('name') ? (
            <ValError>Name field is required</ValError>
          ) : null}
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            id="username"
            value={username}
            onChange={handleInputChange}
          />
          {validationError.includes('username') ? (
            <ValError>Username is required</ValError>
          ) : null}
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={handleInputChange}
          />
          {validationError.includes('password') ? (
            <ValError>Password is required</ValError>
          ) : null}
          <LoginButton type="submit">Sign Up</LoginButton>
          <p>
            Already have an account?{' '}
            <LinkButton
              onClick={() => {
                navigate('/login');
              }}
            >
              Log In
            </LinkButton>
          </p>
        </LoginForm>
      </LoginBackground>
    </Background>
  );
};

export default Signup;

const Background = styled.div`
  background-color: var(--theme);
  position: absolute;
  font-family: 'Raleway', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const LinkButton = styled.button`
  all: unset;
  cursor: pointer;
  text-decoration: underline;
  &:hover {
    color: purple;
  }
`;

const HomeButton = styled.button`
  position: absolute;
  font-family: 'Raleway', sans-serif;
  background-color: transparent;
  border: 2px solid black;
  border-radius: 4px;
  cursor: pointer;
  font-size: 20px;
  left: 100px;
  top: 10px;
`;

const BackButton = styled.button`
  position: absolute;
  font-family: 'Raleway', sans-serif;
  background-color: transparent;
  border: 2px solid black;
  border-radius: 4px;
  cursor: pointer;
  font-size: 20px;
  left: 10px;
  top: 10px;
`;

const LoginButton = styled.button`
  margin-top: 40px;
  width: 80px;
  height: 35px;
  background-color: rgba(38, 202, 125, 0.692);
  border: none;
  border-radius: 5px;
  font-family: 'Raleway', sans-serif;
  cursor: pointer;
`;

const LoginBackground = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  border-radius: 10px;
  width: 400px;
  background-color: whitesmoke;
`;

const LoginForm = styled.form`
  margin: 25px 0;
  width: 75%;
`;

const Label = styled.label`
  display: block;
  margin-top: 40px;
`;

const ValError = styled.label`
  color: #ac0909;
  display: block;
`;

const Input = styled.input`
  display: block;
  height: 25px;
  width: 100%;
  margin-top: 10px;
`;
