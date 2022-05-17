import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

const ViewBuild = ({ build }) => {
  // eslint-disable-next-line camelcase
  const { bld_name, bld_description, img_url, price } = build;
  const navigate = useNavigate();

  const goToItem = (link) => {
    window.open(link, '_blank');
  };

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
            <TextBlock>{bld_name}</TextBlock>
            <BackButton onClick={() => navigate('/')}>Back to Home</BackButton>
          </NameHeading>
          <DescriptionHeading>
            {/* eslint-disable-next-line camelcase */}
            <TextBlock>{bld_description}</TextBlock>
          </DescriptionHeading>
        </Wrapper>
      </FlexContainerOne>
      <FlexContainerTwo>
        <SpecWrapper>
          <Heading>Specs</Heading>
          <Specs>
            <Label>Price</Label>
            <Price>
              {(price / 100).toLocaleString('en-US', {
                currency: 'USD',
                style: 'currency',
              })}
            </Price>
          </Specs>
        </SpecWrapper>
        <EquipmentWrapper>
          <Heading>Equipment</Heading>
          <Equipment>
            {build.equipment.list.map((e) => (
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
              </EquipmentItem>
            ))}
          </Equipment>
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
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const FlexContainerTwo = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const ImageContainer = styled.div`
  background-color: #05c5c5;
  border-radius: 5px;
  text-align: center;
  padding: 20px;
  flex: 0 1 300px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1 1 60%;
`;

const NameHeading = styled.div`
  flex: 0 0 auto;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-image: linear-gradient(
    to right,
    #05c5c5,
    20%,
    rgba(0, 0, 0, 0.05)
  );
  border-radius: 5px;
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

const DescriptionHeading = styled.div`
  align-items: center;
  padding: 20px;
  border-radius: 5px;
  flex: 3 1 auto;
  background-image: linear-gradient(
    to right,
    #05c5c5,
    20%,
    rgba(0, 0, 0, 0.05)
  );
`;

const TextBlock = styled.p`
  margin: 0;
`;

const SpecWrapper = styled.div`
  flex: 0 1 340px;
`;

const Specs = styled.div`
  display: grid;
  margin-top: 15px;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: 1fr 1fr;
`;

const Price = styled.div`
  align-self: center;
  justify-self: center;
  font-weight: bold;
`;

const Label = styled.div`
  padding: 20px;
  margin: 5px 0 0 5px;
  font-size: 1.1rem;
  font-weight: bold;
  text-align: center;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
`;

const EquipmentWrapper = styled.div`
  flex: 11 0 60%;
`;

const Equipment = styled.div``;

const EquipmentItem = styled.div`
  display: grid;
  padding: 15px 0;
  margin: 0 20px;
  grid-template-columns: 1fr 4fr 1fr 1fr;
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

const ImageWrapper = styled.span`
  border: 2px solid rgba(0, 0, 0, 0.5);
  border-radius: 3px;
  text-align: center;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
`;

const Heading = styled.div`
  background-color: #05c5c5;
  border-radius: 10px;
  font-weight: bold;
  padding: 5px;
  text-align: center;
`;
