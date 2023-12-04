const typeM = require("../../models/type.m");

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const rs = await typeM.getAll();
      // TODO: delete this later
      return res.json(rs);
    } catch (error) {
      next(error);
    }
  },
  add: async (req, res, next) => {
    try {
      const haveType = await typeM.getByName(req.body?.name);
      if (haveType.length > 0) {
        return res.status(400).json({ message: "Type already exist" });
      }
      const rs = await typeM.add(req.body);
      return res.json(rs);
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const updateType = req.body;
      updateType.typeId = req.params?.id;
      const haveType = await typeM.getById(updateType.typeId);
      if (haveType.length <= 0) {
        return res.status(400).json({ message: "Type Id invalid" });
      }
      const rs = await typeM.update(updateType);
      return res.json(rs);
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const haveType = await typeM.getById(req.params?.id);
      if (haveType.length <= 0) {
        return res.status(400).json({ message: "Type Id invalid" });
      }
      const rs = await typeM.delete(req.params.id);
      return res.json(rs);
    } catch (error) {
      next(error);
    }
  },
};
