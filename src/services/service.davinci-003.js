import { Configuration, OpenAIApi } from "openai";

class ServiceDavinci003 {

  async getDaVinci(data) {
    const configuration = new Configuration({
      apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);
    console.log(configuration);
    console.log(data.objeto, data.word);
    if (!configuration.apiKey) {
      /*
      res.status(500).json({
        error: {
          message: "OpenAI API key not configured, please follow instructions in README.md",
        }
      });
      */
      return {
        status: 500,
        error: {
          message: "OpenAI API key not configured, please follow instructions in README.md",
        }
      };
    }

    const objetoname = data.objeto || '';
    if (objetoname.trim().length === 0) {
      /*
      res.status(400).json({
        error: {
          message: "Please enter a valid animal",
        }
      });
      */
      return {
        status: 400,
        error: {
          message: "Please enter a valid animal",
        }
      };
    }

    const wordname = data.word || '';
    if (wordname.trim().length === 0) {
      /*
      res.status(400).json({
        error: {
          message: "Please enter a valid animal",
        }
      });
      */
      return {
        status: 400,
        error: {
          message: "Please enter a valid animal",
        }
      };
    }
    

    try {
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: this.generatePrompt(objetoname, wordname),
        temperature: 0.6,
      });
      // res.status(200).json({ result: completion.data.choices[0].text });
      return {
        status: 200,
        result: completion.data.choices[0].text
      }
    } catch (error) {
      // Consider adjusting the error handling logic for your use case
      if (error.response) {
        console.error(error.response.status, error.response.data);
        // res.status(error.response.status).json(error.response.data);
        return {
          status: error.response.data
        }
      } else {
        console.error(`Error with OpenAI API request: ${error.message}`);
        /*
        res.status(500).json({
          error: {
            message: 'An error occurred during your request.',
          }
        });
        */
        return {
          status: 500,
          error: {
            message: 'An error occurred during your request.',
          }
        }
      }
    }
  }

  generatePrompt(objetoname, wordname) {
    //const capitalizedAnimal =
      //animal[0].toUpperCase() + animal.slice(1).toLowerCase();
    return `sugiereme tres nombres acerca de "${objetoname}" y que esten relacionadas a la palabra de "${wordname}"
    el formato de la respuesta debe ser como el siguiente: "name1, name2, name3"`;
  }
}

const instance = new ServiceDavinci003();
export default instance;