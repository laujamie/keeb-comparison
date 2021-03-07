import { Model } from 'objection';
import BaseModel from './BaseModel';
import SwitchModel from './SwitchModel';

class MatchModel extends BaseModel {
  id!: number;
  switchOneId!: number;
  switchTwoId!: number;
  completedDate?: string;
  uid!: string;

  static get tableName() {
    return 'matches';
  }

  static relationMappings = {
    switchOneId: {
      relation: Model.HasManyRelation,
      modelClass: SwitchModel,
      join: {
        from: 'switches.id',
        to: 'matches.switchOneId',
      },
    },
    switchTwoId: {
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
