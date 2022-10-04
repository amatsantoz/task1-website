module.exports = (sequelize, Sequelize) => {
	const Todo = sequelize.define("todo", {
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

	return Todo;
};