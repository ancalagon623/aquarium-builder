import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { FaPlus, FaTrash } from 'react-icons/fa';
import {
  getCategories,
  getBuild,
  updateBuildInfo,
  deleteEquipmentFromBuild,
} from './reducers/actions';
import { fillerImg } from './UserPage';

// eslint-disable-next-line react/prop-types
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
    if (!storedBuild) {
      navigate('/builds/create');
    }
  }, []);

  const goToEquipmentInCategory = (categoryName) => {
    dispatch({ type: 'SET_CURRENT_CATEGORY', payload: categoryName });
    navigate('/builds/edit/add-equipment');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.id === 'name') {
      if (!name)
        return setEditMode((state) => state.filter((mode) => !mode === 'name'));
      dispatch(
        updateBuildInfo(build.bld_id, { name }, () => {
          setEditMode((state) => state.filter((mode) => !mode === 'name'));
          setName('');
        })
      );
    } else {
      if (!description)
        return setEditMode((state) => state.filter((mode) => !mode === 'name'));
      dispatch(
        updateBuildInfo(build.bld_id, { description }, () => {
          setEditMode((state) =>
            state.filter((mode) => !mode === 'description')
          );
          setDescription('');
        })
      );
    }
  };

  const removeHandler = (equipmentId, buildId) => {
    dispatch(deleteEquipmentFromBuild(equipmentId, buildId));
  };

  const goToItem = (link) => {
    window.open(link, '_blank');
  };

  return (
    <div>
      <BuildProfileGrid>
        <ProfileImageWrapper>
          <ProfileImage src={build.img_url || fillerImg} alt={build.name} />
        </ProfileImageWrapper>
        <Inset>
          <BuildTitle id="name" onSubmit={handleSubmit}>
            <label htmlFor="name">Build Name</label>
            {!editMode.includes('name') ? (
              <>
                <span>{build.name}</span>
                <button
                  type="button"
                  onClick={() => setEditMode((state) => [...state, 'name'])}
                >
                  Change
                </button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  placeholder="Name"
                />
                <button type="submit">Save</button>
              </>
            )}
          </BuildTitle>
          <Description id="description" onSubmit={handleSubmit}>
            <label htmlFor="description">Description</label>
            {!editMode.includes('description') ? (
              <>
                <span>{build.description}</span>
                <button
                  type="button"
                  onClick={() =>
                    setEditMode((state) => [...state, 'description'])
                  }
                >
                  Change
                </button>
              </>
            ) : (
              <>
                <textarea
                  type="text"
                  name="description"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  placeholder="Description"
                />
                <button type="submit">Save</button>
              </>
            )}
          </Description>
          <TotalPrice>Total: ${build.price / 100 || 0}</TotalPrice>
        </Inset>
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
                        <Price>
                          {(eq.price / 100).toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                          })}
                        </Price>
                        <VisitStore
                          onClick={() => {
                            goToItem(eq.link);
                          }}
                        >
                          View Item
                        </VisitStore>
                        <AddEqButton
                          onClick={() => {
                            removeHandler(eq.eq_id, build.bld_id);
                          }}
                        >
                          <StyledDelete />
                        </AddEqButton>
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

const StyledDelete = styled(FaTrash)`
  color: #a5051b;
`;

const BuildProfileGrid = styled.h3`
  padding: 1.5rem;
  border-radius: 5px;
  border-bottom-left-radius: 50px;
  margin: 0;
  background-color: var(--theme);
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 1.5rem;
`;

const ProfileImageWrapper = styled.div`
  flex-grow: 1;
  text-align: center;
`;

const Inset = styled.div`
  justify-self: center;
  flex-grow: 2;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  background-color: whitesmoke;
  box-shadow: 0 0 8px 2px grey inset;
  border-radius: 5px;
  padding: 1rem;
`;

const ProfileImage = styled.img``;

const BuildTitle = styled.form`
  font-size: 1rem;
`;

const Description = styled.form`
  font-size: 1rem;
`;

const List = styled.ul`
  list-style: none;
  padding: 0 5%;
`;
// #
const TotalPrice = styled.div``;

const CategoryName = styled.h3`
  background-color: var(--theme);
  display: grid;
  grid-template-columns: 1fr 4fr 10%;
  padding: 0.5rem 0 0.5rem 10px;
  border: 4px solid #888ca1;
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
  padding: 5px;
  &:active {
    transform: scale(0.9);
  }
`;

const EquipmentDropdown = styled.div``;

const EquipmentItem = styled.div`
  display: grid;
  grid-template-columns: 10% 1fr 1fr 1fr 10%;
  text-align: center;
  align-items: center;
`;

const ImageWrapper = styled.span`
  border: 2px solid rgba(0, 0, 0, 0.5);
  border-radius: 3px;
  margin-bottom: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const Price = styled.span`
  height: fit-content;
`;

const VisitStore = styled.button`
  all: unset;
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
