import { Configuration, OpenAIApi } from "openai";

class ServiceImg {

  async getimgDesc(data) {
    const configuration = new Configuration({
      apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);
    console.log(configuration);
    console.log(data.d);

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

    const imgDescripcion = data.d || '';
    const number = Math.floor(data.n) || 1;
    if (imgDescripcion.trim().length === 0) {
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
      const completion = await openai.createImage({
        prompt: `${data.d}`,
        n: number,
        size: "512x512",
      });
      const images = completion.data.data;
      const urls = images.map((image) => image.url);
      // res.status(200).json({ result: completion.data.choices[0].text });
      return {
        status: 200,
        result: urls
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

}

const instance = new ServiceImg();
export default instance;
