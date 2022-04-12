import { Request, Response } from 'express';
import SwitchModel from '../models/SwitchModel';

const NUM_SWITCHES = 2;

export const addSwitch = async (req: Request, res: Response) => {
  const { name, description, type } = req.body;
  if (!name || !description) {
    return res.status(400).json({
      error: 'You must provide a name and description',
    });
  }
  const newSwitch = await SwitchModel.query().insert({
    name,
    description,
    type,
  });
  return res.json({
    message: 'Switch was added successfully',
    switch: newSwitch,
  });
};

export const approveSwitch = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { isVerified } = req.body;
  await SwitchModel.query().findById(id).patch({ isVerified });
  return res.json({
    message: `Verification status for switch ${id} updated successfully`,
  });
};

export const removeSwitch = async (req: Request, res: Response) => {
  const { id } = req.params;
  const isSuccess = await SwitchModel.query().deleteById(id);
  if (isSuccess > 0) {
    return res.json({
      message: `Switch ${id} deleted successfully`,
    });
  }
  res.status(400);
  return res.json({
    message: `Failed to delete switch ${id}`,
  });
};

export const getUnapprovedSwitches = async (req: Request, res: Response) => {
  const switches = await SwitchModel.query().where({ isVerified: 0 });
  return res.json({ switches });
};

export const getSwitches = async (req: Request, res: Response) => {
  const switches = await SwitchModel.query().where({ isVerified: 1 });
  return res.json({ switches });
};

export const getSwitch = async (req: Request, res: Response) => {
  const { id } = req.params;
  const switchRes = await SwitchModel.query().findById(id);
  if (!switchRes.isVerified) {
    return res.status(400).json({
      error: 'Switch is not verified',
    });
  }
  return res.json({ switchRes });
};
