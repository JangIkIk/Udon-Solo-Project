import styled from "styled-components";
import { BiInfoCircle, BiStreetView, BiBeenHere } from "react-icons/bi";

const Layout = styled.div`
  display: flex;
  padding: 1rem;
  gap:10px;
  
  .group-img {
    width: 10rem;
    heigth: 10rem;
    background-color:red;
    overflow: hidden;
    border-radius: 10px;
    img {
      width: 100%;
      vertical-align: top;
    }
  }

  .group-content {
    font-size:1.1rem;
    flex: 1;
    display:flex;
    flex-direction: column;
    overflow: hidden;

    .group-map{
        display:flex;
        align-items: center;
      }

    .group-title{
        font-size: 1.2rem;
        display:flex;
        align-items: center;
        flex:1;
        
        span{
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }

    .group-info{
        display:flex;
        align-items: center;
        gap: 1rem;
    }
  }

  
`;

export const GroupList = () => {
  return (
    <Layout>
      <div className="group-img">
        <img
          src="https://mblogthumb-phinf.pstatic.net/MjAyMDA0MjhfMjAz/MDAxNTg4MDQwOTA5MjE0.i6ARBaBdi_HYODiTR0f1ma8OvblzSh01bJGL8U5gDZUg.1oPlzYogIg8H_TAk5iZvUMYOLsZkZM1ITTVrfUsIHHog.JPEG.mijung011040/20200424_192926.jpg?type=w800"
          alt="클라이밍사진"
        />
      </div>
      <div className="group-content">
        <div className="group-map">
          <span>
            <BiInfoCircle />
          </span>
          <span>{"강남구"}</span>
        </div>

        <div className="group-title">
          <span>{"[정자역] 클라이밍 초자분들 환영sssssss!"}</span>
        </div>

        <div className="group-info">
          <div>
            <span>
              <BiStreetView />
            </span>
            <span>{"85명"}</span>
          </div>

          <div>
            <span>
              <BiBeenHere />
            </span>
            <span>{"정자역 5번출구"}</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};
