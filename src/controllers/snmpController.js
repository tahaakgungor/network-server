const Snmp = require("../models/snmp");
const dotenv = require("dotenv");
dotenv.config();
const snmp = require('snmp-native');

const snmpController = {};

snmpController.getAllSnmpInfo = async (req, res) => {
    try {
      const devices = await Snmp.find();
      const snmpDataList = [];
  
      devices.forEach(async (device) => {
        const session = new snmp.Session({
          host: device.host,
          community: device.community,
        });
        const oid = device.oid;
        session.get({ oid }, (err, varbinds) => {
          if (err) {
            console.error(err);
          } else {
            const snmpData = {
              deviceName: device.name,
              value: varbinds[0].value,
            };
            snmpDataList.push(snmpData);
          }
          session.close();
        });
      });
  
      setTimeout(() => {
        res.json(snmpDataList);
      }, 5000);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  snmpController.addSnmpInfo = async (req, res) => {
    const { host, community, oid } = req.body;
    const device = new Snmp({ host, community, oid });
    try {
      await device.save();
      res.status(201).send(device);
    } catch (error) {
      res.status(400).send(error);
    }
  };

    module.exports = snmpController;
