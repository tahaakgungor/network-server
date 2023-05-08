const Snmp = require("../models/snmp");
const dotenv = require("dotenv");
dotenv.config();
const snmp = require('snmp-native');

const snmpController = {};

snmpController.getAllSnmpInfo = async (req, res) => {
  try {
    const devices = await Snmp.find();
    console.log("devices", devices);
    const snmpDataList = [];
    const session = new snmp.Session({ host: devices[0].host, community: devices[0].community });
    const oidsUsername = [1,3,6,1,2,1,1,5,0];//username
    const oids = devices[0].oid.map((oid) => parseInt(oid));

    console.log("oidsUsername", oids);
    
    console.log("oids", oids);
    session.get({ oid: oids }, function (err, varbinds) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("varbinds", varbinds);
        snmpDataList.push({ host: devices[0].host, community: devices[0].community, oids: devices[0].oid, value: varbinds[0].value.toString() });
        console.log("snmpDataList", snmpDataList);
        res.json(snmpDataList);

      }
    });



  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


  snmpController.addSnmpInfo = async (req, res) => {
    const { host, community, oids } = req.body;
    console.log("req.body", req.body);
    const oidsToArr = oids.split(".");
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
