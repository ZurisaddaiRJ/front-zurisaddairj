import { useState } from "react";
import ServiceImg from "../services/service.img.davinci-003";

export default function Imgdavinci003() {
    const [descripcionInput, setDescripcionInput] = useState("");
    const [result, setResult] = useState();
    const [numberOfImages, setNumberOfImages] = useState(1)

    async function onSubmit(event) {
        event.preventDefault();
        try {
            const response = await ServiceImg.getimgDesc({ d: descripcionInput, n: numberOfImages });
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
            setDescripcionInput("");
        } catch (error) {
            // Consider implementing your own error handling logic here
            console.error(error);
            alert(error.message);
        }
    }

    return (
        <div>
            <title>OpenAI Quickstart</title>

            <main>
                <h3>IMAGES</h3>
                <form onSubmit={onSubmit}>
                    <h3>Crear Imagen</h3>
                    <input
                        type="text"
                        name="descripcion Input"
                        placeholder="Enter an description"
                        value={descripcionInput}
                        onChange={(e) => setDescripcionInput(e.target.value)}
                    />
                    <input
                        type="number"
                        name="number"
                        placeholder="Enter a number de images"
                        value={numberOfImages}
                        onChange={(e) => setNumberOfImages(e.target.value)}
                    />
                    <input type="submit" value="Generate names" />
                </form>
                <div>
                    {result && result.map((url) => (
                        <img src={url} key={url} alt="Result of the analysis" />
                    ))}
                </div>
            </main>
        </div>
    );
}