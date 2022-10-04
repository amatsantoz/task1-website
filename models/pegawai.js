module.exports = (sequelize, Sequelize) => {
  const Pegawai = sequelize.define("pegawai", {
    nama: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    alamat: {
      type: Sequelize.STRING
    },
    telp: {
      type: Sequelize.STRING
    }
  });
  return Pegawai;
};