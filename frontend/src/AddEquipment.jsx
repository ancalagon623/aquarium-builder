import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { addEquipmentToBuild } from './reducers/actions';

const AddEquipment = () => {
  const { currentCategory } = useSelector((state) => state.categories);
  const { currentBuild } = useSelector((state) => state.builds);
  const [equipment, setEquipment] = useState([]);
  const dispatch = useDispatch();

  const fetchEquipmentByCategory = async (category) => {
    const options = {
      headers: {
        'category-name': currentCategory,
      },
    };
    try {
      const { data, status } = await axios.get(
        `${process.env.REACT_APP_BACKEND}/api/categories/${currentCategory}`,
        options
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
                  {e.eq_name}{' '}
                  <ChooseEqButton
                    type="button"
                    onClick={() => {
                      dispatch(
                        addEquipmentToBuild(
                          e.eq_id,
                          localStorage.getItem('currentBuild')
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

const EquipmentItem = styled.h3`
  position: relative;
`;

const ChooseEqButton = styled.button`
  position: absolute;
  right: 20%;
`;
