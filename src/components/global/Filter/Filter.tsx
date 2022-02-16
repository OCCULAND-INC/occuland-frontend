import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { FilterIcon } from '@heroicons/react/solid';
import { useState } from 'react';

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
  top: 5px;
  right: 5px;
  .filter-container {
    position: relative;
    height: 0px;
    border-radius: 100%;
    z-index: 1;
    svg {
      height: 50px;
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
        ${SideTransition('160px')} 0.5s linear forwards
      `
    : StyledProps.show == 0
    ? css`
        ${SideTransitionBack('160px')} 0.5s linear forwards
      `
    : 'none'}};

    ${'@media (max-width: 499px)'} {animation: ${(StyledProps) =>
  StyledProps.show == 1
    ? css`
        ${SideTransition('50vw')} 0.5s linear forwards
      `
    : StyledProps.show == 0
    ? css`
        ${SideTransitionBack('50vw')} 0.5s linear forwards
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

export default function Filter() {
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
              <button>Decentraland</button>
              <button>The Sandbox</button>
              <button>Somnium Space</button>
              <hr></hr>
              <label>Price:</label>
              <button>Low to High</button>
              <button>High to Low</button>
            </div>
          </FILTER_CONTAINER>
        </div>
      </div>
    </FILTER_INDICATOR>
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
