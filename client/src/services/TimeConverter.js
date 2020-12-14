const minuteSeconds = 60;
const hourSeconds = 3600;
const getTimeSeconds = (time) => (minuteSeconds - time / 1000) | 0;
const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const timeToSeconds = (time) => {
    if (time != null && time.length === 8) {
        try {
            let hours = parseInt(time.substring(0, 2), 10);
            let minutes = parseInt(time.substring(3, 5), 10);
            let seconds = parseInt(time.substring(6), 10);
            return hours * 60 * 60 + minutes * 60 + seconds;
        } catch (e) {
            return 0;
        }
    }
    return 0;
};
const secondsToDate = (seconds) => {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
};
const calcRemainingSeconds = (start, duration) => {
    const timePast = Date.now() - start;
    const remainingTime = duration - (timePast > 0 ? timePast : 0) / 1000;
    return remainingTime > 0 ? remainingTime : 0;
};

export {
    getTimeSeconds,
    getTimeMinutes,
    timeToSeconds,
    secondsToDate,
    calcRemainingSeconds,
};
