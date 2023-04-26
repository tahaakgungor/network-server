const Device = require("../models/device");
// const { NodeSSH } = require("node-ssh");

const { Client } = require("ssh2");
const conn = new Client();

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server,{
//   cors: {
//       origin: "http://localhost:3000"
//   }
// });

// const ssh = new NodeSSH();
const connections = {};
const results = [];

const getSelectedDevices = async (req, res) => {
  try {
    console.log("SELECTED:",req.params.id);
    const selectedDevices = await Device.find({
      _id: { $in: req.params.id }
    });
    res.json(selectedDevices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



const getAllDevices = async (req, res) => {
  try {
    const devices = await Device.find();
    res.json(devices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

async function getDevice(req, res, next) {
  console.log(req.params);
  let device;
  try {
    device = await Device.findOne({ _id: req.params.id });

    if (device == null) {
      return res.status(404).json({ message: "Cannot find device" });
    }
    res.status(200).send(device);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  } finally {
    return res.status(404)
  }

}

const createDevice = async (req, res) => {
  const device = new Device(req.body);
  try {
    await device.save();
    res.status(201).send(device);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateDevice = async (req, res) => {
  console.log("updateDevice", req.body);
  let device;
  try {
    device = await Device.findOne({ _id: req.params.id });
    console.log("device", device);

    if (device == null) {
      return res.status(404).json({ message: "Cannot find device" });
    }
    res.status(200);
    res.device = device;
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  
  if (req.body.name != null) {  
    res.device.name = req.body.name;
  }
  if (req.body.ip != null) {
    res.device.ip = req.body.ip;
  }
  if (req.body.username != null) {
    res.device.username = req.body.username;
  }
  if (req.body.password != null) {
    res.device.password = req.body.password;
  }
  if (req.body.host != null) {
    res.device.host = req.body.host;
  }
  if (req.body.device_type != null) {
    res.device.device_type = req.body.device_type;
  }
  if (req.body.secret != null) {
    res.device.secret = req.body.secret;
  }
  try {
    
    const updatedDevice = await res.device.save();
    console.log("updatedDevice", updatedDevice);
    return res.json(updatedDevice);
    
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const deleteDevice = async (req, res) => {
  try {
    const device = await Device.findOne({ _id: req.params.id });
    if (!device) {
      return res.status(404).json({ error: "Device not found" });
    }
    await device.deleteOne();
    res.json({ message: "Device deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Connect devices
// const connectDevices = async (req, res) => {
//   try {
//     const bodi = req.body;
//     const devices = req.body.device;
//     console.log("connectDevices", bodi);
//     let command = req.body.command;
//     if (!command) {
//       command = "enable";
//     }

//     console.log("connectDevices", command);

//     const deviceList = await Device.find({ _id: { $in: devices } });

//     let responseSent = false; // flag to keep track of whether a response has been sent

//     console.log("DEV:", deviceList[0].ip);

//     let conn = connections[deviceList[0]._id];

//     // check if the connection exists in the connections object
//     if (!conn) {
//       console.log("Creating new connection");
//       // if the connection does not exist, create a new connection and add it to the connections object
//       conn = new Client();
//       connections[deviceList[0]._id] = conn;
//       conn.connect({
//         host: deviceList[0].ip,
//         port: 22,
//         username: deviceList[0].username,
//         password: deviceList[0].password,
//         algorithms: {
//           kex: ["diffie-hellman-group1-sha1", "diffie-hellman-group14-sha1"],
//           cipher: ["aes128-cbc", "3des-cbc"],
//           hmac: ["hmac-sha1", "hmac-md5"],
//           serverHostKey: ["ssh-rsa", "ssh-dss"],
//         },
//       });

//       conn.on("ready", function () {
//         console.log("Client :: ready");

//         // listen to incoming commands from the client
//         // io.on("connection", function (socket) {
//         //   console.log("A user connected");
//         //   socket.on("command", function (data) {
//         //     console.log("Received command: " + data);
//         //     handleCommand(conn, data);
//         //   });
//         //   socket.on("disconnect", function () {
//         //     console.log("A user disconnected");
//         //     conn.end();
//         //   });
//         // });

//         handleCommand(conn, command);
//       });
//     } else {
//       console.log("Connection already exists");

//       handleCommand(conn, command);
//     }

//     res.json({ message: "Connected" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// function handleCommand(conn, command) {
//   conn.exec(command, function (err, stream) {
//     if (err) throw err;
//     stream
//       .on("close", function (code, signal) {
//         console.log("Stream :: close :: code: " + code + ", signal: " + signal);
//         // conn.end();
//       })
//       .on("data", function (data) {
//         console.log("STDOUT: " + data);
//         // io.emit("message", data);
//       })
//       .stderr.on("data", function (data) {
//         console.log("STDERR: " + data);
//       });
//   });
// }


    




// console.log("connections");
// // Send command
// const sendCommand = async (req, res) => {
//   try {
//     const deviceId = req.body.device;
//     const command = req.body.command;

//     const conn = connections[deviceId];


//     if (!conn) {
//       res.status(404).json({ error: "Device not connected" });
//       return;
//     }
   
//     conn.exec(command, (err, stream) => {
//       console.log(stream);
//       console.log(command)
//       if (err) {
//         res.status(500).json({ error: "Server error" });
//         throw err;
//       }


//       let dataToSend = "";

//       stream.on("data", (data) => {
//         dataToSend += data;
//       });

//       stream.on("close", (code, signal) => {
//         console.log(
//           "Stream :: close :: code: " + code + ", signal: " + signal
//         );

//         res.json({ output: dataToSend });
//       });

//       stream.stderr.on("data", (data) => {
//         console.log("STDERR: " + data);
//         res.status(500).json({ error: "Server error" });
//       });
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error" });
//   }
// };


// server.listen(3001, () => {
//   console.log('socket listening on *:3001');
// });


module.exports = {
  getSelectedDevices,
  getAllDevices,
  getDevice,
  createDevice,
  updateDevice,
  deleteDevice,
  // connectDevices,
  // sendCommand,
};
