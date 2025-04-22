const express = require("express");
const apiRoutes = require("./routes");

const { ServerConfig } = require("./config");

const app = express();

/*=== Routes ===*/
app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server : http://localhost:${ServerConfig.PORT}`);
})  
