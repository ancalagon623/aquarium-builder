import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { createBuild } from './reducers/actions';

const NewBuild = () => {
  const currentBuild = useSelector((state) => state.builds.currentBuild);
  const currentUser = useSelector((state) => state.user);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [validationError, setValidationError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      dispatch(createBuild({ name, description }, navigate));
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
      <Header>
        <Title>Build a New Aquarium</Title>
      </Header>
      <div>
        <BuildForm onSubmit={submitHandler}>
          <label htmlFor="build-name">Setup Name</label>
          <NameInput
            type="text"
            id="build-name"
            name="build-name"
            placeholder="A name for your new setup."
            value={name}
            onChange={handleInputChange}
          />
          {validationError ? <ValError>{validationError}</ValError> : null}
          <label htmlFor="build-description">Setup Description</label>
          <DescInput
            id="build-description"
            name="build-description"
            rows="12"
            cols="50"
            placeholder="Boast about it here (or describe it, if you're boring)"
            value={description}
            onChange={handleInputChange}
          />
          <SubmitButton type="submit">Add Equipment</SubmitButton>
        </BuildForm>
      </div>
    </Container>
  );
};

export default NewBuild;

const ValError = styled.label`
  color: #ac0909;
  display: block;
`;

const Header = styled.div`
  display: grid;
  background-image: linear-gradient(rgba(0, 0, 0, 0.1), var(--theme));
  border-bottom-left-radius: 20px;
  grid-template-columns: 1fr 10%;
`;

const Title = styled.h2`
  padding-left: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-image:
  height: 100%;
`;

const NameInput = styled.input`
  display: block;
  margin-bottom: 20px;
`;

const BuildForm = styled.form`
  margin: 5% 30%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: left;
  border: 10px solid var(--theme);
  border-radius: 5px;
  padding: 2rem;
`;

const DescInput = styled.textarea`
  display: block;
  resize: vertical;
`;

const SubmitButton = styled.button`
  margin-top: 30px;
  width: fit-content;
`;
