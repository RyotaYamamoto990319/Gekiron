'use strict';

const db = require('../models/');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'themes',
      [
        {
          content: "「く」で始まる時代劇でよく聞く言葉は？",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: "「し」で始まるお酒に合うおつまみは？",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: "「い」で始まる唇がセクシーな芸能人は？",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: "「か」で始まる日本の名曲は？",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
