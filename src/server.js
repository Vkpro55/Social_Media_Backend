const express = require("express");
const cors = require('cors');
const apiRoutes = require("./routes");

const { ServerConfig } = require("./config");

const app = express();

/*== Parse incomong resquest */
app.use(express.json());

/*== Handle cross-origin request ==*/
const corsOptions = {
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PATCH"],
    credentials: true
}
app.use(cors(corsOptions));

/*=== Routes ===*/
app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server : http://localhost:${ServerConfig.PORT}`);
});