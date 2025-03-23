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


export async function getUsers() {
    try {
      await connectToDb();
      const result = await sql.query("SELECT * FROM users");
      console.log("succesed get")
      return result;
      
    } catch (err) {
        console.error("Помилка в get:", err.message);
    }
}

// Додавання нового користувача
export async function addUser(req) {
    try {
        console.log("fffffffffffffffffffff", req)
      const { name, email } = req;
      if (!name || !email) {
        return {
            message: "2222",
    
        };
      }

      await connectToDb();
      await sql.query`INSERT INTO users (name, email) VALUES (${name}, ${email})`;
      console.log("succesed")
    } catch (err) {
        console.error("Помилка в addUser:", err.message);

    }
}
  
  // Оновлення користувача
  export async function editUser(req) {
    try {
        console.log(req)
      const { id, name, email } = req;
      if (!id || !name || !email){
        return;
      }
      await connectToDb();
      await sql.query`UPDATE users SET name = ${name}, email = ${email} WHERE id = ${id}`;
      console.log("succesed")
    } catch (err) {
        console.error("Помилка в editUser:", err.message);
    }
  }
  
  // Видалення користувача
  export async function deleteUser(id) {
    try {
        console.log(id)
      if (!id){
        return;
      }
  
      await connectToDb();
      await sql.query`DELETE FROM users WHERE id = ${id}`;
      console.log("succesed")
    } catch (err) {
        console.error("Помилка в deleteUser:", err.message);
    }
  }
