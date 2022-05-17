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
          <Label htmlFor="build-name">Setup Name</Label>
          <NameInput
            type="text"
            id="build-name"
            name="build-name"
            placeholder="A name for your new setup."
            value={name}
            onChange={handleInputChange}
          />
          {validationError ? <ValError>{validationError}</ValError> : null}
          <Label htmlFor="build-description">Setup Description</Label>
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
  color: #8a0808;
  font-weight: 700;
  display: block;
`;

const Header = styled.div`
  display: grid;
  background-image: linear-gradient(rgba(0, 0, 0, 0.1), var(--theme));
  border-bottom-left-radius: 20px;
  grid-template-columns: 1fr 10%;
`;

const Title = styled.h2`
  font-size: 2.3rem;
  padding-left: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-image: url('/background_1.jpg'),
    url('https://pbs.twimg.com/media/EbqJVp3XYAEbuaZ.jpg:large'),
    url('/background_3.jpg');
  background-color: var(--theme);
  background-position: top 500px left 0px, top 200px left 0px,
    top -200px left 0px;
  background-size: 100%, 100%, cover;
  background-clip: border-box, border-box, padding-box;
  background-repeat: no-repeat;
  height: 100%;
`;

const Label = styled.label`
  font-weight: 700;
  margin-top: 20px;
`;

const NameInput = styled.input`
  display: block;
`;

const BuildForm = styled.form`
  margin: 5% 30%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: left;
  background-color: #f5f5f589;
  border: 10px solid var(--theme);
  border-radius: 5px;
  padding: 2rem;
`;

const DescInput = styled.textarea`
  display: block;
  resize: vertical;
`;

const SubmitButton = styled.button`
  all: unset;
  margin-top: 20px;
  font-weight: 700;
  background-color: #1764c9ce;
  cursor: pointer;
  padding: 5px 10px;
  font-size: 0.8rem;
  border-radius: 1rem;
  height: fit-content;
  width: fit-content;
  justify-self: center;
  box-shadow: 0 3px 0 #706f6f;
  transition: background-color 250ms ease-in-out;
  &:hover {
    background-color: #09a8f1d2;
  }
  &:active {
    box-shadow: none;
    transform: translateY(5px);
  }
`;
