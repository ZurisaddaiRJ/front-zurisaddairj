import { useState } from "react";
import ServiceDavinci003 from "../services/service.davinci-003";


export default function Textdavinci003() {
  const [objetoInput, setObjetoInput] = useState("");
  const [wordInput, setWordInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await ServiceDavinci003.getDaVinci({ objeto: objetoInput, word: wordInput });
      /*const response = await fetch("/text-davinci-003/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: animalInput }),
      });*/

      const data = await response;
      console.log(response);
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      console.log("response", response);
      setResult(data.result);
      setObjetoInput("");
      setWordInput("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <title>OpenAI Quickstart</title>
      <link rel="icon" href="/dog.png" />

      <main >

        <form onSubmit={onSubmit}>
          <h3>Tipo de Objeto</h3>
          <input
            type="text"
            name="objeto"
            placeholder="Enter an objeto"
            value={objetoInput}
            onChange={(e) => setObjetoInput(e.target.value)}
          />
          <h3>Palabra relacionada</h3>
          <input
            type="text"
            name="word"
            placeholder="Enter an word"
            value={wordInput}
            onChange={(e) => setWordInput(e.target.value)}
          />
          <input type="submit" value="Generate names" />
        </form>
        <div>{result}</div>
      </main>
    </div>
  );
}