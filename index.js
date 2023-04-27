const express = require("express");
const cors = require("cors");
const deviceRoutes = require("./src/routes/device-routes");
const connectDB = require("./src/config/database");
const authRoutes = require("./src/routes/authRoutes");
const roleRoutes = require("./src/routes/roleRoutes");



const app = express();
app.use(cors({
  origin: 'https://network-automation-d31c2.web.app'
}));

app.use(express.json());

connectDB();

app.use("/devices", deviceRoutes,(err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
  });

app.use("/auth", authRoutes);

app.use("/roles", roleRoutes);


const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
