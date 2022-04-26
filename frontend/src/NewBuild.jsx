import { useState } from 'react';
import styled from 'styled-components';

const NewBuild = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('submit');
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
  margin: 40px 0 50px 0;
`;

const BuildForm = styled.form`
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
`;

const DescInput = styled.textarea`
  display: block;
`;

const SubmitButton = styled.button`
  margin-top: 50px;
`;
