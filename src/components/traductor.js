import React, { useState } from 'react';
import Traductor from '../services/service.traductor';

function TraductorConsumidor() {
    const [traduc, setTraduc] = useState('');
    const [translation, setTranslation] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setTraduc(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (traduc.trim().length === 0) {
            setError('Please enter a valid animal');
            return;
        }

        try {
            const result = await Traductor.getTraduccion({ traduc });
            if (result.status === 200) {
                setTranslation(result.result);
                setError('');
            } else {
                setError(result.error.message);
            }
        } catch (error) {
            console.error('An error occurred:', error);
            setError('An error occurred during your request.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={traduc} onChange={handleInputChange} />
                <button type="submit">Translate</button>
            </form>
            {error && <p>Error: {error}</p>}
            {translation && <p>Translation: {translation}</p>}
        </div>
    );
}

export default TraductorConsumidor;