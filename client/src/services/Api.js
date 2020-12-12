const updateBoiler = (time) => {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ open: true, openDuration: time }),
    };
    fetch(
        "http://localhost:9000/boiler/open",
        requestOptions
    ).then((response) => response.json());
};

export { updateBoiler };
