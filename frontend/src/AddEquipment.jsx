import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { FaPlus } from 'react-icons/fa';
import { addEquipmentToBuild } from './reducers/actions';
import Filters from './Filters';

const AddEquipment = () => {
  const { currentCategory } = useSelector((state) => state.categories);
  const currentBuild = useSelector((state) => state.builds.currentBuild);
  const [equipment, setEquipment] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchEquipmentByCategory = async () => {
    try {
      const { data, status } = await axios.get(
        `${process.env.REACT_APP_BACKEND}/api/categories/${currentCategory}/equipment`
      );

      if (status === 200) {
        setEquipment(data);
      }
    } catch (err) {
      return null;
    }
  };

  useEffect(() => {
    if (currentCategory) {
      fetchEquipmentByCategory();
    }
    window.scrollTo(0, 0);
  }, []);

  const goToItem = (link) => {
    window.open(link, '_blank');
  };

  return (
    <Container>
      {currentCategory ? (
        <EquipmentContent>
          <PageTitle>
            <TitleText>
              Add {currentCategory} to '
              {currentBuild.name || '(no build available)'}'
            </TitleText>
            <BackButton type="button" onClick={() => navigate('/builds/edit')}>
              Back to {currentBuild.name || 'build'}
            </BackButton>
          </PageTitle>

          <InnerCategoryName>
            <h2>{currentCategory}</h2>
          </InnerCategoryName>
          <EquipmentItemHeading>
            <PurpleBlock />
            <div />
            <h3>Name</h3>
            <h3>Price</h3>
            <div />
            <div />
          </EquipmentItemHeading>

          <StyledFilters setEquipment={setEquipment} />
          <EqList>
            {equipment.map((e) => (
              <EquipmentItem key={e.eq_id}>
                <ImageWrapper>
                  <Image src={e.img_url} alt={e.eq_name} />
                </ImageWrapper>
                {e.eq_name}{' '}
                <Price>
                  {(e.price / 100).toLocaleString('en-US', {
                    currency: 'USD',
                    style: 'currency',
                  })}
                </Price>
                <VisitStore
                  onClick={() => {
                    goToItem(e.link);
                  }}
                >
                  View Item
                </VisitStore>
                <ChooseEqButton
                  type="button"
                  onClick={() => {
                    dispatch(
                      addEquipmentToBuild(
                        e.eq_id,
                        localStorage.getItem('currentBuild'),
                        navigate
                      )
                    );
                  }}
                >
                  <FaPlus /> Add
                </ChooseEqButton>
              </EquipmentItem>
            ))}
          </EqList>
        </EquipmentContent>
      ) : (
        <h2>Select a category to get started</h2>
      )}
    </Container>
  );
};

export default AddEquipment;

const Container = styled.div`
  text-align: center;
`;

const EquipmentContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: 65px 1fr max-content;
`;

const PageTitle = styled.h2`
  grid-column-start: 1;
  grid-column-end: 3;
  padding-left: 15px;
  margin: 0 0 15px 0;
  display: flex;
  justify-content: space-between;
  background-image: linear-gradient(to right, var(--theme), 40%, #ffffff28);
  border-radius: 5px;
`;

const TitleText = styled.span`
  align-self: center;
`;

const BackButton = styled.button`
  all: unset;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 16px;
  font-weight: 300;
  border-radius: 5px;
  border: 2px solid transparent;
  padding: 3px;
  &:hover {
    border: 2px solid black;
  }
  cursor: pointer;
  align-self: center;
  margin-right: 20px;
`;

const EquipmentItemHeading = styled.div`
  background-color: var(--theme);
  display: grid;
  padding: 0 20px;
  grid-template-columns: 1fr 4fr 1fr 1fr 1fr;
  gap: 15px;
  align-items: center;
  position: relative;
`;

const StyledFilters = styled(Filters)`
  background-color: var(--theme);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const InnerCategoryName = styled.div`
  background-color: #59028b;
  box-shadow: 4px 2px 3px 1px #30024b;
  position: relative;
  z-index: 100;
`;

const PurpleBlock = styled.div`
  position: absolute;
  z-index: 201;
  background-color: #59028b;
  width: 70px;
  border-bottom-right-radius: 100%;
  box-shadow: 4px 2px 3px 1px #30024b;
  height: 100%;
  left: 0;
  top: 0;
`;

const Price = styled.span``;

const EqList = styled.ul`
  margin: 0;
  list-style: none;
  padding: 20px 0 0 0;
  display: grid;
  gap: 15px;
  grid-template-columns: 1fr;
  grid-template-rows: max-content;
`;

const EquipmentItem = styled.div`
  display: grid;
  padding-bottom: 15px;
  margin: 0 20px;
  grid-template-columns: 1fr 4fr 1fr 1fr 1fr;
  gap: 15px;
  align-items: center;
  border-bottom: 1px solid black;
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

const ChooseEqButton = styled.button`
  all: unset;
  cursor: pointer;
  &:hover {
    border: 2px solid black;
  }
  &:active {
    transform: scale(0.98);
  }
  width: fit-content;
  padding: 5px;
  border-radius: 5px;
  justify-self: center;
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
