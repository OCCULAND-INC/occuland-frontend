import styled from '@emotion/styled';
import Image from 'next/image';
import { ClipLoader } from 'react-spinners';

import LogoText from '~/assets/logo/logo_text.png';

const LOADING_CONTAINER = styled.div`
  ${'@media (min-width: 500px)'} {
    position: absolute;
    .logo {
      display: none;
    }
  }
  ${'@media (max-width: 500px)'} {
    position: fixed;
    .logo {
      position: absolute;
      bottom: 0;
      padding: 5%;
    }
  }

  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  label {
    font-size: 30px;
    font-weight: bold;
    color: purple;
  }
`;

export default function LoadingSm() {
  return (
    <LOADING_CONTAINER>
      <ClipLoader color={'purple'} size={150} />
      <label>Loading . . .</label>
      <div className="logo">
        <Image src={LogoText} />
      </div>
    </LOADING_CONTAINER>
  );
}
