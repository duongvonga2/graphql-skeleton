import { ENUM, ModelDefined, STRING } from 'sequelize';
import { postgresDb } from '../../commons/databases';
import { USER_CONSTANT } from './users.constant';
import { IUser, IUserCreate } from './users.types';
import * as bcrypt from 'bcrypt';

export const UserModel: ModelDefined<IUser, IUserCreate> = postgresDb.define(
  'users',
  {
    username: {
      type: STRING
    },
    password: {
      type: STRING
    },
    name: {
      type: STRING
    },
    status: {
      type: ENUM,
      values: Object.values(USER_CONSTANT.STATUS_DEFINED)
    }
  },
  {
    indexes:[
      {
        unique: true,
        fields: ['username']
      },
      {
        using:'HASH',
        fields: ['username']
      }
    ],
    scopes: {
      withoutPwd: {
        attributes: { exclude: ['password'] }
      }
    }
  }
);
UserModel.beforeCreate((user) => {
  const password = user.getDataValue('password');
  if (password) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    user.setDataValue('password', hashedPassword);
  }
  //   if (1) {
  //     user.setDataValue("password", bcrypt.hashSync('', 10));
  //   }
});
