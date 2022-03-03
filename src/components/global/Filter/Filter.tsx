import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { FilterIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { useState } from 'react';

import LogoText from '~/assets/logo/logo_text.png';

interface StyledProps {
  show: number;
}
/*const bouncy = keyframes`
from, 20%, 53%, 80%, to {
  transform: translate3d(0,0,0);
  opacity: 1
}

40%, 43% {
  transform: translate3d(0, -1px, 0);
  opacity: 0.2
}

70% {
  transform: translate3d(0, -1px, 0);
  opacity: 0.4
}

90% {
  transform: translate3d(0,-1px,0);
  opacity: 1
}
`;*/

const SideTransition = (size: string) => keyframes`
0% {
    width: 0vw;
}
100% {
    width: ${size};
    opacity: 1;
    display: block;
}
`;
const SideTransitionBack = (size: string) => keyframes`
0% {
    width: ${size};
    opacity: 1;
}
100% {
    width: 0vw;
    display: none;
    opacity: 0;
}
`;

const textOpacity = keyframes`
0% {
    opacity: 0.0;
    
}
100% {
    opacity: 1.0;
    
}
`;
const textOpacityR = keyframes`
0% {
    opacity: 0.0;
    
}
`;

const FILTER_INDICATOR = styled.div<StyledProps>`
  position: absolute;
  ${'@media (min-width: 500px)'} {
      top: 15px;
    }
  ${'@media (max-width: 500px)'} {
      bottom: 20px;
    }
  right: 10px;
  .filter-container {
    position: relative;
    height: auto;
    z-index: 10;
    padding: 10px;
    svg {
    ${'@media (min-width: 500px)'} {height : 50px;}
      ${'@media (max-width: 500px)'} {height : 45px;}
      background-color: #ccc;
      
      border-radius: 100%;
      padding: 5px;
      color: white;
      box-shadow: 0px 0px 5px 1px #292828;
      path {
        color: white;
      }
      :hover {
        background-color: purple;
        box-shadow: 0px 0px 0px 0px #292828;
      }
    }
    .filter-modal {
      position: fixed;
      z-index: 1;
      left: 0;
      top: 0;
      background-color: #141414;
      height: 100vh;
      opacity: 0;
      ${'@media (min-width: 500px)'} {animation: ${(StyledProps) =>
  StyledProps.show == 1
    ? css`
        ${SideTransition('165px')} 0.5s linear forwards
      `
    : StyledProps.show == 0
    ? css`
        ${SideTransitionBack('165px')} 0.5s linear forwards
      `
    : 'none'}};

    ${'@media (max-width: 499px)'} {animation: ${(StyledProps) =>
  StyledProps.show == 1
    ? css`
        ${SideTransition('40vw')} 0.5s linear forwards
      `
    : StyledProps.show == 0
    ? css`
        ${SideTransitionBack('40vw')} 0.5s linear forwards
      `
    : 'none'}};
  }
`;

const FILTER_CONTAINER = styled.div<StyledProps>`
  height: 100%;
  color: white;
  flex-direction: column;
  flex-wrap: none;
  opacity: 0;
  display: ${(StyledProps) => (StyledProps.show == 1 ? 'block' : 'none')};
  animation: ${(StyledProps) =>
    StyledProps.show == 1
      ? css`
          ${textOpacity} 0.5s 0.5s linear forwards
        `
      : StyledProps.show == 0
      ? css`
          ${textOpacityR}0.5s 0.5s linear forwards
        `
      : 'none'};
  div {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    label {
      padding-left: 10px;
      font-weight: 600;
      align-self: flex-start;
    }
    label:first-child {
      padding-top: 10px;
    }
    hr {
      margin: 20px 0px;
      border: none;
      height: 0.5px;
      width: 100%;
      background-color: #efefef;
      color: red;
    }
    button {
      min-width: 80%;
      width: 80%;
      padding: 10px 2px;
      margin: 10px 0px;
      border-radius: 5px;
      border: solid 0.5px #141414;
      font-size: 14px;
      height: 40px;
      box-shadow: 0px 0px 6px 1px #b53ebd;
      background-color: #212121;
      :hover {
        background-color: purple;
        color: white;
        border: none;
        box-shadow: 0px 0px 0px 0px #ccc;
      }
    }
  }
`;

export default function Filter(props: {
  sortPrice: (e: boolean) => void;
  sortType: boolean;
}) {
  const [showFilterModal, setShowFilterModal] = useState(9);
  return (
    <FILTER_INDICATOR show={showFilterModal}>
      <div className="filter-container">
        <FilterIcon
          onClick={() =>
            setShowFilterModal(
              showFilterModal == 0 || showFilterModal == 9 ? 1 : 0,
            )
          }
        />
        <div className="filter-modal">
          <FILTER_CONTAINER show={showFilterModal}>
            <div>
              <label>Platforms:</label>
              <button>All</button>
              <PlatformButton
                url={
                  'https://lh3.googleusercontent.com/5KIxEGmnAiL5psnMCSLPlfSxDxfRSk4sTQRSyhPdgnu70nGb2YsuVxTmO2iKEkOZOfq476Bl1hAu6aJIKjs1myY=s130'
                }
                title="Decentraland"
              />
              <PlatformButton
                url={
                  'https://lh3.googleusercontent.com/SXH8tW1siikB80rwCRnjm1a5xM_MwTg9Xl9Db6mioIk9HIlDM09pVoSR7GKJgS6ulSUpgW9BDtMk_ePX_NKgO9A=s130'
                }
                title="The Sandbox"
              />
              <PlatformButton
                url={
                  'https://lh3.googleusercontent.com/mzUNo5vk95qQfpAbXir0_6oJmZlyqnq_ix3BIjmfeVGrFPoxeAqf-vYHMvh115bSdJGxRtgGTWKldOzdJQGtEqGW=s130'
                }
                title="Somnium"
              />
              <PlatformButton
                url={
                  'https://lh3.googleusercontent.com/Jy6UrKMSi0e9w9jYtC1ON-4tOVXA1mXLk7XCLxvWEDuXeLFExJSYnw2DLAGtP3Ly98WJbrrFm6xEodcrpGnKB2tF=s130'
                }
                title="Cryptovoxels"
              />
              <hr></hr>
              <label>Price:</label>
              <button
                style={{
                  backgroundColor: `${
                    props.sortType == true ? 'purple' : '#212121'
                  }`,
                  boxShadow: `${
                    props.sortType == true
                      ? '0px 0px 0px 0px #ccc'
                      : '0px 0px 6px 1px #b53ebd'
                  }`,
                }}
                onClick={() => props.sortPrice(true)}
              >
                Low to High
              </button>
              <button
                style={{
                  backgroundColor: `${
                    props.sortType == false ? 'purple' : '#212121'
                  }`,
                  boxShadow: `${
                    props.sortType == false
                      ? '0px 0px 0px 0px #ccc'
                      : '0px 0px 6px 1px #b53ebd'
                  }`,
                }}
                onClick={() => props.sortPrice(false)}
              >
                High to Low
              </button>
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: '0',
                padding: '0px 10px',
                height: '70px',
              }}
            >
              <Image src={LogoText} />
            </div>
          </FILTER_CONTAINER>
        </div>
      </div>
    </FILTER_INDICATOR>
  );
}

const PLATFORM_BUTTON = styled.div`
  button {
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    img {
      padding: 0px 2px;
      height: 100%;
      border-radius: 100%;
    }
    label {
      padding: 0;
      padding-left: 5px;
      text-align: left;
      height: 100%;
      width: 100%;
      font-size: 1em;
    }
  }
`;

function PlatformButton(props: { title: string; url: string }) {
  return (
    <PLATFORM_BUTTON>
      <button>
        <img src={props.url} />
        <label>{props.title}</label>
      </button>
    </PLATFORM_BUTTON>
  );
}

/*
          <FILTER_CONTAINER show={showFilterModal}>
            <div>
              <h3>Platforms:</h3>
              <button>All</button>
              <button>Decentraland</button>
              <button>The Sandbox</button>
              <button>Somnium Space</button>
            </div>
          </FILTER_CONTAINER>
*/
