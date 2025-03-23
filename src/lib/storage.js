"use server"
import sql from 'mssql';

const config = {
    user: 'servernodesql',
    password: 'Qqwerty933',
    server: 'databaseservernode.database.windows.net',
    database: 'databaseforNode',
    options: {
        encrypt: true, // Використовуємо шифрування для безпечного з'єднання
        trustServerCertificate: false, // Для Azure треба встановити це значення в false
    },
};

export const connectToDb = async () => {
    try {
        await sql.connect(config);
        console.log('Connected to Azure SQL Database');
    } catch (err) {
        console.error('Database connection failed:', err);
    }
};

// Приклад виконання запиту
export const getData = async () => {
    try {
        connectToDb();
        const result = await sql.query`SELECT * FROM your_table_name`;
        return result.recordset; // Повертаємо результат
    } catch (err) {
        console.error('Error executing query:', err);
    }
};
