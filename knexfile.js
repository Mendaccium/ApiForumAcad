module.exports = {
    client: "postgres",
    connection: {
        host : '127.0.0.1',
        port : 5432,
        database: "apinodeSD",
        user: "postgres",
        password: "docker",
    
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        tableName: "knex_migrations"
    }
}