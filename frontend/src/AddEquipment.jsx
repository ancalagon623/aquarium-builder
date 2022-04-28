import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { addEquipmentToBuild } from './reducers/actions';

const AddEquipment = () => {
  const { currentCategory } = useSelector((state) => state.categories);
  const { currentBuild } = useSelector((state) => state.builds);
  const [equipment, setEquipment] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchEquipmentByCategory = async (category) => {
    try {
      const { data, status } = await axios.get(
        `${process.env.REACT_APP_BACKEND}/api/categories/${currentCategory}`
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
      fetchEquipmentByCategory(currentCategory);
    }
  }, []);

  return (
    <div>
      {currentCategory ? (
        <div>
          <ul>
            {equipment.map((e, i) => (
              <li key={i}>
                <EquipmentItem>
                  {e.eq_name} <Price>{e.price}</Price>
                  <ChooseEqButton
                    type="button"
                    onClick={() => {
                      dispatch(
                        addEquipmentToBuild(
                          e.eq_id,
                          localStorage.getItem('currentBuild') || 0,
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
          </ul>
        </div>
      ) : (
        <h2>Select a category to get started</h2>
      )}
    </div>
  );
};

export default AddEquipment;

const Price = styled.span`
  position: absolute;
  right: 30%;
`;

const EquipmentItem = styled.h3`
  position: relative;
`;

const ChooseEqButton = styled.button`
  position: absolute;
  right: 20%;
`;
