module.exports = {
    mysql: {
        client: 'mysql',
        connection: {
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || 3306,
            user: process.env.DB_USERNAME || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_DATABASE || 'mascotas',
        },
        pool: {
            min: 0,
            max: 7
        },
    },
    jwt: {
        auth_key: "eyJtYXNjb3RhczIwMjMiOiJSUzI1NiIsInR5cCI6IkpXVCJ9",
        service_key: "eyJtYXNjb3RhczIwMjMiOiJSUzI1NiIsInR5cCI6IkpXVCJ9"
    },
};
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
