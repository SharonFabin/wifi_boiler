//volumea[Liter], temperature[C]
const AVERAGE_ELEMENTAL_RATING_KW = 3.5;

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

export { hoursToHeat, AVERAGE_ELEMENTAL_RATING_KW };
