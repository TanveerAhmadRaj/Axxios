module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("comment", {
        title: {
            type: DataTypes.STRING
        }
    })
    return Comment
}