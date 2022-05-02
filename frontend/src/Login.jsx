import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from './reducers/actions';

const Login = () => {
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const loginError = useSelector((state) => state.user.loginError);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (loggedIn === true) {
      navigate('/');
    }
  }, [loggedIn]);

  const handleInputChange = (e) => {
    if (e.target.id === 'username') {
      setUsername(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError([]);
    dispatch({ type: 'LOGIN_REQUESTED' });
    if (username && password) {
      setUsername('');
      setPassword('');
      // dispatch login request here
      dispatch(login({ username, password }));
    } else {
      if (!username) {
        setValidationError((s) => [...s, 'username']);
      }
      if (!password) {
        setValidationError((s) => [...s, 'password']);
      }
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Background>
      <BackButton onClick={goBack}>{'<  Back'}</BackButton>
      <LoginBackground>
        <LoginForm onSubmit={handleSubmit}>
          <h3 className="login-tag">Login to Your Account</h3>
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
            type="text"
            id="password"
            value={password}
            onChange={handleInputChange}
          />
          {validationError.includes('password') ? (
            <ValError>Password is required</ValError>
          ) : null}
          <LoginButton type="submit">Log In</LoginButton>
          {loginError.message === 'Unauthorized' ? (
            <ValError>Invalid username or password</ValError>
          ) : null}
        </LoginForm>
      </LoginBackground>
    </Background>
  );
};

export default Login;

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
  height: 500px;
  background-color: whitesmoke;
`;

const LoginForm = styled.form`
  margin: auto 0;
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
