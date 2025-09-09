import React, { useState, useEffect } from 'react';
import Asciidoctor from 'asciidoctor';
import './styles/AdocEditer.css';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const asciidoctor = Asciidoctor();

const AsciiDocEditor = () => {
    const navigate = useNavigate();
    const [passwordDocument, setPasswordDocument] = useState('');
    const [adocContent, setAdocContent] = useState('');
    const [htmlContent, setHtmlContent] = useState('');

    // 1️⃣ Traer documento desde Firebase
    useEffect(() => {
        const fetchInitialDoc = async () => {
            try {
                const docRef = doc(db, "san-antonio-blog", "san-antonio-blog");
                const docSnap = await getDoc(docRef);

                if (!docSnap.exists()) {
                    throw new Error("Documento no encontrado");
                }

                const data = docSnap.data();
                setAdocContent(data.documento || '');
                setPasswordDocument(data.password || '');
            } catch (error) {
                console.error("Error al traer documento:", error);
            }
        };
        fetchInitialDoc();
    }, []);

    // 2️⃣ Convertir AsciiDoc a HTML para vista previa
    useEffect(() => {
        setHtmlContent(asciidoctor.convert(adocContent));
    }, [adocContent]);

    const handleChange = (e) => setAdocContent(e.target.value);

    // 3️⃣ Guardar cambios si la contraseña es correcta
    const handleSave = async () => {
        const password = prompt('Ingrese la contraseña para guardar:');
        if (password !== passwordDocument) {
            alert('Contraseña incorrecta ❌');
            return;
        }

        try {
            const docRef = doc(db, "san-antonio-blog", "san-antonio-blog");
            await updateDoc(docRef, { documento: adocContent });
            alert('Documento guardado ✅');
        } catch (err) {
            console.error('Error guardando documento:', err);
            alert('Error al guardar ❌');
        }
    };

    return (
        <div className="adoc-container editor-container">
            <textarea
                className="adoc-editor"
                value={adocContent}
                onChange={handleChange}
            />
            <div
                className="adoc-preview"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
            <button style={{ color: '#000' }} onClick={handleSave} className="save-button">Guardar Cambios</button>
            <button onClick={() => navigate('../render/doc.adoc')} className="back-button">
                Volver a blog
            </button>
        </div>
    );
};

export default AsciiDocEditor;
