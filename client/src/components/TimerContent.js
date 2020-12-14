import "./TimerContent.css";

const TimerContent = (time) => {
    return (
        <div className="time-wrapper">
            <div className="time">{time}</div>
        </div>
    );
};

export default TimerContent;
