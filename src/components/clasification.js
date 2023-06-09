import React, { useState } from 'react';
import Clasification from '../services/service.clasification'; // Ruta al archivo del consumidor

function Clasificationcomponent() {
  const [clasf, setClasf] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setClasf(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (clasf.trim().length === 0) {
      setError('Please enter a valid animal');
      return;
    }

    try {
      const response = await Clasification.getTipo({ clasf });
      if (response.status === 200) {
        setResult(response.result);
        setError('');
      } else {
        setError(response.error.message);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setError('An error occurred during your request.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={clasf} onChange={handleInputChange} />
        <button type="submit">Get Classification</button>
      </form>
      {error && <p>Error: {error}</p>}
      {result && (
        <div>
          <p>Classification:</p>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}

export default Clasificationcomponent;
