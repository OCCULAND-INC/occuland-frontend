/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from '@emotion/styled';
import { FastForwardIcon, RewindIcon } from '@heroicons/react/solid';

const PAGINATION = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 10;
  background-color: white;
  color: black;
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .page-control {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    ul {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      padding: 0;
      margin: 0;
      li {
        padding: 0px 3%;
        button {
          background-color: purple;
          color: white;
          padding: 10px 0px;
          width: 50px;
          border-radius: 10px;
          font-weight: 800;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        select {
          border-radius: 10px;
          text-align: center;
          color: purple;
          border: solid purple 0.5px;
        }
      }
    }
  }
  .page-li {
    background-color: #efefef;
    width: 30px;
    border: solid 1px #ccc;
    margin: 0px 10px;
    text-align: center;
    font-weight: 700;
  }
  .pagination {
    display: flex;
    flex-direction: row;
  }
`;

export default function PaginationControl(props: {
  currPage: number;
  handlePageClick: (e: any) => void;
  nextPageClick: () => void;
  pages: any[];
  prevPageClick: () => void;
}) {
  return (
    <PAGINATION>
      <div className="page-control">
        <ul>
          <li>
            <button onClick={props.prevPageClick}>
              <RewindIcon className="h-5 w-5 mr-2" style={{ color: 'white' }} />
            </button>
          </li>
          <li>
            <select
              defaultValue={props.currPage}
              onChange={(e) => props.handlePageClick(e.target.value)}
            >
              {props.pages.map((el: any, index: any) => (
                <option key={index} value={el}>
                  {el}
                </option>
              ))}
            </select>
          </li>
          <li>
            <button onClick={props.nextPageClick}>
              <FastForwardIcon
                className="h-5 w-5 mr-2"
                style={{ color: 'white' }}
              />
            </button>
          </li>
        </ul>
      </div>
    </PAGINATION>
  );
}
