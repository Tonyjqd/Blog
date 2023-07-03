import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash} from 'react-icons/fa/index.esm';
import '../Css/publicaciones.css';

export function Publicaciones() {
    const [publicaciones, setPublicaciones] = useState([]);

    useEffect(() => {
    cargarPublicaciones();
    }, []);

    const cargarPublicaciones = async () => {
    try {
        const response = await fetch('http://localhost:3000/publicaciones');
        const data = await response.json();
        setPublicaciones(data);
    } catch (error) {
        console.error('Error al cargar las publicaciones:', error);
    }
    };

    useEffect(() => {
        cargarPublicaciones();
    }, []);
    
    const eliminarPublicacion = async (id_publicacion) => {
        const confirmacion = window.confirm("¿Estás seguro de que quieres eliminar esta publicación?");
        if (confirmacion) {
            try {
                await fetch(`http://localhost:3000/publicaciones/${id_publicacion}`, {
                method: 'DELETE',
                });
                alert('Publicación eliminada');
                cargarPublicaciones(); 
            } catch (error) {
                console.error('Error al eliminar la publicación:', error);
            }
            };
    };

    const formatearFecha = (fecha) => {
        const opcionesFecha = { day: 'numeric', month: 'long', year: 'numeric' };
        const fechaFormateada = new Date(fecha).toLocaleDateString('es-ES', opcionesFecha);
        return fechaFormateada;
    };

    return (
        <main>
            <section>
                <div className = "publicaciones-container">
                    {Array.isArray(publicaciones) && publicaciones.length > 0 ? (
                        publicaciones.map((publicacion, index) => { 
                        return (
                            <article key={index}>
                                <Link to={`/publicaciones/${publicacion.id_publicacion}`}>
                                    <img src={publicacion.imagen} alt="Imagen de la entrada" />
                                </Link>
                                <h2 className='display2 h2pub'>
                                    <Link to={`/publicaciones/${publicacion.id_publicacion}`}>
                                    {publicacion.titulo}
                                    </Link>
                                </h2>
                                <p className='fecha'>Fecha de publicación: {formatearFecha(publicacion.fecha_publicacion)}</p>
                                <p>{publicacion.contenido.slice(0, 50)}...</p>
                                <button className="eliminar" onClick={() => eliminarPublicacion(publicacion.id_publicacion)}>
                                    <FaTrash />
                                </button>
                            </article>
                        );
                        })
                    ) : (
                        <p>No hay publicaciones disponibles</p>
                    )}
                </div>
            </section>
        </main>
    );
}
