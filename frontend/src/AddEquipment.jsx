import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { addEquipmentToBuild } from './reducers/actions';

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
        <>
          <h2>{currentCategory}</h2>
          <List>
            {equipment.map((e, i) => (
              <li key={i}>
                <EquipmentItem>
                  <ImageWrapper>
                    <Image src={e.img_url} alt={e.eq_name} />
                  </ImageWrapper>
                  {e.eq_name} <Price>{e.price}</Price>
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
        </>
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

const Price = styled.span`
  position: absolute;
  right: 30%;
`;

const List = styled.ul`
  list-style: none;
`;

const EquipmentItem = styled.h3`
  position: relative;
  display: flex;
  align-items: center;
`;

const ChooseEqButton = styled.button`
  position: absolute;
  right: 20%;
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
