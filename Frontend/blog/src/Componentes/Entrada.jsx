import '../Css/entrada.css';
import React, { useState, useRef } from 'react';

export function Entrada() {
const [image, setImage] = useState(null);
const [title, setTitle] = useState('');
const [content, setContent] = useState('');
const inputFileRef = useRef(null);
const [errorMessages, setErrorMessages] = useState({
    image: '',
    title: '',
    content: '',
});

const handleImageChange = (e) => {
    setImage(e.target.files[0]);
};

const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;
    const newErrorMessages = {
    image: '',
    title: '',
    content: '',
    };

    if (!image) {
    newErrorMessages.image = 'Por favor, adjunta una imagen.';
    isValid = false;
    }
    if (!title) {
    newErrorMessages.title = 'Por favor, introduce un título.';
    isValid = false;
    }
    if (!content) {
    newErrorMessages.content = 'Por favor, introduce el contenido.';
    isValid = false;
    }

    setErrorMessages(newErrorMessages);

    if (isValid) {
        const formData = new FormData();
        formData.append('imagen', image);
        formData.append('title', title);
        formData.append('content', content);

        try {
            const response = await fetch('http://localhost:3000/entrada', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                alert('Entrada guardada con éxito');
                setImage(null);
                setTitle('');
                setContent('');
                inputFileRef.current.value = '';
            } else {
                throw new Error('Error al guardar la entrada');
            }
            } catch (error) {
            console.error('Error al enviar la solicitud:', error);
            console.error('Error al guardar la entrada');
        }
    };
}

    

return (
    <form className="entrada-form">
    <div className="form-group">
        <label htmlFor="image">Adjuntar imagen:</label>
        <input
            type="file"
            ref={inputFileRef}
            className="form-control-file"
            id="image"
            onChange={handleImageChange}
        />
        {errorMessages.image && (
            <p className="error-message">{errorMessages.image}</p>
        )}
    </div>

    <div className="form-group">
        <label htmlFor="title">Título de la entrada:</label>
        <input
            placeholder='Escribe un título para la entrada'
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
        />
        {errorMessages.title && (
            <p className="error-message">{errorMessages.title}</p>
        )}
    </div>

    <div className="form-group">
        <label htmlFor="content">Contenido de la entrada:</label>
        <textarea
            placeholder='¿Qué te inspira hoy?'
            className="form-control"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
        />
        {errorMessages.content && (
            <p className="error-message">{errorMessages.content}</p>
        )}
    </div>
        <button onClick={handleSubmit} id= "aceptar" type="button" className="btn btn-primary">
            Guardar
        </button>
    </form>
);
}

