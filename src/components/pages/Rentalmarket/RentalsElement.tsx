/* eslint-disable sort-keys */
import styled from '@emotion/styled';

import { Platforms } from '~/assets/platforms/Plaforms';

interface RentalsContainer {
  account?: string;
  assets: RentalData[];
}
interface RentalData {
  available: string;
  created_at: string;
  frequency: string;
  id: number;
  name: string;
  platform: string;
  plot_coords: string;
  plot_link: string;
  rate: string;
}

const PROFILE_CONTENT_CONTAINER = styled.div`
  margin: 70px 0px;
  height: 100%;
  width: 85%;
  box-sizing: border-box;
`;
const PROFILE_CONTENT_MAIN = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  overflow: scroll;
  padding-bottom: 100px;
`;
const MORALIS_CARD = styled.div`
  ${'@media (max-width: 601px)'} {
  }
  position: relative;
  padding: '10px';
  margin: 10px;
  border: solid;
  width: 200px;
  height: 350px;
  border-radius: 5px;
  border: solid 1.5px #ccc;
  display: flex;
  flex-direction: column;
  :hover {
    box-shadow: 0px 0px 15px 1px rgb(1, 1, 1, 0.3);
  }
  img {
    height: 150px;
  }
  .content {
    height: auto;
  }
  .button-container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    button {
      border-radius: 5px;
      padding: 10px;
      background-color: #212121;
      box-shadow: 0px 0px 3px 1px #ccc;
      color: white;
      :hover {
        background-color: purple;
        box-shadow: 0px 0px 0px 0px #ccc;
      }
    }
  }
  .footer-image {
    position: absolute;
    bottom: 5px;
    right: 5px;
    height: 30px;
    width: 30px;
    * {
      height: 100%;
    }
  }
`;
const CARD_INFO_ROW = styled.div`
  padding-top: 2px;
  display: flex;
  flex-direction: row;
  *:first-child {
    font-weight: 600;
    padding-left: 5px;
  }
  *:last-child {
    padding-left: 5px;
  }
`;

const NO_DATA = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  color: #141414;
  h2 {
    font-size: 24px;
  }
  a {
    font-size: 20px;
    font-weight: 500;
    color: #141414;
    opacity: 0.8;
  }
`;
function MoralisNFTCard(props: {
  item: RentalData;
  onClick: (e: string) => void;
}) {
  const platformurl = Platforms.filter(
    (e: any) => e['name'].toUpperCase() == props.item.platform.toUpperCase(),
  );
  const platformImg = platformurl[0]['img'];
  return (
    <MORALIS_CARD>
      <img src={props.item.plot_link} />
      <div className="content">
        <LabelRow
          label="Name"
          title={props.item.name || props.item.id.toString()}
        />
        <LabelRow label="Coordinates" title={props.item.plot_coords} />
        <LabelRow
          label="Rental Min"
          title={props.item.frequency.toUpperCase()}
        />
        <LabelRow label="Starting Rate" title={`$${props.item.rate}.00`} />
      </div>
      <div className="button-container">
        <button onClick={() => props.onClick(props.item.platform)}>
          Rent Now
        </button>
      </div>
      <div className="footer-image">
        <img src={platformImg} />
      </div>
    </MORALIS_CARD>
  );
}

function LabelRow(props: { label: string; title: string }) {
  return (
    <CARD_INFO_ROW>
      <label>{props.label}:</label>
      <span>
        {props.title.length > 10
          ? props.title.substring(0, 10) + '...'
          : props.title}
      </span>
    </CARD_INFO_ROW>
  );
}

export default function RentalsContainer(props: RentalsContainer) {
  return (
    <PROFILE_CONTENT_CONTAINER className="pcc">
      <PROFILE_CONTENT_MAIN>
        {props.assets.length > 0 ? (
          props.assets.map((item: RentalData, index: number) => (
            <MoralisNFTCard
              key={index}
              item={item}
              // eslint-disable-next-line no-console
              onClick={(e: any) => console.log(e)}
            ></MoralisNFTCard>
          ))
        ) : (
          <NO_DATA>
            <h2>Nothing to see here, yet!</h2>
            <a>Head to Explore Land to see Land listed on other platforms.</a>
          </NO_DATA>
        )}
      </PROFILE_CONTENT_MAIN>
    </PROFILE_CONTENT_CONTAINER>
  );
}
