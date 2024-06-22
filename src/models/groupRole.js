'use strict';
const { Model } = require('sequelize');
const group = require('./group');
const { ROWLOCK } = require('sequelize/lib/table-hints');
module.exports = (sequelize, DataTypes) => {
    class Group_Role extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {}
    }
    //object relation mapping
    Group_Role.init(
        {
            groupId: DataTypes.INTEGER,
            roleId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Group_Role',
        },
    );
    return Group_Role;
};
