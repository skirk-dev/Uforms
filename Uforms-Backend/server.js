const express = require('express');
const mysql2 = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Akame.Jpg',
    database: 'uforms'
});

app.post('/usuario', (req, res) => {
    const { username, password } = req.body;

    const sql = `SELECT NombreCompletoNombre, NombreCompletoApellido, Rol FROM usuario WHERE Alias = ? AND Contrasena = ?`;

    db.query(sql, [username, password], (err, data) => {
        if (err) return res.json(err);
        if (data.length > 0) {
            const { NombreCompletoNombre, NombreCompletoApellido, Rol } = data[0];
            return res.json({
                success: true,
                username: username,
                nombreCompleto: `${NombreCompletoNombre} ${NombreCompletoApellido}`,
                rol: Rol,
                message: 'Login successful'
            });
        } else {
            return res.json({ success: false, message: 'Invalid username or password' });
        }
    });
});



app.listen(4000, () => {
    console.log('Server is running on port 4000');
});

