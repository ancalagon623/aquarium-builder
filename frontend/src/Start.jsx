import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaFish, FaQuestion } from 'react-icons/fa';
import { fillerImg } from './UserPage';

const Start = () => {
  const [videoGuides, setVideoGuides] = useState([]);
  const [featuredBuilds, setFeaturedBuilds] = useState([
    { bld_id: 1, bld_name: 'Crazy Fish', price: 120000, img_url: fillerImg },
    { bld_id: 2, bld_name: 'Funny Fish', price: 80000, img_url: fillerImg },
    { bld_id: 3, bld_name: 'Red Fish', price: 100000, img_url: fillerImg },
    { bld_id: 4, bld_name: 'Blue Fish', price: 150000, img_url: fillerImg },
  ]);

  const getFeaturedBuilds = () => {};

  useEffect(() => {
    getFeaturedBuilds();
  }, []);

  return (
    <>
      <Header>
        <Motto>
          <span>Building an aquarium </span>
          <span>{" shouldn't be complicated."}</span>
        </Motto>
        <Logo>
          <FaQuestion />

          <FaFish />
          <MainIcon
            src="./fishbowl-icon.jpg"
            alt="man in a fishbowl, thinking"
          />
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
      <SectionTitle>Completed Aquariums</SectionTitle>
      <Builds>
        {featuredBuilds.map((b, i) => (
          <OneBuild key={b.bld_id}>
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

export default Start;

const SectionTitle = styled.h4`
  margin-top: 25vh;
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
  padding: 1rem;
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

const MainIcon = styled.img`
  width: 100%;
  max-width: 300px;
  min-width: 100px;
  max-height: 300px;
  min-height: 100px;
  object-fit: cover;
  border-radius: 50%;
`;

const Logo = styled.div`
  padding: 2rem;
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
