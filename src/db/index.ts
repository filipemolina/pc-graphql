const databaseConfig = {
  client: 'mssql',
  connection: {
    host: 'localhost',
    port: 1433,
    user: 'sa',
    password: '1Password',
    database: 'app.dev.ca',
    trustServerCertificate: true,
  },
};

const cacheTTL = 20; // time in seconds

export { databaseConfig, cacheTTL };
