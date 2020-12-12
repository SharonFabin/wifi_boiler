import { useState, useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import TimerContent from "./TimerContent.js";
import { calcRemainingSeconds } from "../services/TimeConverter.js";

const timerProps = {
    isPlaying: true,
};

const DateTimer = (props) => {
    const [startTime, setStartTime] = useState(props.startTime);
    const [timerDuration, setTimerDuration] = useState(props.timerDuration);
    useEffect(() => {
        setStartTime(props.startTime);
        setTimerDuration(props.timerDuration);
    }, [props.timerDuration]);
    return (
        <CountdownCircleTimer
            {...timerProps}
            colors={[
                ["#004777", 0.33],
                ["#F7B801", 0.33],
                ["#A30000", 0.33],
            ]}
            duration={timerDuration}
            initialRemainingTime={calcRemainingSeconds(
                startTime,
                timerDuration
            )}
            onComplete={(totalElapsedTime) => []}
            key={timerDuration}
        >
            {({ remainingTime }) => TimerContent("seconds", remainingTime)}
        </CountdownCircleTimer>
    );
};

export default DateTimer;
