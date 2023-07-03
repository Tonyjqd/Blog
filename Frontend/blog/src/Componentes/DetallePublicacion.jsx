import 'bootstrap/dist/css/bootstrap.min.css';
import '../Css/detallePublicacion.css';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa/index.esm';
import { Header } from '../Componentes/Header';

export function DetallePublicacion() {
const { id_publicacion } = useParams();
const [publicacion, setPublicacion] = useState(null);
const [modoEdicion, setModoEdicion] = useState(false);
const [imagenEditada, setImagenEditada] = useState('');
const [tituloEditado, setTituloEditado] = useState('');
const [contenidoEditado, setContenidoEditado] = useState('');
const navigate = useNavigate();
const inputFileRef = useRef(null);

const cargarPublicacion = useCallback(async () => {
    try {
        const response = await fetch(`http://localhost:3000/publicaciones/${id_publicacion}`);
        const data = await response.json();
        const { imagen, titulo, fecha_publicacion, contenido } = data;
        setPublicacion({ imagen, titulo, fecha_publicacion, contenido });
    } catch (error) {
    console.error('Error al cargar la publicación:', error);
    }
}, [id_publicacion]);

useEffect(() => {
    cargarPublicacion();
}, [cargarPublicacion]);

const editarPublicacion = () => {
    setModoEdicion(true);
    setImagenEditada(publicacion.imagen);
    setTituloEditado(publicacion.titulo);
    setContenidoEditado(publicacion.contenido);
};

const guardarCambios = async () => {
    const formData = new FormData();

    if (imagenEditada && imagenEditada !== publicacion.imagen) {
    formData.append('imagen', imagenEditada);
    }

    if (tituloEditado && tituloEditado !== publicacion.titulo) {
    formData.append('titulo', tituloEditado);
    }

    if (contenidoEditado && contenidoEditado !== publicacion.contenido) {
    formData.append('contenido', contenidoEditado);
    }

    if (formData.has('imagen') || formData.has('titulo') || formData.has('contenido')) {
        try {
            const response = await fetch(`http://localhost:3000/publicaciones/${id_publicacion}`, {
            method: 'POST',
            body: formData,
            });

            if (response.ok) {
            const data = await response.json();
            setPublicacion(data);
            setModoEdicion(false);
            } else {
            throw new Error('Error al guardar los cambios en la publicación');
            }
        } catch (error) {
            console.error('Error al guardar los cambios en la publicación:', error);
        }
        } else {
        setModoEdicion(false);
        }
    cargarPublicacion()
};

const borrarPublicacion = async () => {
    const confirmacion = window.confirm("¿Estás seguro de que quieres eliminar esta publicación?");
    if (confirmacion) {
    try {
        const response = await fetch(`http://localhost:3000/publicaciones/${id_publicacion}`, {
        method: 'DELETE',
        });

        if (response.ok) {
        navigate('/');
        } else {
        throw new Error('Error al borrar la publicación');
        }
    } catch (error) {
        console.error('Error al borrar la publicación:', error);
    }
    };
};

if (!publicacion) {
    return <p>Cargando...</p>;
}

const formatearFecha = (fecha) => {
    const opcionesFecha = { day: 'numeric', month: 'long', year: 'numeric' };
    const fechaFormateada = new Date(fecha).toLocaleDateString('es-ES', opcionesFecha);
    return fechaFormateada;
};

return (

    <div className="container">
        <Header/>
        <img src={publicacion.imagen} alt="Imagen de la entrada" />
        <h1>{publicacion.titulo}</h1>
        <p id="fecha">Fecha de publicación: {formatearFecha(publicacion.fecha_publicacion)}</p>

        {modoEdicion ? (
            <div className="formulario-edicion">

                <div className="form-group">
                    <label htmlFor="imagen"><strong>Imagen</strong></label>
                    <input
                    type="file"
                    ref={inputFileRef}
                    className="form-control-file"
                    id="imagen"
                    onChange={(e) => setImagenEditada(e.target.files[0])}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="titulo"><strong>Título:</strong></label>
                    <input
                    type="text"
                    className="form-control"
                    id="titulo"
                    value={tituloEditado}
                    onChange={(e) => setTituloEditado(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="contenido"><strong>Contenido:</strong></label>
                    <textarea
                    className="form-control"
                    id="contenido"
                    value={contenidoEditado}
                    onChange={(e) => setContenidoEditado(e.target.value)}
                    />
                </div>

                <div className="buttons-container">
                    <button className="btn btn-success" onClick={guardarCambios}><FaSave /> Guardar</button>
                    <button className="btn btn-secondary" onClick={() => setModoEdicion(false)}><FaTimes /> Cancelar</button>
                </div>
            </div>
        ) : (
            <div className="visualizacion-section">
            <p>{publicacion.contenido}</p>
            <div>
                <button className="btn btn-primary" onClick={editarPublicacion}><FaEdit /> Editar</button>
                <button className="btn btn-danger" onClick={borrarPublicacion}><FaTrash /> Eliminar</button>
            </div>
            </div>
        )}
        </div>
    );
}

