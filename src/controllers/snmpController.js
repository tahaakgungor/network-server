const Snmp = require("../models/snmp");
const SnmpInfos = require("../models/snmpInfos");
const dotenv = require("dotenv");
dotenv.config();
const snmp = require('snmp-native');

const snmpController = {};

snmpController.getAllSnmpRegisters = async (req, res) => {
  try {
    const info = await Snmp.find();

    res.json(info);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


snmpController.deleteSnmpReg = async (req, res) => {
  try {
    await Snmp.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted SNMP register" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


snmpController.updateSnmpRegister = async (req, res) => {
  const { host, community, oid } = req.body;
  let oidsToArr;
  if (oid.split(",").length > 1) {
    oidsToArr = oid.split(",");

  } else {
    oidsToArr = oid.split(".");
  }
  try {
    const updatedRegister = await Snmp.findByIdAndUpdate(req.body._id, {
      host: host,
      community: community,
      oid: oidsToArr,
    });
    res.json(updatedRegister);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


snmpController.getSelectedSnmpInfo = async (req, res) => {
  try {
    const selectedIds = req.body.ids;

    const devices = await Snmp.find({ _id: { $in: selectedIds } });

    const snmpDataList = [];
    console.log("devices", devices);

    let completedRequests = 0; // Keep track of completed requests

    for (const device of devices) {
      const session = new snmp.Session({ host: device.host, community: device.community });
      const oids = device.oid.map((oid) => parseInt(oid));

      session.get({ oid: oids }, function (err, varbinds) {
        if (err) {
          console.log("Error", err);
        } else {
          const snmpData = {
            host: device.host,
            community: device.community,
            oids: device.oid,
            value: varbinds[0].value.toString(),
          };

          snmpDataList.push(snmpData);
          console.log("Retrieved SNMP data for device:", device.host);
        }

        completedRequests++; // Increase the completed requests count

        if (completedRequests === devices.length) {
          for (const snmpData of snmpDataList) {
            const snmpInfos = new SnmpInfos({
              host: snmpData.host,
              community: snmpData.community,
              oids: snmpData.oids,
              value: snmpData.value,
            });

            snmpInfos.save()
              .then(() => {
                console.log("snmpInfos saved to database");
              })
              .catch((error) => {
                console.error("Failed to save snmpInfos to database:", error);
              });
          }
          res.json(snmpDataList);
        }
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


snmpController.getAllSnmpInfos = async (req, res) => {
  try {
    const snmpInfos = await SnmpInfos.find();
    res.json(snmpInfos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


snmpController.deleteSnmpInfo = async (req, res) => {
  try {
    console.log("req.params.id", req.params.id);
    await SnmpInfos.findByIdAndDelete(req.params.id);
    res.json({ message: "Snmp info deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


snmpController.addSnmpInfo = async (req, res) => {
  const { host, community, oids } = req.body;
  console.log("req.body", req.body);
  if (oids.split(",").length > 1) {
    var oidsToArr = oids.split(",");
  } else {
    var oidsToArr = oids.split(".");
  }
  console.log("oidsToArr", oidsToArr);
  const device = new Snmp({
    host: host,
    community: community,
    oid: oidsToArr,
  });
  console.log("device", device);
  try {
    await device.save();
    res.status(201).send(device);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = snmpController;
