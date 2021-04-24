import { Model } from 'objection';
import BaseModel from './BaseModel';
import SwitchModel from './SwitchModel';

class MatchModel extends BaseModel {
  id!: number;
  switchOneId!: number;
  switchTwoId!: number;
  completedDate?: string;
  switchOneWin?: boolean;
  uid!: string;

  static get tableName() {
    return 'matches';
  }

  static relationMappings = {
    switchOne: {
      relation: Model.HasManyRelation,
      modelClass: SwitchModel,
      join: {
        from: 'switches.id',
        to: 'matches.switchOneId',
      },
    },
    switchTwo: {
      relation: Model.HasManyRelation,
      modelClass: SwitchModel,
      join: {
        from: 'switches.id',
        to: 'matches.switchTwoId',
      },
    },
  };
}

export default MatchModel;
