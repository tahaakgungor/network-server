const Snmp = require("../models/snmp");
const dotenv = require("dotenv");
dotenv.config();
const snmp = require('snmp-native');

const snmpController = {};

snmpController.getAllSnmpInfo = async (req, res) => {
    try {
      const devices = await Snmp.find();
      const snmpDataList = [];
        console.log("devices", devices);
      devices.forEach(async (device) => {
        const session = new snmp.Session({
          host: device.host,
          community: device.community,
          port: 5002
        });
        const oids = device.oid;
        console.log("oisd", device);
        session.get({ oids }, (err, varbinds) => {
          if (err) {
            console.error(err);
          } else {
            console.log(varbinds);
            const snmpData = {
              deviceName: device.name,
                deviceIp: device.host,
                deviceType: device.device_type,
        
                
            };
            snmpDataList.push(snmpData);
            console.log("snmpDataList", snmpDataList);
          }
          console.log(session)
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
    const { host, community, oids } = req.body;
    console.log("req.body", req.body);
    const device = new Snmp({ host, community, oids });
    try {
      await device.save();
      res.status(201).send(device);
    } catch (error) {
      res.status(400).send(error);
    }
  };

    module.exports = snmpController;
