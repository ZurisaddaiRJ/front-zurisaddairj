import { useState } from "react";
import { useTranslation } from "react-i18next";
import ServiceDavinci003 from "../services/service.davinci-003";
import ServiceImg from "../services/service.img.davinci-003";
import ServiceChat from '../services/service.chat';
import ServiceEmoji from '../services/service.emoji';
import Traductor from '../services/service.traductor';
import Clasification from '../services/service.clasification'; // Ruta al archivo del consumidor

export default function OpenAI() {
    const { t } = useTranslation();
    const [selectedService, setSelectedService] = useState(null);
    const [descripcionInput, setDescripcionInput] = useState("");
    const [result, setResult] = useState();
    const [numberOfImages, setNumberOfImages] = useState(1)
    const [objetoInput, setObjetoInput] = useState("");
    const [wordInput, setWordInput] = useState("");
    const [chat, setChat] = useState('');
    const [response, setResponse] = useState('');

    const handleChatChange = (e) => {
        setChat(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (chat.trim().length === 0) {
            return;
        }

        try {
            const result = await ServiceChat.getChat({ chat });
            if (result.status === 200) {
                setResponse(result.result);
            } else {
                console.error(result.error);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };


    const [animal, setAnimal] = useState('');

    const handleAnimalChange = (e) => {
        setAnimal(e.target.value);
    };

    const handleSubmitEmoji = async (e) => {
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





    const [traduc, setTraduc] = useState('');
    const [translation, setTranslation] = useState('');
    const [error, setError] = useState('');

    const handleTraducChange = (e) => {
        setTraduc(e.target.value);
    };

    const handleSubmitTraduc = async (e) => {
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




    const [clasf, setClasf] = useState('');

    const handleClasfChange = (e) => {
        setClasf(e.target.value);
    };

    const handleSubmitClasf = async (e) => {
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

    async function onSubmitImage(event) {
        event.preventDefault();
        try {
            const response = await ServiceImg.getimgDesc({ d: descripcionInput, n: numberOfImages });
            const data = await response;
            console.log(response);
            if (response.status !== 200) {
                throw data.error || new Error(`Request failed with status ${response.status}`);
            }
            console.log("response", response);
            setResult(data.result);
            setDescripcionInput("");
        } catch (error) {

            console.error(error);
            alert(error.message);
        }
    }

    async function onSubmitText(event) {
        event.preventDefault();
        try {
            const response = await ServiceDavinci003.getDaVinci({ objeto: objetoInput, word: wordInput });
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
            console.error(error);
            alert(error.message);
        }
    }



    return (
        <div>
            <p>{t("¿Qué_Servicio_quieres_Ocupar?")}</p>
            
            <button className="boton-ia" onClick={() => setSelectedService("image")}>{t("Generador de imágenes")}</button>
            <button className="boton-ia" onClick={() => setSelectedService("text")}>{t("Generador de nombres")}</button>
            <button className="boton-ia" onClick={() => setSelectedService("chat")}>{t("Chat")}</button>
            <button className="boton-ia" onClick={() => setSelectedService("emoji")}>{t("Emojí")}</button>
            <button className="boton-ia" onClick={() => setSelectedService("traductor")}>{t("Traductor")}</button>
            <button className="boton-ia" onClick={() => setSelectedService("clasif")}>{t("Clasificación")}</button>



            {selectedService === "image" && (
                <div>
                    <title>OpenAI Quickstart</title>
                    <main>
                        <h3>IMAGES</h3>
                        <form onSubmit={onSubmitImage}>
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
                                <img src={url} key={url} alt="Imagen" />
                            ))}
                        </div>
                    </main>
                </div>
            )
            }

            {selectedService === "text" && (
                <div>
                    <title>OpenAI Quickstart</title>
                    <main >

                        <form onSubmit={onSubmitText}>
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
            )
            }

            {selectedService === "chat" && (
                <div>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Chat:
                            <input type="text" value={chat} onChange={handleChatChange} />
                        </label>
                        <button type="submit">Send</button>
                    </form>
                    {response && <div>{response}</div>}
                </div>
            )
            }


            {selectedService === "emoji" && (
                <div>
                    <form onSubmit={handleSubmitEmoji}>
                        <label>
                            Libro:
                            <input type="text" value={animal} onChange={handleAnimalChange} />
                        </label>
                        <button type="submit">Convert</button>
                    </form>
                    {response && <div>{response}</div>}
                </div>

            )
            }


            {selectedService === "traductor" && (
                <div>
                    <form onSubmit={handleSubmitTraduc}>
                        <input type="text" value={traduc} onChange={handleTraducChange} />
                        <button type="submit">Translate</button>
                    </form>
                    {error && <p>Error: {error}</p>}
                    {translation && <p>Translation: {translation}</p>}
                </div>
            )
            }

            {selectedService === "clasif" && (
                <div>
                <form onSubmit={handleSubmitClasf}>
                  <input type="text" value={clasf} onChange={handleClasfChange} />
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
               
            )
            }

        </div >

    )
}