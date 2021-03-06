import BaseModel from './BaseModel';

class SwitchModel extends BaseModel {
  id!: number;
  name!: string;
  description!: string;
  elo!: number;
  numMatches!: number;
  isVerified!: boolean;

  static get TableName() {
    return 'switches';
  }

  static jsonSchema = {
    type: 'object',
    required: ['name', 'description'],

    properties: {
      id: { type: 'integer' },
      name: { type: 'string', minLength: 1, maxLength: 255 },
      description: { type: 'string', minLength: 1, maxLength: 255 },
      elo: { type: 'number' },
      numMatches: { type: 'number' },
      isVerified: { type: 'boolean' },
    },
  };
}

export default SwitchModel;
