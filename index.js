const express = require("express");
const cors = require("cors");

const connectDB = require("./src/config/database");
const deviceRoutes = require("./src/routes/device-routes");
const authRoutes = require("./src/routes/authRoutes");
const roleRoutes = require("./src/routes/roleRoutes");
const logRoutes = require("./src/routes/logRoutes");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors({ origin: true, credentials: true }));


app.use(express.json());

connectDB();

app.use("/devices", deviceRoutes,(err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
  });

app.use("/auth", authRoutes);

app.use("/roles", roleRoutes);

app.use("/logs", logRoutes);

const port = 5001

app.listen( port, () => console.log(`Server started on port ${port}`));
