import "./App.css";
import { useState, useEffect } from "react";
import { styled } from "styled-components";

// All important variables

const wall_height = 750;
const wall_width = 550;
const bird_width = 85;
const bird_height = 70;
const gravity = 3;
const obj_speed = 3;

function App() {
  const [birdPos, setBirdPos] = useState(350);
  const [isStart, setIsStart] = useState(false);
  const [objHeight, setObjHeight] = useState(300);
  const [objHeight2, setObjHeight2] = useState(200);
  const [obj_move, setObj_move] = useState(0);
  const [userScore, setUserScore] = useState(0);

  //Handle Gravity PULL
  useEffect(() => {
    //the "birdpos" value will be the initial valur through out in setInterval and setBirdPos coz when useEffect is
    // initialized same value will remain consistant through out on "settingBirdPosValue" will get the new value of "birdpos"

    if (isStart) {
      let intervalId = setInterval(() => {
        setBirdPos((settingBirdPosValue) => {
          if (settingBirdPosValue > wall_height - bird_height) {
            clearInterval(intervalId);
            setIsStart(false);
            setBirdPos(350);
            setObj_move(0);
          }
          return settingBirdPosValue + gravity;
        });
      }, 24);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isStart]);

  useEffect(() => {
    let intervalId;
    if (isStart) {
      intervalId = setInterval(() => {
        setObj_move((objMove) => {
          if (objMove > wall_width + 100) {
            setObjHeight(() => {
              let randomValue = Math.floor(Math.random() * (400 - 100) + 100);
              setObjHeight(randomValue);
              if (randomValue > 400) {
                randomValue = Math.floor(Math.random() * (160 - 100) + 100);
                setObjHeight2(randomValue);
              } else if (randomValue < 160) {
                randomValue = Math.floor(Math.random() * (450 - 400) + 400);
                setObjHeight2(randomValue);
              } else {
                randomValue = Math.floor(Math.random() * (350 - 100) + 100);
                setObjHeight2(randomValue);
              }
            });
            setObj_move(0);
          }
          return objMove + obj_speed;
        });
      }, 20);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [isStart]);

  const handleClickStart = () => {
    if (birdPos < 10) {
      setBirdPos(0);
      return;
    }
    setBirdPos(birdPos - 40);
    setIsStart(true);
  };

  useEffect(() => {
    if (isStart) {
      if (obj_move === 348 && birdPos < objHeight) {
        setBirdPos(350);
        setObj_move(0);
      } else if (obj_move === 348 && birdPos > 750 - objHeight) {
        setBirdPos(350);
        setObj_move(0);
      }
    }
  }, [obj_move, birdPos, objHeight, isStart]);

  return (
    <>
      <Main onClick={handleClickStart}>
        <Background>
          <h1>Score: {userScore}</h1>
          <Bird top={birdPos} />
          {!isStart && (
            <span className="absolute inset-0 left-[25%] top-[300px] z-[3] p-10 bg-black text-center font-bold h-[100px] w-[300px] text-white opacity-[90%] rounded-md">
              {" "}
              Click To Start the Game
            </span>
          )}
          <Object1 height={objHeight} obj_move={obj_move} />
          <Object2 height={objHeight2} obj_move={obj_move} />
        </Background>
      </Main>
    </>
  );
}

const Main = styled.div`
  height: 850px;
  width: 1900px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Background = styled.div`
  border: 1px solid black;
  width: ${wall_width}px;
  height: ${wall_height}px;
  background: url("/images/background-day.png");
  background-repeat: no-repeat;
  background-position: bottom center;
  background-size: cover;
  position: relative;
  overflow: hidden;
`;

const Bird = styled.span`
  width: ${bird_width}px;
  height: ${bird_height}px;
  background: url("https://img.itch.zone/aW1nLzc5OTg3OTQuZ2lm/original/85XVDm.gif");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  position: absolute;
  inset: 0;
  z-index: 2;
  top: ${(prop) => prop.top}px;
  left: 150px;
`;

const Object1 = styled.div`
  width: 100px;

  height: ${(props) => props.height}px;
  background: url("/images/pipe-green.png");
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;
  position: absolute;
  left: calc(${wall_width}px - ${(props) => props.obj_move}px);
  bottom: 0;
`;

const Object2 = styled.div`
  width: 100px;
  height: ${(props) => props.height}px;

  background: url("/images/pipe-green.png");
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;
  position: absolute;
  left: calc(${wall_width}px - ${(props) => props.obj_move}px);
  top: 0;
  transform: rotate(180deg);
`;

export default App;
