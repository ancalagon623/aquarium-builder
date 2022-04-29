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
  }, []);

  const goToEquipmentInCategory = (categoryName) => {
    dispatch({ type: 'SET_CURRENT_CATEGORY', payload: categoryName });
    navigate('/builds/edit/add-equipment');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.id === 'name') {
      dispatch(
        updateBuildInfo(build.bld_id, { name }, () => {
          setEditMode((state) => state.filter((mode) => !mode === 'name'));
          setName('');
        })
      );
    } else {
      setDescription('');
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

  return (
    <div>
      <BuildProfileGrid>
        <ProfileImageWrapper>
          <ProfileImage src={build.img_url || fillerImg} alt={build.name} />
        </ProfileImageWrapper>
        <BuildTitle>
          <p>Build Name</p>
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
          <p>Description</p>
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
            <form id="description" onSubmit={handleSubmit}>
              <label>
                New Description{' '}
                <textarea
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

const BuildTitle = styled.div`
  font-size: 1rem;
`;

const Description = styled.div`
  font-size: 1rem;
`;

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
  padding: 5px;
  &:active {
    transform: scale(0.9);
  }
`;

const EquipmentDropdown = styled.div``;

const EquipmentItem = styled.div`
  display: grid;
  grid-template-columns: 10% 1fr 1fr 10%;
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
