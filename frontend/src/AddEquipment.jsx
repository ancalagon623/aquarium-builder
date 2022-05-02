import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { addEquipmentToBuild } from './reducers/actions';
import Filters from './Filters';

const AddEquipment = () => {
  const { currentCategory } = useSelector((state) => state.categories);
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
  }, []);

  return (
    <Container>
      {currentCategory ? (
        <EquipmentContent>
          <div>
            <h2>{currentCategory}</h2>
          </div>
          <EquipmentItem>
            <div />
            <h3>Title</h3>
            <h3>Price</h3>
            <div />
          </EquipmentItem>
          <Filters setEquipment={setEquipment} />
          <List>
            {equipment.map((e, i) => (
              <li key={i}>
                <EquipmentItem>
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
                    + Add to Build
                  </ChooseEqButton>
                </EquipmentItem>
              </li>
            ))}
          </List>
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
  grid-template-rows: 1fr 19fr;
`;

const Price = styled.span``;

const List = styled.ul`
  list-style: none;
  margin-top: 0;
  padding-right: 3em;
`;

const EquipmentItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr 1fr;
  align-items: center;
`;

const ChooseEqButton = styled.button``;

const ImageWrapper = styled.span`
  border: 2px solid rgba(0, 0, 0, 0.5);
  border-radius: 3px;
  margin-bottom: 10px;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
`;
