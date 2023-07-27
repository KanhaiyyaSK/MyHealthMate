import { Button, Toast } from "react-bootstrap";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { AiFillDownCircle, AiFillFire } from "react-icons/ai";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { BiHappy, BiSad } from "react-icons/bi";
import LoadingCircle from "./SkeletonLoaders/LoadingCircle";

const Streaks = ({ setShowAlreadyAddedToast, setShowStreakAddedToast }) => {
  const { user } = useAuthContext();
  const [streakNumber, setStreakNumber] = useState(0);
  const [day, setDay] = useState(0);

  useEffect(() => {
    handleFetchStreak();
  }, []);

  const handleFetchStreak = async () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:4000/api/streaks",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data.currentStreak);
        setStreakNumber(response.data.currentStreak);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleIncrementStreak = async (e) => {
    e.preventDefault();
  
    if (day === 1) {
      alert('Streak already incremented for today.');
      return; // Return early if streak is already incremented for the day.
    }
  
    setStreakNumber(streakNumber + 1);
    setShowStreakAddedToast(true);
    setDay(1);
  };
  
  const fireStyle =
    streakNumber !== 0
      ? {
          color: "red",
        }
      : { color: "grey" };

 
  // }

  return (
    <div className="dash-component d-flex flex-column justify-content-between align-items-center ">
      <legend align="center">Streak</legend>
      <div
        style={{ fontSize: "3rem" }}
        className="d-flex justify-content-center align-items-center"
      >
        <AiFillFire style={fireStyle} />
        <span style={fireStyle}>{streakNumber}</span>
      </div>

      <Button
        variant="info"
        onClick={(e) => handleIncrementStreak(e)}
        style={{ color: "white" }}
      >
        I took all my medicines today! <BiHappy />
      </Button>
    </div>
  );
};
export default Streaks;
