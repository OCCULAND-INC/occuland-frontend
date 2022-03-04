import styled from '@emotion/styled';
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable sort-keys */
/* eslint-disable no-console */
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

import { Platforms } from '~/assets/platforms/Plaforms';
import LoadingSm from '~/components/global/Loading/LoadingSm';

import { LOADING_STATE } from '../loading.types';

const expData = [
  {
    pictures: [
      'https://www.notion.so/image/https%3A%2F%2Fmedia.discordapp.net%2Fattachments%2F501774580000751636%2F907879045339942912%2Fsunrise_2.png?table=block&id=1e393eeb-da2a-4d50-899b-6d87e194981a&spaceId=f5d0b777-d56b-47b8-97b4-c9482dc59fa7&width=600&userId=ae7b2a42-1879-4450-bbf4-8f70d65769ac&cache=v2',
      'https://www.notion.so/image/https%3A%2F%2Fmedia.discordapp.net%2Fattachments%2F501774580000751636%2F907879096158130226%2Fsunrise_game_room_2.png?table=block&id=1e393eeb-da2a-4d50-899b-6d87e194981a&spaceId=f5d0b777-d56b-47b8-97b4-c9482dc59fa7&width=600&userId=ae7b2a42-1879-4450-bbf4-8f70d65769ac&cache=v2',
      'https://www.notion.so/image/https%3A%2F%2Fmedia.discordapp.net%2Fattachments%2F501774580000751636%2F907879117754605628%2Fsunrise_game_room.png?table=block&id=1e393eeb-da2a-4d50-899b-6d87e194981a&spaceId=f5d0b777-d56b-47b8-97b4-c9482dc59fa7&width=600&userId=ae7b2a42-1879-4450-bbf4-8f70d65769ac&cache=v2',
    ],
    name: 'The Sound Lab',
    description:
      'The Sound Lab is where you take friends to chill and relax. Sit back and enjoy the sounds waves beaming from wall to wall to tinkle your eardrums. Watch movies with your friends. Enjoy your metaverse experience.',
    buy_price: '1 ETH',
    rent_fee: '$20.00',
    platform: 'Decentraland',
    address: '0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d',
  },
  {
    pictures: [
      'https://www.notion.so/image/https%3A%2F%2Fmedia.discordapp.net%2Fattachments%2F501774580000751636%2F907879045339942912%2Fsunrise_2.png?table=block&id=1e393eeb-da2a-4d50-899b-6d87e194981a&spaceId=f5d0b777-d56b-47b8-97b4-c9482dc59fa7&width=600&userId=ae7b2a42-1879-4450-bbf4-8f70d65769ac&cache=v2',
      'https://www.notion.so/image/https%3A%2F%2Fmedia.discordapp.net%2Fattachments%2F501774580000751636%2F907879096158130226%2Fsunrise_game_room_2.png?table=block&id=1e393eeb-da2a-4d50-899b-6d87e194981a&spaceId=f5d0b777-d56b-47b8-97b4-c9482dc59fa7&width=600&userId=ae7b2a42-1879-4450-bbf4-8f70d65769ac&cache=v2',
      'https://www.notion.so/image/https%3A%2F%2Fmedia.discordapp.net%2Fattachments%2F501774580000751636%2F907879117754605628%2Fsunrise_game_room.png?table=block&id=1e393eeb-da2a-4d50-899b-6d87e194981a&spaceId=f5d0b777-d56b-47b8-97b4-c9482dc59fa7&width=600&userId=ae7b2a42-1879-4450-bbf4-8f70d65769ac&cache=v2',
    ],
    name: 'The Sound Lab',
    description:
      'The Sound Lab is where you take friends to chill and relax. Sit back and enjoy the sounds waves beaming from wall to wall to tinkle your eardrums. Watch movies with your friends. Enjoy your metaverse experience.',
    buy_price: '1 ETH',
    rent_fee: '$20.00',
    platform: 'Somnium Spaces',
    address: '0x913ae503153d9A335398D0785Ba60A2d63dDB4e2',
  },
  {
    pictures: [
      'https://www.notion.so/image/https%3A%2F%2Fmedia.discordapp.net%2Fattachments%2F501774580000751636%2F907879045339942912%2Fsunrise_2.png?table=block&id=1e393eeb-da2a-4d50-899b-6d87e194981a&spaceId=f5d0b777-d56b-47b8-97b4-c9482dc59fa7&width=600&userId=ae7b2a42-1879-4450-bbf4-8f70d65769ac&cache=v2',
      'https://www.notion.so/image/https%3A%2F%2Fmedia.discordapp.net%2Fattachments%2F501774580000751636%2F907879096158130226%2Fsunrise_game_room_2.png?table=block&id=1e393eeb-da2a-4d50-899b-6d87e194981a&spaceId=f5d0b777-d56b-47b8-97b4-c9482dc59fa7&width=600&userId=ae7b2a42-1879-4450-bbf4-8f70d65769ac&cache=v2',
      'https://www.notion.so/image/https%3A%2F%2Fmedia.discordapp.net%2Fattachments%2F501774580000751636%2F907879117754605628%2Fsunrise_game_room.png?table=block&id=1e393eeb-da2a-4d50-899b-6d87e194981a&spaceId=f5d0b777-d56b-47b8-97b4-c9482dc59fa7&width=600&userId=ae7b2a42-1879-4450-bbf4-8f70d65769ac&cache=v2',
    ],
    name: 'The Sound Lab',
    description:
      'The Sound Lab is where you take friends to chill and relax. Sit back and enjoy the sounds waves beaming from wall to wall to tinkle your eardrums. Watch movies with your friends. Enjoy your metaverse experience.',
    buy_price: '1 ETH',
    rent_fee: '$20.00',
    platform: 'Cryptovoxels',
    address: '0x79986aF15539de2db9A5086382daEdA917A9CF0C',
  },
  {
    pictures: [
      'https://www.notion.so/image/https%3A%2F%2Fmedia.discordapp.net%2Fattachments%2F501774580000751636%2F907879045339942912%2Fsunrise_2.png?table=block&id=1e393eeb-da2a-4d50-899b-6d87e194981a&spaceId=f5d0b777-d56b-47b8-97b4-c9482dc59fa7&width=600&userId=ae7b2a42-1879-4450-bbf4-8f70d65769ac&cache=v2',
      'https://www.notion.so/image/https%3A%2F%2Fmedia.discordapp.net%2Fattachments%2F501774580000751636%2F907879096158130226%2Fsunrise_game_room_2.png?table=block&id=1e393eeb-da2a-4d50-899b-6d87e194981a&spaceId=f5d0b777-d56b-47b8-97b4-c9482dc59fa7&width=600&userId=ae7b2a42-1879-4450-bbf4-8f70d65769ac&cache=v2',
      'https://www.notion.so/image/https%3A%2F%2Fmedia.discordapp.net%2Fattachments%2F501774580000751636%2F907879117754605628%2Fsunrise_game_room.png?table=block&id=1e393eeb-da2a-4d50-899b-6d87e194981a&spaceId=f5d0b777-d56b-47b8-97b4-c9482dc59fa7&width=600&userId=ae7b2a42-1879-4450-bbf4-8f70d65769ac&cache=v2',
    ],
    name: 'The Sound Lab',
    description:
      'The Sound Lab is where you take friends to chill and relax. Sit back and enjoy the sounds waves beaming from wall to wall to tinkle your eardrums. Watch movies with your friends. Enjoy your metaverse experience.',
    buy_price: '1 ETH',
    rent_fee: '$20.00',
    platform: 'The Sandbox',
    address: '0x50f5474724e0Ee42D9a4e711ccFB275809Fd6d4a',
  },
  {
    pictures: [
      'https://www.notion.so/image/https%3A%2F%2Fmedia.discordapp.net%2Fattachments%2F501774580000751636%2F907879045339942912%2Fsunrise_2.png?table=block&id=1e393eeb-da2a-4d50-899b-6d87e194981a&spaceId=f5d0b777-d56b-47b8-97b4-c9482dc59fa7&width=600&userId=ae7b2a42-1879-4450-bbf4-8f70d65769ac&cache=v2',
      'https://www.notion.so/image/https%3A%2F%2Fmedia.discordapp.net%2Fattachments%2F501774580000751636%2F907879096158130226%2Fsunrise_game_room_2.png?table=block&id=1e393eeb-da2a-4d50-899b-6d87e194981a&spaceId=f5d0b777-d56b-47b8-97b4-c9482dc59fa7&width=600&userId=ae7b2a42-1879-4450-bbf4-8f70d65769ac&cache=v2',
      'https://www.notion.so/image/https%3A%2F%2Fmedia.discordapp.net%2Fattachments%2F501774580000751636%2F907879117754605628%2Fsunrise_game_room.png?table=block&id=1e393eeb-da2a-4d50-899b-6d87e194981a&spaceId=f5d0b777-d56b-47b8-97b4-c9482dc59fa7&width=600&userId=ae7b2a42-1879-4450-bbf4-8f70d65769ac&cache=v2',
    ],
    name: 'The Sound Lab',
    description:
      'The Sound Lab is where you take friends to chill and relax. Sit back and enjoy the sounds waves beaming from wall to wall to tinkle your eardrums. Watch movies with your friends. Enjoy your metaverse experience.',
    buy_price: '1 ETH',
    rent_fee: '$20.00',
    platform: 'Decentraland',
    address: '0x913ae503153d9A335398D0785Ba60A2d63dDB4e2',
  },
  {
    pictures: [
      'https://www.notion.so/image/https%3A%2F%2Fmedia.discordapp.net%2Fattachments%2F501774580000751636%2F907879045339942912%2Fsunrise_2.png?table=block&id=1e393eeb-da2a-4d50-899b-6d87e194981a&spaceId=f5d0b777-d56b-47b8-97b4-c9482dc59fa7&width=600&userId=ae7b2a42-1879-4450-bbf4-8f70d65769ac&cache=v2',
      'https://www.notion.so/image/https%3A%2F%2Fmedia.discordapp.net%2Fattachments%2F501774580000751636%2F907879096158130226%2Fsunrise_game_room_2.png?table=block&id=1e393eeb-da2a-4d50-899b-6d87e194981a&spaceId=f5d0b777-d56b-47b8-97b4-c9482dc59fa7&width=600&userId=ae7b2a42-1879-4450-bbf4-8f70d65769ac&cache=v2',
      'https://www.notion.so/image/https%3A%2F%2Fmedia.discordapp.net%2Fattachments%2F501774580000751636%2F907879117754605628%2Fsunrise_game_room.png?table=block&id=1e393eeb-da2a-4d50-899b-6d87e194981a&spaceId=f5d0b777-d56b-47b8-97b4-c9482dc59fa7&width=600&userId=ae7b2a42-1879-4450-bbf4-8f70d65769ac&cache=v2',
    ],
    name: 'The Sound Lab',
    description:
      'The Sound Lab is where you take friends to chill and relax. Sit back and enjoy the sounds waves beaming from wall to wall to tinkle your eardrums. Watch movies with your friends. Enjoy your metaverse experience.',
    buy_price: '1 ETH',
    rent_fee: '$20.00',
    platform: 'Decentraland',
    address: '0x913ae503153d9A335398D0785Ba60A2d63dDB4e2',
  },
];
const supabase = createClient(
  'https://gjlbvpaiezrovocjokmk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqbGJ2cGFpZXpyb3ZvY2pva21rIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDQzMzM4NTUsImV4cCI6MTk1OTkwOTg1NX0.Er7P__CL1qse_GnYZu7nl9nV2OSsPFVVv7nGo7AYNbw',
);

const EXP_CONTAINER = styled.div`
  overflow: scroll;
  margin: 70px 0px;
  height: 100%;
  width: 100vw;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-column: center;
  padding-bottom: 100px;
  ${'@media (max-width: 1180px)'} {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: none;
    height: 100%;
  }
`;
const CONTAINER = styled.div`
  height: 100vh;
  position: relative;
  boxsizing: border-box;
  backgroundcolor: white;
  display: flex;
  ${'@media (max-width: 601px)'} {
    width: 100vw;
  }
`;
const getItems = async (cb: (e: any) => void) => {
  const { data, error } = await supabase.from('experiences').select('*');
  console.log(data);
  if (error) {
    console.log(error);
  }
  cb(data);
};

export default function ExperiencesContainer() {
  const [loading, setLoading] = useState<LOADING_STATE>(LOADING_STATE.INIT);
  const [experiences, setExperiences] = useState<any[]>(expData);

  useEffect(() => {
    getItems(setExperiences);
  }, []);
  useEffect(() => {
    if (experiences.length > 0) {
      setTimeout(() => setLoading(LOADING_STATE.OFF), 3000);
    }
  }, [experiences]);
  return (
    <CONTAINER>
      <EXP_CONTAINER>
        {experiences.map((el: any, index: number) => {
          return <ExperienceElement data={el} key={index} />;
        })}
      </EXP_CONTAINER>
      {loading == LOADING_STATE.INIT ? <LoadingSm /> : null}
    </CONTAINER>
  );
}

const EXP_ELEMENT = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 0px 8px 1px #141414;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: solid 0.5px #141414;
  max-width: calc(min(600px, 48%));
  max-height: 500px;
  border-radius: 70px;
  border-top-right-radius: 25px;
  border-bottom-left-radius: 25px;
  ${'@media (max-width: 601px)'} {
    width: 95%;
    max-height: 600px;
  }
  ${'@media (max-width: 1100px)'} {
    max-width: 100%;
  }
  margin: 10px;
  .exp-el-header {
    border-bottom: solid;
    text-align: center;
    font-size: 30px;
    font-weight: 600;
  }
  .exp-el-main {
    display: flex;
    flex-direction: row;
    .col-images {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 200px;
      img {
        padding: 5px;
        height: 120px;
        width: 120px;
      }
    }
    .col-desc {
      border: solid 0.5px #ccc;
      border-radius: 10px;
      margin: 10px;
      padding: 10px 30px;
      display: flex;
      flex-direction: column;
      width: 100%;
      ${'@media (max-width: 601px)'} {
        padding: 10px 10px;
      }
      .desc {
        font-size: 20px;
        height: 100%;
        ${'@media (max-width: 601px)'} {
          font-size: 100%;
        }
      }
      .footer {
        .price {
          text-align: center;
          font-size: 20px;
          font-weight: 800;
          border-top: solid 0.5px #ccc;
          border-bottom: solid 0.5px #ccc;
        }
        .platform {
          padding: 5px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          img {
            height: 30px;
            border-radius: 100%;
          }
          label {
            height: 100%;
            padding: 0px 10px;
            font-size: 100%;
            font-weight: 600;
          }
        }
      }
    }
  }
`;

function ExperienceElement(props: any) {
  const plt = Platforms.filter((el: any) => {
    return el.address == props.data.exp_plat_address;
  })[0];
  if (!plt) {
    return <div>loading . . .</div>;
  }
  return (
    <EXP_ELEMENT>
      <div className="exp-el-header">
        <h3>{props.data.exp_name}</h3>
      </div>
      <div className="exp-el-main">
        <div className="col-images">
          {props.data.exp_preview.map((pic: string, index: number) => (
            <img src={pic} key={index} />
          ))}
        </div>
        <div className="col-desc">
          <div className="desc">{props.data.exp_desc}</div>
          <div className="footer">
            <div className="price">Buy Now: {props.data.exp_price}</div>
            <div className="platform">
              <img src={plt.img} />
              <label>{plt.name}</label>
            </div>
          </div>
        </div>
      </div>
    </EXP_ELEMENT>
  );
}
