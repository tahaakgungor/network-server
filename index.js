const express = require("express");
const cors = require("cors");

const connectDB = require("./src/config/database");
const deviceRoutes = require("./src/routes/device-routes");
const authRoutes = require("./src/routes/authRoutes");
const roleRoutes = require("./src/routes/roleRoutes");
const logRoutes = require("./src/routes/logRoutes");
const snmpRoutes = require("./src/routes/snmpRoutes");
const tftpRoutes = require("./src/routes/tftpRoutes");
const session = require('express-session');
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors({ origin: true, credentials: true }));


app.use(express.json());



app.use(session({
  secret: 'mySecretKey', // bu alana güçlü bir rastgele karakter dizisi yazın
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // true ise yalnızca HTTPS bağlantıları için kullanılır
    maxAge: 24 * 60 * 60 * 1000 // cookie ömrü 24 saat
  }
}));


connectDB();

app.use("/devices", deviceRoutes,(err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
  });

app.use("/auth", authRoutes);

app.use("/roles", roleRoutes);

app.use("/logs", logRoutes);

app.use("/snmp", snmpRoutes);

app.use("/tftp", tftpRoutes);

const port = 5001

app.listen( port, () => console.log(`Server started on port ${port}`));
