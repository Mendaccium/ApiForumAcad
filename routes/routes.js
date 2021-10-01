module.exports = (app) => {

    app.route("/user")
        .get(app.api.users.listUsers)
        .post(app.api.users.createUser)
        .delete(app.api.users.deleteUser)

    app.route("/user/:id")
        .delete(app.api.users.deleteUser)
        .get(app.api.users.getById)
        .put(app.api.users.createUser)

    app.route("/post/:id")
        .post(app.api.posts.createPost)
        .delete(app.api.posts.deletePost)
        .get(app.api.posts.getPostsByIdUser)
        .put(app.api.posts.EditPost)
}