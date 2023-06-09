import { Configuration, OpenAIApi } from "openai";

class ServiceEmoji {

  async getDaVinci(data) {
    const configuration = new Configuration({
        apiKey: "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",
      });
    const openai = new OpenAIApi(configuration);
    console.log(configuration);
    console.log(data.animal);
    if (!configuration.apiKey) {
        return {
            status:500,
            error: {
                message: "OpenAI API key not configured, please follow instructions in README.md",
            }
        };
      }
    
      const animal = data.animal || '';
      if (animal.trim().length === 0) {
        return {
            status:400,
            error: {
                message: "Please enter a valid animal",
            }
        };
      }
    
      try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: this.generatePrompt(animal),
            temperature: 0.8,
            max_tokens: 60,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
            stop: ["\n"],
        });
        return {
            status: 200,
            result: completion.data.choices[0].text
        }
      } catch(error) {
        if (error.response) {
          console.error(error.response.status, error.response.data);
          return {
            status: error.response.data
          }
        } else {
          console.error(`Error with OpenAI API request: ${error.message}`);
         return {
            status: 500,
            error: {
                message: 'An error occurred during your request.',
            }
         }
        }
      }
  }

    generatePrompt(animal) {
        const capitalizedAnimal =
        animal[0].toUpperCase() + animal.slice(1).toLowerCase();
        return `Convert books titles into emoji.
        nosotros en la luna: 💑✈🌘
        la emperatriz de volvio a casar: 👸🔁👰
        el retrato de dorian grey: 🎨🖼🤵
        Animal: ${capitalizedAnimal}
        Names:`;
    }
}

const instance = new ServiceEmoji();
export default instance;