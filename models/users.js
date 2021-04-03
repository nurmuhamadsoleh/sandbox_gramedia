"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
   
    static associate({ users, books, orders }) {
      
     users.hasMany(orders, {
        foreignKey: "user_id",
      });
    }
  }
  users.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: DataTypes.STRING },
      address: { type: DataTypes.STRING },
      phone: { type: DataTypes.STRING(12) },
      gender: { type: DataTypes.STRING(10) },
    },
    {
      sequelize,
      modelName: "users",
      timestamps: true,
      tableName: 'users',
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  );

  return users;
};

