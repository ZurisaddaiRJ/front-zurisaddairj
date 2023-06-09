import React, { useState } from 'react';
import ServiceEmoji from '../services/service.emoji';

function EmojiComponent() {
  const [animal, setAnimal] = useState('');
  const [response, setResponse] = useState('');

  const handleAnimalChange = (e) => {
    setAnimal(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (animal.trim().length === 0) {
      return;
    }

    try {
      const result = await ServiceEmoji.getDaVinci({ animal });
      if (result.status === 200) {
        setResponse(result.result);
      } else {
        console.error(result.error);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Libro:
          <input type="text" value={animal} onChange={handleAnimalChange} />
        </label>
        <button type="submit">Convert</button>
      </form>
      {response && <div>{response}</div>}
    </div>
  );
}

export default EmojiComponent;