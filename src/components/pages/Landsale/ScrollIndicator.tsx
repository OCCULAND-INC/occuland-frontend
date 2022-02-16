import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { ChevronDoubleDownIcon } from '@heroicons/react/solid';
const bouncy = keyframes`
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
`;

const SCROLL_INDICATOR = styled.div`
  svg {
    path {
      color: #ccc;
      animation: ${bouncy} 2.5s linear infinite;
    }
  }
`;
export default function ScrollIndicator() {
  return (
    <SCROLL_INDICATOR
      style={{
        bottom: '0',
        color: '#ccc',
        display: 'flex',
        fontSize: '20px',
        justifyContent: 'space-between',
        left: '0',
        padding: '20px',
        position: 'absolute',
        width: '100%',
        zIndex: '0',
      }}
    >
      {' '}
      <ChevronDoubleDownIcon style={{ color: '#ccc', height: '50px' }} />
      <ChevronDoubleDownIcon style={{ color: '#ccc', height: '50px' }} />
    </SCROLL_INDICATOR>
  );
}
