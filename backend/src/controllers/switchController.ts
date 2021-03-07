import { Request, Response } from 'express';
import SwitchModel from '../models/SwitchModel';

const NUM_SWITCHES = 2;

export const addSwitch = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({
      error: 'You must provide a name and description',
    });
  }
  const newSwitch = await SwitchModel.query().insert({
    name,
    description,
  });
  return res.json({
    message: 'Switch was added successfully',
    switch: newSwitch,
  });
};

export const approveSwitch = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { isVerified } = req.body;
  await SwitchModel.query().findById(id).update({ isVerified });
  return res.json({
    message: `Verification status for switch ${id} updated successfully`,
  });
};

export const getSwitches = async (req: Request, res: Response) => {
  const switches = await SwitchModel.query();
  return res.json({ switches });
};
