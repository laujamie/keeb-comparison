const { createSwitch, findSwitchById } = require('../db/queries/switchQueries');

exports.postSwitch = async (req, res) => {
  const { name, description } = req.body;
  const switchResult = await createSwitch(name, description);
  return res.json({
    switch: switchResult,
  });
};

exports.verifySwitch = async (req, res) => {
  const { id } = req.params;
  const { verified } = req.body;
  await findSwitchById(id).update({ verified });
  return res.json({
    message: `Verification status for switch with id ${id} updated successfully`,
  });
};
