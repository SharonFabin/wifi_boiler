//volumea[Liter], temperature[C]
const thermalPower = (volume, startTemperature, desiredTemperature) => {
    return (4.2 * volume * (desiredTemperature - startTemperature)) / 3600;
};

//thermalPower, elementRating[kW]
const timeToHeat = (thermalPower, elementRating) => {
    return thermalPower / elementRating;
};

const hoursToHeat = (
    volume,
    startTemperature,
    desiredTemperature,
    elementRating
) => {
    return timeToHeat(
        thermalPower(volume, startTemperature, desiredTemperature),
        elementRating
    );
};

export { hoursToHeat };
