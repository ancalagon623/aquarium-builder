import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { getCategories, getBuild } from './reducers/actions';

const EditBuild = () => {
  const build = useSelector((state) => state.builds.currentBuild);
  const { list } = useSelector((state) => state.categories);
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

  return (
    <div>
      <BuildName>
        {build.name}
        <TotalPrice>Total: ${build.price / 100 || 0}</TotalPrice>
      </BuildName>
      <p>{build.description}</p>
      <ul>
        {list.map((c, i) => (
          <CategoryItem key={i}>
            <CategoryName>
              {c.type}{' '}
              <AddEqButton
                type="button"
                onClick={() => {
                  goToEquipmentInCategory(c.type);
                }}
              >
                +
              </AddEqButton>
            </CategoryName>

            <EquipmentDropdown>
              <ul>
                {build.equipment.normalized[c.type]
                  ? build.equipment.normalized[c.type].map((eq, index) => (
                      <EquipmentItem key={index}>
                        <ImageWrapper>
                          <Image src={eq.img_url} alt={eq.eq_name} />
                        </ImageWrapper>
                        {eq.eq_name} <Price>{eq.price}</Price>
                      </EquipmentItem>
                    ))
                  : null}
              </ul>
            </EquipmentDropdown>
            <hr />
          </CategoryItem>
        ))}
      </ul>
    </div>
  );
};

export default EditBuild;

// EditBuild.propTypes = {
//   build: PropTypes.object.isRequired,
//   categories: PropTypes.object.isRequired,
// };

const BuildName = styled.h3`
  position: relative;
`;

const TotalPrice = styled.span`
  position: absolute;
  right: 26%;
`;

const CategoryName = styled.h3`
  position: relative;
`;

const CategoryItem = styled.li``;

const AddEqButton = styled.button`
  position: absolute;
  right: 20%;
`;

const EquipmentDropdown = styled.div``;

const EquipmentItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const ImageWrapper = styled.span`
  border: 2px solid rgba(0, 0, 0);
  border-radius: 3px;
  margin-bottom: 10px;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
`;

const Price = styled.span`
  height: fit-content;
  position: absolute;
  right: 30%;
`;
