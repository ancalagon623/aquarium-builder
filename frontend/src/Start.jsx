import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaFish, FaQuestion } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import { fillerImg } from './UserPage';

const Start = ({ setBuildToView }) => {
  // const [videoGuides, setVideoGuides] = useState([]);
  const navigate = useNavigate();
  const [featuredBuilds, setFeaturedBuilds] = useState([
    {
      bld_id: 1,
      bld_name: 'Crazy Fish',
      bld_description: 'Lorem ipsum dolor sit amet',
      price: 114497,
      img_url: fillerImg,
      equipment: {
        normalized: {},
        list: [
          {
            eq_id: 9,
            eq_name: 'ADA Lily Pipe P-1 Outflow (Return) 10mm',
            seller: 'Aquatic Warehouse',
            seller_site: 'https://www.aquaticwarehouse.com/',
            type: 'ADA Freshwater Planted Products',
            price: 8599,
            img_url:
              'https://www.aquaticwarehouse.com/image/cache/catalog/ADA%20Lily%20Pipe%20Outflow%2013mmc-228x228.PNG',
            link: 'https://www.aquaticwarehouse.com/ADA-Freshwater-Planted-Products/ADA-Lily-Pipe-P-1-Outflow-Return-10mm',
          },
          {
            eq_id: 194,
            eq_name: 'Hikari Betta Bio-Gold Pellets 2.5 Grams',
            type: 'Food for Fish and Invertibrates',
            price: 299,
            img_url:
              'https://www.aquaticwarehouse.com/image/cache/catalog/product/723-228x228.jpg',
            link: 'https://www.aquaticwarehouse.com/food-for-fish-and-invertibrates/hikari-betta-bio-gold-pellets-25-grams',
          },
          {
            eq_id: 174,
            eq_name: 'AquaClear 20 Filter',
            type: 'Filtration',
            price: 2599,
            img_url:
              'https://www.aquaticwarehouse.com/image/cache/catalog/product/5925034fbed3c_123-228x228.jpg',
            link: 'https://www.aquaticwarehouse.com/filtration/aquaclear-20-filter',
          },
          {
            eq_id: 32,
            eq_name:
              'JBJ Rimless Flat Panel AIO 45 Gal. Aquarium and White Stand',
            type: 'Aquariums',
            price: 103000,
            img_url:
              'https://www.aquaticwarehouse.com/image/cache/catalog/JBJ%2025%20gallon%20AIO%20White%20-228x228.PNG',
            link: 'https://www.aquaticwarehouse.com/freshwater-aquariums/JBJ-Rimless-Flat-Panel-AIO-45 Gal-Aquarium-and-White-Stand',
          },
        ],
      },
    },
    {
      bld_id: 2,
      bld_name: 'Funny Fish',
      bld_description: 'Lorem ipsum dolor sit amet',
      price: 114497,
      img_url: fillerImg,
      equipment: {
        normalized: {},
        list: [
          {
            eq_id: 9,
            eq_name: 'ADA Lily Pipe P-1 Outflow (Return) 10mm',
            seller: 'Aquatic Warehouse',
            seller_site: 'https://www.aquaticwarehouse.com/',
            type: 'ADA Freshwater Planted Products',
            price: 8599,
            img_url:
              'https://www.aquaticwarehouse.com/image/cache/catalog/ADA%20Lily%20Pipe%20Outflow%2013mmc-228x228.PNG',
            link: 'https://www.aquaticwarehouse.com/ADA-Freshwater-Planted-Products/ADA-Lily-Pipe-P-1-Outflow-Return-10mm',
          },
          {
            eq_id: 194,
            eq_name: 'Hikari Betta Bio-Gold Pellets 2.5 Grams',
            type: 'Food for Fish and Invertibrates',
            price: 299,
            img_url:
              'https://www.aquaticwarehouse.com/image/cache/catalog/product/723-228x228.jpg',
            link: 'https://www.aquaticwarehouse.com/food-for-fish-and-invertibrates/hikari-betta-bio-gold-pellets-25-grams',
          },
          {
            eq_id: 174,
            eq_name: 'AquaClear 20 Filter',
            type: 'Filtration',
            price: 2599,
            img_url:
              'https://www.aquaticwarehouse.com/image/cache/catalog/product/5925034fbed3c_123-228x228.jpg',
            link: 'https://www.aquaticwarehouse.com/filtration/aquaclear-20-filter',
          },
          {
            eq_id: 32,
            eq_name:
              'JBJ Rimless Flat Panel AIO 45 Gal. Aquarium and White Stand',
            type: 'Aquariums',
            price: 103000,
            img_url:
              'https://www.aquaticwarehouse.com/image/cache/catalog/JBJ%2025%20gallon%20AIO%20White%20-228x228.PNG',
            link: 'https://www.aquaticwarehouse.com/freshwater-aquariums/JBJ-Rimless-Flat-Panel-AIO-45 Gal-Aquarium-and-White-Stand',
          },
        ],
      },
    },
    {
      bld_id: 3,
      bld_name: 'Red Fish',
      bld_description: 'Lorem ipsum dolor sit amet',
      price: 114497,
      img_url: fillerImg,
      equipment: {
        normalized: {},
        list: [
          {
            eq_id: 9,
            eq_name: 'ADA Lily Pipe P-1 Outflow (Return) 10mm',
            seller: 'Aquatic Warehouse',
            seller_site: 'https://www.aquaticwarehouse.com/',
            type: 'ADA Freshwater Planted Products',
            price: 8599,
            img_url:
              'https://www.aquaticwarehouse.com/image/cache/catalog/ADA%20Lily%20Pipe%20Outflow%2013mmc-228x228.PNG',
            link: 'https://www.aquaticwarehouse.com/ADA-Freshwater-Planted-Products/ADA-Lily-Pipe-P-1-Outflow-Return-10mm',
          },
          {
            eq_id: 194,
            eq_name: 'Hikari Betta Bio-Gold Pellets 2.5 Grams',
            type: 'Food for Fish and Invertibrates',
            price: 299,
            img_url:
              'https://www.aquaticwarehouse.com/image/cache/catalog/product/723-228x228.jpg',
            link: 'https://www.aquaticwarehouse.com/food-for-fish-and-invertibrates/hikari-betta-bio-gold-pellets-25-grams',
          },
          {
            eq_id: 174,
            eq_name: 'AquaClear 20 Filter',
            type: 'Filtration',
            price: 2599,
            img_url:
              'https://www.aquaticwarehouse.com/image/cache/catalog/product/5925034fbed3c_123-228x228.jpg',
            link: 'https://www.aquaticwarehouse.com/filtration/aquaclear-20-filter',
          },
          {
            eq_id: 32,
            eq_name:
              'JBJ Rimless Flat Panel AIO 45 Gal. Aquarium and White Stand',
            type: 'Aquariums',
            price: 103000,
            img_url:
              'https://www.aquaticwarehouse.com/image/cache/catalog/JBJ%2025%20gallon%20AIO%20White%20-228x228.PNG',
            link: 'https://www.aquaticwarehouse.com/freshwater-aquariums/JBJ-Rimless-Flat-Panel-AIO-45 Gal-Aquarium-and-White-Stand',
          },
        ],
      },
    },
    {
      bld_id: 4,
      bld_name: 'Blue Fish',
      bld_description: 'Lorem ipsum dolor sit amet',
      price: 114497,
      img_url: fillerImg,
      equipment: {
        normalized: {},
        list: [
          {
            eq_id: 9,
            eq_name: 'ADA Lily Pipe P-1 Outflow (Return) 10mm',
            seller: 'Aquatic Warehouse',
            seller_site: 'https://www.aquaticwarehouse.com/',
            type: 'ADA Freshwater Planted Products',
            price: 8599,
            img_url:
              'https://www.aquaticwarehouse.com/image/cache/catalog/ADA%20Lily%20Pipe%20Outflow%2013mmc-228x228.PNG',
            link: 'https://www.aquaticwarehouse.com/ADA-Freshwater-Planted-Products/ADA-Lily-Pipe-P-1-Outflow-Return-10mm',
          },
          {
            eq_id: 194,
            eq_name: 'Hikari Betta Bio-Gold Pellets 2.5 Grams',
            type: 'Food for Fish and Invertibrates',
            price: 299,
            img_url:
              'https://www.aquaticwarehouse.com/image/cache/catalog/product/723-228x228.jpg',
            link: 'https://www.aquaticwarehouse.com/food-for-fish-and-invertibrates/hikari-betta-bio-gold-pellets-25-grams',
          },
          {
            eq_id: 174,
            eq_name: 'AquaClear 20 Filter',
            type: 'Filtration',
            price: 2599,
            img_url:
              'https://www.aquaticwarehouse.com/image/cache/catalog/product/5925034fbed3c_123-228x228.jpg',
            link: 'https://www.aquaticwarehouse.com/filtration/aquaclear-20-filter',
          },
          {
            eq_id: 32,
            eq_name:
              'JBJ Rimless Flat Panel AIO 45 Gal. Aquarium and White Stand',
            type: 'Aquariums',
            price: 103000,
            img_url:
              'https://www.aquaticwarehouse.com/image/cache/catalog/JBJ%2025%20gallon%20AIO%20White%20-228x228.PNG',
            link: 'https://www.aquaticwarehouse.com/freshwater-aquariums/JBJ-Rimless-Flat-Panel-AIO-45 Gal-Aquarium-and-White-Stand',
          },
        ],
      },
    },
  ]);

  const getFeaturedBuilds = () => {};

  useEffect(() => {
    getFeaturedBuilds();
  }, []);

  const buildClickHandler = (build) => {
    setBuildToView(build);
    navigate('/builds/view');
  };

  return (
    <>
      <Header>
        <Motto>
          <span>Building an aquarium </span>
          <span>{" shouldn't be complicated."}</span>
          <span>Now it isn't.</span>
        </Motto>
        <Logo>
          <Wrapper>
            <StyledFaQuestion />
            <StyledFaQuestion2 />
            <StyledFaFish />
            <MainIcon
              src="./fishbowl-icon.jpg"
              alt="man in a fishbowl, thinking"
            />
          </Wrapper>
        </Logo>
      </Header>
      <SectionTitle>Setup Guides</SectionTitle>
      <Guides>
        <VideoWrapper>
          <Video
            src={`https://www.youtube.com/embed/${'tSg-Zgps_d0'}`}
            width="500"
            height="300"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            title="Setup Guide 1"
          />
        </VideoWrapper>
        <VideoWrapper>
          <Video
            src={`https://www.youtube.com/embed/${'Aal2W8sDOPA'}`}
            width="500"
            height="300"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            title="Setup Guide 1"
          />
        </VideoWrapper>
        <VideoWrapper>
          <Video
            src={`https://www.youtube.com/embed/${'qwN9fN8bEHI'}`}
            width="500"
            height="300"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            title="Setup Guide 1"
          />
        </VideoWrapper>
        <VideoWrapper>
          <Video
            src={`https://www.youtube.com/embed/${'kgEfWkp6UCk'}`}
            width="500"
            height="300"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            title="Setup Guide 1"
          />
        </VideoWrapper>
        <VideoWrapper>
          <Video
            src={`https://www.youtube.com/embed/${'fGgru9qZDjY'}`}
            width="500"
            height="300"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            title="Setup Guide 1"
          />
        </VideoWrapper>
      </Guides>
      <SectionTitle>Featured Aquariums</SectionTitle>
      <Builds>
        {featuredBuilds.map((b, i) => (
          <OneBuild
            key={b.bld_id}
            onClick={() => {
              buildClickHandler(b);
            }}
          >
            <BuildImage src={b.img_url} alt={b.bld_name} />
            <Container>
              <Name>{b.bld_name}</Name>
              <Price>
                {(b.price / 100).toLocaleString('en-US', {
                  currency: 'USD',
                  style: 'currency',
                })}
              </Price>
            </Container>
          </OneBuild>
        ))}
      </Builds>
    </>
  );
};

Start.propTypes = {
  setBuildToView: PropTypes.func.isRequired,
};

export default Start;

const SectionTitle = styled.h4`
  font-size: 2rem;
  background-color: var(--theme);
  padding: 5px;
  border-radius: 3px;
`;

const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-image: linear-gradient(rgba(0, 0, 0, 0.1), var(--theme) 85%);
  border-radius: 3px;
  padding: 1rem 1rem 3rem 1rem;
`;

const Motto = styled.div`
  flex-grow: 3;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 5px;
  font-size: 3rem;
  justify-content: left;
`;

const Wrapper = styled.div`
  position: relative;
`;

const StyledFaQuestion = styled(FaQuestion)`
  font-size: larger;
  position: absolute;
  color: white;
  left: 37%;
  top: 30%;
`;

const StyledFaQuestion2 = styled(FaQuestion)`
  font-size: x-large;
  position: absolute;
  color: white;
  left: 45%;
  top: 25%;
`;

const StyledFaFish = styled(FaFish)`
  font-size: larger;
  position: absolute;
  color: white;
  left: 50%;
  top: 32%;
`;

const MainIcon = styled.img`
  width: 100%;
  max-width: 400px;
  min-width: 100px;
  max-height: 400px;
  min-height: 100px;
  object-fit: cover;
  border-radius: 50%;
`;

const Logo = styled.div`
  padding-top: 1rem;
  flex-grow: 1;
  text-align: center;
`;

const Guides = styled.div`
  display: grid;
  gap: 1rem;
  grid-auto-flow: column;
  grid-auto-columns: 39%;
  overflow-x: auto;
`;

const VideoWrapper = styled.div``;

const Video = styled.iframe`
  width: 100%;
`;

const Builds = styled.div`
  display: flex;
  justify-content: center;
  grid-gap: 2rem;
  flex-wrap: wrap;
`;

const OneBuild = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: wheat;
  padding: 3px;
  border-radius: 2px;
  cursor: pointer;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 11px;
  transition: box-shadow 100ms ease-in, transform 100ms ease-in;
  &:hover {
    box-shadow: 0 0 7px #a09e9e89;
    transform: scale(1.02);
  }
`;

const BuildImage = styled.img``;

const Container = styled.div`
  display: flex;
`;

const Price = styled.p`
  flex-grow: 1;
  text-align: right;
`;

const Name = styled.p``;
