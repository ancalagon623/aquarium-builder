import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { createBuild } from './reducers/actions';

const NewBuild = () => {
  const currentBuild = useSelector((state) => state.currentBuild);
  const currentUser = useSelector((state) => state.user);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [validationError, setValidationError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentBuild.user_id === currentUser.user_id) {
      navigate(`/builds/${currentBuild.id}/edit`);
    }
  }, [currentBuild]);

  const submitHandler = (e) => {
    e.preventDefault();
    setValidationError('');
    if (!name) {
      setValidationError('A name for your setup is required');
    }
    if (name.length > 50) {
      setValidationError('Name must be less than 50 characters');
    }
    if (name && name.length <= 50) {
      dispatch(createBuild({ name, description }));
    }
  };

  const handleInputChange = (e) => {
    if (e.target.id === 'build-name') {
      setName(e.target.value);
    } else {
      setDescription(e.target.value);
    }
  };

  return (
    <Container>
      <Title>Name and Description</Title>
      <BuildForm onSubmit={submitHandler}>
        <NameInput
          type="text"
          id="build-name"
          placeholder="A name for your new setup."
          value={name}
          onChange={handleInputChange}
        />
        {validationError ? <ValError>{validationError}</ValError> : null}
        <DescInput
          id="build-description"
          rows="12"
          cols="50"
          placeholder="Boast about it here (or describe it, if you're boring)"
          value={description}
          onChange={handleInputChange}
        />
        <SubmitButton type="submit">Add Equipment</SubmitButton>
      </BuildForm>
    </Container>
  );
};

export default NewBuild;

const ValError = styled.label`
  color: #ac0909;
  display: block;
`;

const Title = styled.h4`
  text-align: center;
  margin: 30px 0 40px 0;
`;

const Container = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
`;

const NameInput = styled.input`
  display: block;
  margin: 40px 0 0 0;
`;

const BuildForm = styled.form`
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
`;

const DescInput = styled.textarea`
  display: block;
  margin-top: 50px;
`;

const SubmitButton = styled.button`
  margin-top: 50px;
`;
