const express = require('express');
const server = express();
const cors = require('cors');
const port = 3000;
const fs = require('fs');
const multer = require('multer');
const extname = require('path').extname;
const path = require('path');
server.use(express.json());
server.use(cors({
    allowedHeaders: '*'
}));
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'blog'
});

const upload = multer({ 
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '../Frontend/blog/public/imagenes'), 
        filename: (req, file, cb) => {
            const fileExtension = extname(file.originalname);
            cb(null, `${file.fieldname}-${Date.now()}${fileExtension}`);
        }
    })
});

server.use('/imagenes', express.static(path.join(__dirname, '../Frontend/blog/public/imagenes')));

server.get('/publicaciones', (req, res) => {
    const query = 'SELECT * FROM posts ORDER BY fecha_publicacion DESC, id_publicacion DESC';
    connection.query(query, (err, results) => {
    if (err) {
        console.error('Error al obtener las publicaciones:', err);
        res.status(500).json({ error: 'Error al obtener las publicaciones' });
    } else {
        res.json(results);
    }
    });
});

server.get('/publicaciones/:id_publicacion', (req, res) => {
    const id_publicacion = req.params.id_publicacion;
    const query = 'SELECT * FROM posts WHERE id_publicacion = ?'; 
    connection.query(query, [id_publicacion], (err, results) => {
        if (err) {
            console.error('Error al obtener la publicación:', err);
            res.status(500).json({ error: 'Error al obtener la publicación' });
        } else {
            if (results.length > 0) {
                console.log('Publicación obtenida:', results[0]);
                res.json(results[0]);
            } else {
                res.status(404).json({ error: 'No se encontró la publicación' });
            }
        }
    });
});

server.post('/publicaciones/:id_publicacion', upload.single('imagen'), (req, res) => {
    const id_publicacion = req.params.id_publicacion;
    const nuevaImagen = req.file; 
    const { titulo, contenido } = req.body;

    const updateFields = [];
    const updateValues = [];

    if (nuevaImagen) {
        const obtenerRutaImagenAnteriorQuery = 'SELECT imagen FROM posts WHERE id_publicacion = ?';
        connection.query(obtenerRutaImagenAnteriorQuery, [id_publicacion], (err, results) => {
            if (err) {
                console.error('Error al obtener la ruta de la imagen anterior:', err);
                res.status(500).json({ error: 'Error al obtener la ruta de la imagen anterior' });
            } else {
                if (results.length > 0) {
                    const rutaImagenAnterior = results[0].imagen;
                    const imagenPath = path.join(__dirname, '../Frontend/blog/public', rutaImagenAnterior);

                    fs.unlink(imagenPath, (unlinkErr) => {
                        if (unlinkErr) {
                            console.error('Error al eliminar la imagen anterior:', unlinkErr);
                            res.status(500).json({ error: 'Error al eliminar la imagen anterior' });
                        } else {
                            const nuevaRutaImagen = '/imagenes/' + req.file.filename;
                            updateFields.push('imagen = ?');
                            updateValues.push(nuevaRutaImagen);

                            if (titulo) {
                                updateFields.push('titulo = ?');
                                updateValues.push(titulo);
                            }
                            if (contenido) {
                                updateFields.push('contenido = ?');
                                updateValues.push(contenido);
                            }

                            const query = 'UPDATE posts SET ' + updateFields.join(', ') + ' WHERE id_publicacion = ?';
                            updateValues.push(id_publicacion);

                            connection.query(query, updateValues, (updateErr, updateResults) => {
                                if (updateErr) {
                                    console.error('Error al actualizar la publicación:', updateErr);
                                    res.status(500).json({ error: 'Error al actualizar la publicación' });
                                } else {
                                    res.status(200).json({ mensaje: 'Publicación actualizada exitosamente' });
                                }
                            });
                        }
                    });
                } else {
                    res.status(404).json({ error: 'No se encontró la publicación' });
                }
            }
        });
    } else {
        if (titulo) {
            updateFields.push('titulo = ?');
            updateValues.push(titulo);
        }
        if (contenido) {
            updateFields.push('contenido = ?');
            updateValues.push(contenido);
        }

        if (updateFields.length > 0) {
            const query = 'UPDATE posts SET ' + updateFields.join(', ') + ' WHERE id_publicacion = ?';
            updateValues.push(id_publicacion);

            connection.query(query, updateValues, (updateErr, updateResults) => {
                if (updateErr) {
                    console.error('Error al actualizar la publicación:', updateErr);
                    res.status(500).json({ error: 'Error al actualizar la publicación' });
                } else {
                    res.status(200).json({ mensaje: 'Publicación actualizada exitosamente' });
                }
            });
        } else {
            res.status(200).json({ mensaje: 'No se han proporcionado cambios para actualizar' });
        }
    }
});



server.post('/entrada', upload.single('imagen'), (req, res) => {
    
    const { title, content } = req.body;
    const image = '/imagenes/' + req.file.filename; 

    const query = 'INSERT INTO posts (titulo, contenido, imagen) VALUES (?, ?, ?)';
    connection.query(query, [title, content, image], (err) => {
    if (err) {
        console.error('Error al insertar la entrada en la base de datos:', err);
        res.sendStatus(500);
    } else {
        console.log('Entrada insertada correctamente');
        res.sendStatus(201);
    }
    });
});

server.delete('/publicaciones/:id_publicacion', (req, res) => {
    const id_publicacion = req.params.id_publicacion;
    const getImagenQuery = 'SELECT imagen FROM posts WHERE id_publicacion = ?';
    connection.query(getImagenQuery, [id_publicacion], (err, results) => {
        if (err) {
        console.error('Error al obtener la imagen de la publicación:', err);
        res.status(500).json({ error: 'Error al obtener la imagen de la publicación' });
        } else {
        if (results.length > 0) {
            const imagenPath = path.join(__dirname, '../Frontend/blog/public', results[0].imagen);

            fs.unlink(imagenPath, (unlinkErr) => {
            if (unlinkErr) {
                console.error('Error al eliminar la imagen:', unlinkErr);
                res.status(500).json({ error: 'Error al eliminar la imagen' });
            } else {
                const deleteQuery = 'DELETE FROM posts WHERE id_publicacion = ?';
                connection.query(deleteQuery, [id_publicacion], (deleteErr) => {
                if (deleteErr) {
                    console.error('Error al eliminar la publicación de la base de datos:', deleteErr);
                    res.status(500).json({ error: 'Error al eliminar la publicación de la base de datos' });
                } else {
                    console.log('Publicación eliminada correctamente');
                    res.sendStatus(200);
                }
                });
            }
            });
        } else {
            res.status(404).json({ error: 'No se encontró la publicación' });
        }
        }
    });
});


server.listen(port, () => console.log('Servidor iniciado en el puerto 3000'));