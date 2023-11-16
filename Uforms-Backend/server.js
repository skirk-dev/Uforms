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

// Ruta para autenticar usuarios
app.post('/usuario', (req, res) => {
    const { username, password } = req.body;

    const sql = `SELECT NombreCompletoNombre, NombreCompletoApellido, Rol FROM usuario WHERE Alias = ? AND Contrasena = ?`;

    db.query(sql, [username, password], (err, data) => {
        if (err) {
            console.error('Error al ejecutar la consulta SQL:', err);
            return res.status(500).json({ success: false, message: 'Error interno del servidor' });
        }
        if (data.length > 0) {
            const { NombreCompletoNombre, NombreCompletoApellido, Rol } = data[0];
            return res.status(200).json({
                success: true,
                username: username,
                nombreCompleto: `${NombreCompletoNombre} ${NombreCompletoApellido}`,
                rol: Rol,
                message: 'Login successful'
            });
        } else {
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
    });
});


app.post('/crearformulario', (req, res) => {
    const { titulo, descripcion, estado } = req.body;

    const sql = 'INSERT INTO formulario (Titulo, FechaCreacion, Descripcion, Estado) VALUES (?, NOW(), ?, ?)';

    db.query(sql, [titulo, descripcion, estado], (err, result) => {
        if (err) {
            console.error('Error al ejecutar la consulta SQL:', err);
            return res.status(500).json({ success: false, message: 'Error interno del servidor' });
        }
        const idFormulario = result.insertId;
        return res.status(200).json({ success: true, message: 'Formulario creado exitosamente' });
    });
});


app.put('/actualizarformulario/:idForm', (req, res) => {
    const { idForm } = req.params;
    const { titulo, descripcion, estado } = req.body;

    const sql = 'UPDATE formulario SET Titulo = ?, Descripcion = ?, Estado = ? WHERE ID = ?';

    db.query(sql, [titulo, descripcion, estado, idForm], (err, result) => {
        if (err) {
            console.error('Error al ejecutar la consulta SQL:', err);
            return res.status(500).json({ success: false, message: 'Error interno del servidor' });
        }

        return res.status(200).json({ success: true, message: 'Formulario actualizado exitosamente' });
    });
});

app.get('/formularios', (req, res) => {
    const sql = 'SELECT * FROM formulario';

    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al ejecutar la consulta SQL:', err);
        return res.status(500).json({ success: false, message: 'Error interno del servidor' });
      }

      return res.status(200).json({ success: true, formularios: result });
    });
  });


app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
