import styled from 'styled-components';
import PropTypes from 'prop-types';
import { fillerImg } from './UserPage';

const ViewBuild = ({ build }) => {
  // eslint-disable-next-line camelcase
  const { bld_name, bld_description, img_url } = build;

  return (
    <>
      <FlexContainerOne>
        <ImageContainer>
          {/* eslint-disable-next-line camelcase */}
          <img src={img_url} alt="build" />
        </ImageContainer>
        <Wrapper>
          <NameHeading>
            {/* eslint-disable-next-line camelcase */}
            <h4>{bld_name}</h4>
          </NameHeading>
          <DescriptionHeading>
            {/* eslint-disable-next-line camelcase */}
            <p>{bld_description}</p>
          </DescriptionHeading>
        </Wrapper>
      </FlexContainerOne>
      <FlexContainerTwo>
        <SpecWrapper>
          <Heading>Specs</Heading>
        </SpecWrapper>
        <EquipmentWrapper>
          <Heading>Equipment</Heading>
        </EquipmentWrapper>
      </FlexContainerTwo>
    </>
  );
};

export default ViewBuild;

ViewBuild.propTypes = {
  build: PropTypes.object.isRequired,
};

const FlexContainerOne = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

const FlexContainerTwo = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ImageContainer = styled.div`
  background-color: #05c5c5;
  border-radius: 5px;
  flex: 0 1 auto;
`;

const Wrapper = styled.div`
  flex: 0 1 auto;
`;

const NameHeading = styled.div`
  margin-bottom: 20px;
  background-color: #05c5c5;
  border-radius: 5px;
`;

const DescriptionHeading = styled.div`
  background-color: #05c5c5;
  border-radius: 5px;
`;

const SpecWrapper = styled.div``;

const EquipmentWrapper = styled.div``;

const Heading = styled.div`
  background-color: #05c5c5;
  border-radius: 10px;
  text-align: center;
`;
