const { Sequelize, DataTypes } = require("sequelize")
const sequelize = new Sequelize("axxios", "root", "", {
    host: 'localhost',
    dialect: 'mysql'
})

try {
    sequelize.authenticate().then(() => {
        console.log("Connection has been established successfully");
    })
} catch (error) {
    console.log("Error" + error)
}
const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.users = require("./user")(sequelize, DataTypes)
db.posts = require("./post")(sequelize, DataTypes)
db.comments = require("./comment")(sequelize, DataTypes)
db.likes = require("./like")(sequelize, DataTypes)
db.views = require("./view")(sequelize, DataTypes)
db.sequelize.sync({ force: false }).then(() => { console.log("Resync"); })
/* ================ RELATIONSHIPS================================ */
db.users.hasMany(db.posts, {
    foreignKey: 'user_id',
    as: 'post'
})
db.posts.belongsTo(db.users, {
    foreignKey: 'user_id',
    as: 'user'
})

db.posts.hasMany(db.comments, {
    foreignKey: 'post_id',
    as: 'comment'
})
db.comments.belongsTo(db.posts, {
    foreignKey: 'post_id',
    as: 'post'
})
db.posts.hasMany(db.likes, {
    foreignKey: 'post_id',
    as: 'like'
})
db.likes.belongsTo(db.posts, {
    foreignKey: 'post_id',
    as: 'post'
})
db.posts.hasMany(db.views, {
    foreignKey: 'post_id',
    as: 'view'
})
db.views.belongsTo(db.posts, {
    foreignKey: 'post_id',
    as: 'post'
})
db.users.hasMany(db.comments, {
    foreignKey: 'user_id',
    as: 'comment'
})
db.comments.belongsTo(db.users, {
    foreignKey: 'user_id',
    as: 'user'
})
module.exports = db