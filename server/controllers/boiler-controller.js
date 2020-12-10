let clients = [];
let nests = [];

function eventsHandler(req, res, next) {
    const headers = {
        "Content-Type": "text/event-stream",
        Connection: "keep-alive",
        "Cache-Control": "no-cache",
    };
    res.writeHead(200, headers);
    const data = `data: ${JSON.stringify(nests)}\n\n`;
    res.write(data);
    const clientId = Date.now();
    const newClient = {
        id: clientId,
        res,
    };
    clients.push(newClient);
    req.on("close", () => {
        console.log(`${clientId} Connection closed`);
        clients = clients.filter((c) => c.id !== clientId);
    });
}

// Iterate clients list and use write res object method to send new nest
function sendEventsToAll(newNest) {
    clients.forEach((c) => c.res.write(`data: ${JSON.stringify(newNest)}\n\n`));
}
// Middleware for POST /nest endpoint
async function addNest(req, res, next) {
    console.log(nests);
    const newNest = req.body;
    nests.push(newNest);
    // Send recently added nest as POST result
    res.json(newNest);
    // Invoke iterate and send function
    return sendEventsToAll(newNest);
}

function status(req, res, next) {
    return res.json({ clients: clients.length });
}

export { addNest, eventsHandler, status };
