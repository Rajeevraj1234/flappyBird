import "./App.css";
import { useState, useEffect } from "react";
import { styled } from "styled-components";

// All important variables

const wall_height = 750;
const wall_width = 550;
const bird_width = 85;
const bird_height = 70;
const gravity = 3;

function App() {
  const [birdPos, setBirdPos] = useState(350);
  const [isStart, setIsStart] = useState(false);

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
          }
          return settingBirdPosValue + gravity;
        });
      }, 24);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isStart]);

  const handleClickStart = () => {
    if (birdPos < 10) {
      setBirdPos(0);
      return;
    }
    setBirdPos(birdPos - 40);
    setIsStart(true);
  };
  return (
    <>
      <Main onClick={handleClickStart}>
        <Background>
          <Bird top={birdPos} />
          {!isStart && (
            <span className="absolute inset-0 left-[25%] top-[300px] z-[3] p-10 bg-black text-center font-bold h-[100px] w-[300px] text-white opacity-[90%] rounded-md">
              {" "}
              Click To Start the Game
            </span>
          )}
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

export default App;
