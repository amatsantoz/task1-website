module.exports = (sequelize, Sequelize) => {
	const Comment = sequelize.define("comment", {
		// id: {
		// 	type: DataTypes.INTEGER,
		// 	autoIncrement: true,
		// 	primaryKey: true
		// },
		description: {
			type: Sequelize.STRING
		}
		// ,
		// created: {
		// 	type: Sequelize.DATE
		// }
	});

	return Comment;
};