const Role = require("../models/role");

const roleController = {};

roleController.getRoles = async (req, res) => {
  try {
    const roles = await Role.find().populate("devices");
    res.json(roles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


roleController.getRole = async (req, res) => {
  const roleName = req.params.name;
  try {
    const role = await Role.find({ name: roleName })
      .populate("devices")
      .populate("permissions");

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


roleController.postRoles = async (req, res) => {
  try {
    const { name, devices, permissions } = req.body;
    const newRole = new Role({
      name,
      devices,
      permissions,
    });
    const savedRole = await newRole.save();
    console.log(savedRole);
    res.json(savedRole);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


roleController.deleteRole = async (req, res) => {
  try {
    const role = await Role.findOne({ _id: req.params.id });
    console.log(role);
    if (role == null) {
      return res.status(404).json({ message: "Cannot find role" });
    }
    role.deleteOne();

    res.json({ message: "Role deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


roleController.updateRole = async (req, res) => {
  try {
    const role = await Role.findOne({ _id: req.params.id });
    console.log(role);
    if (role == null) {
      return res.status(404).json({ message: "Cannot find role" });
    }
    role.name = req.body.name;
    role.devices = req.body.devices;
    role.save();
    res.json({ message: "Role updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = roleController;
