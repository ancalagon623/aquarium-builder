import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { FaPlus } from 'react-icons/fa';
import { getCategories, getBuild } from './reducers/actions';
import { fillerImg } from './UserPage';

const EditBuild = () => {
  const build = useSelector((state) => state.builds.currentBuild);
  const { list } = useSelector((state) => state.categories);
  const [editMode, setEditMode] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const storedBuild = localStorage.getItem('currentBuild');
    if (!list.length) {
      dispatch(getCategories());
    }
    if (!build.bld_id && storedBuild) {
      dispatch(getBuild(storedBuild, navigate));
    }
  }, []);

  const goToEquipmentInCategory = (categoryName) => {
    dispatch({ type: 'SET_CURRENT_CATEGORY', payload: categoryName });
    navigate('/builds/edit/add-equipment');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.id === 'name') {
      console.log(e);
    } else {
      console.log(e);
    }
  };

  return (
    <div>
      <BuildProfileGrid>
        <ProfileImageWrapper>
          <ProfileImage src={build.img_url || fillerImg} alt={build.name} />
        </ProfileImageWrapper>
        <BuildTitle>
          {build.name}
          {!editMode.includes('name') ? (
            <button
              type="button"
              onClick={() => setEditMode((state) => [...state, 'name'])}
            >
              Change
            </button>
          ) : (
            <form id="name" onSubmit={handleSubmit}>
              <label>
                New Name{' '}
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  placeholder="Name"
                />
              </label>
              <button type="submit">Save</button>
            </form>
          )}
        </BuildTitle>
        <Description>
          {build.description}
          {!editMode.includes('description') ? (
            <button
              type="button"
              onClick={() => setEditMode((state) => [...state, 'description'])}
            >
              Change
            </button>
          ) : (
            <form id="description" onSubmit={handleSubmit}>
              <label>
                New Description{' '}
                <input
                  type="text"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  placeholder="Description"
                />
              </label>
              <button type="submit">Save</button>
            </form>
          )}
        </Description>
        <TotalPrice>Total: ${build.price / 100 || 0}</TotalPrice>
      </BuildProfileGrid>
      <List>
        {list.map((c, i) => (
          <CategoryItem key={i}>
            <CategoryName>
              <CategoryTitle>{c.type} </CategoryTitle>
              <div />
              <AddEqButton
                type="button"
                onClick={() => {
                  goToEquipmentInCategory(c.type);
                }}
              >
                <FaPlus />
              </AddEqButton>
            </CategoryName>

            <EquipmentDropdown>
              <List>
                {build.equipment.normalized[c.type]
                  ? build.equipment.normalized[c.type].map((eq, index) => (
                      <EquipmentItem key={index}>
                        <ImageWrapper>
                          <Image src={eq.img_url} alt={eq.eq_name} />
                        </ImageWrapper>
                        <EquipmentTitle>{eq.eq_name}</EquipmentTitle>{' '}
                        <Price>{eq.price}</Price>
                      </EquipmentItem>
                    ))
                  : null}
              </List>
            </EquipmentDropdown>
          </CategoryItem>
        ))}
      </List>
    </div>
  );
};

export default EditBuild;

// EditBuild.propTypes = {
//   build: PropTypes.object.isRequired,
//   categories: PropTypes.object.isRequired,
// };

const BuildProfileGrid = styled.h3`
  margin: 1.5rem 5%;
  display: grid;
  grid-template-columns: 2fr 3fr;
  grid-template-rows: 1fr 1fr 1fr;
`;

const ProfileImageWrapper = styled.div`
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 4;
`;

const ProfileImage = styled.img``;

const BuildTitle = styled.div``;

const Description = styled.div``;

const List = styled.ul`
  list-style: none;
  padding: 0 5%;
`;

const TotalPrice = styled.div``;

const CategoryName = styled.h3`
  background-color: #888ca1;
  display: grid;
  grid-template-columns: 1fr 4fr 10%;
  padding: 0.5rem 0 0.5rem 10px;
  border: 4px solid #646ea0;
`;

const CategoryTitle = styled.span`
  font-size: 1rem;
  white-space: nowrap;
  align-self: center;
`;

const EquipmentTitle = styled.span`
  margin-left: 10px;
`;

const CategoryItem = styled.li``;

const AddEqButton = styled.button`
  all: unset;
  justify-self: center;
  width: max-content;
  cursor: pointer;
  text-align: center;
  padding: 1em 2em;
  &:active {
    transform: scale(0.9);
  }
`;

const EquipmentDropdown = styled.div``;

const EquipmentItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 4fr;
  text-align: center;
  align-items: center;
`;

const ImageWrapper = styled.span`
  border: 2px solid rgba(0, 0, 0, 0.5);
  border-radius: 3px;
  margin-bottom: 10px;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
`;

const Price = styled.span`
  height: fit-content;
`;
