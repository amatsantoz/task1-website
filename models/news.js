module.exports = (sequelize, Sequelize) => {
  const News = sequelize.define("news", {
    judul: {
      type: Sequelize.STRING
    },
    category: {
      type: Sequelize.STRING
    },
    gambar: {
      type: Sequelize.STRING
    },
    desc: {
      type: Sequelize.STRING
    },
    createdAt: {
      type: Sequelize.DATE
    }
  }, {
    paranoid: true,
  });
  return News;
};