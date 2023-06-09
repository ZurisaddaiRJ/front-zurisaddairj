import { Configuration, OpenAIApi } from "openai";

class ServiceChat {

    async getChat(data) {
        const configuration = new Configuration({
            apiKey: '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',
        });
        const openai = new OpenAIApi(configuration);
        console.log(configuration);
        console.log(data.chat);
        if (!configuration.apiKey) {
            return {
                status: 500,
                error: {
                    message: "OpenAI API key not configured, please follow instructions in README.md",
                }
            };
        }

        const chat = data.chat || '';
        if (chat.trim().length === 0) {
            return {
                status: 400,
                error: {
                    message: "Please enter a valid chat",
                }
            };
        }

        try {
            const completion = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: this.generatePrompt(chat),
                temperature: 0.9,
                max_tokens: 150,
                top_p: 1,
                frequency_penalty: 0.0,
                presence_penalty: 0.6,
                stop: [" Human:", " AI:"],
            });
            return {
                status: 200,
                result: completion.data.choices[0].text
            }
        } catch (e) {
            if (e.response) {
                console.error(e.response.status, e.response.data);
                return {
                    status: e.response.data
                }
            } else {
                console.error(`Ewith OpenAI API request: ${e.response.messahe}`);

                return {
                    status: 500,
                    error: {
                        message: "An error occurred during your request.",
                    }
                }
            }
        }
    }

    generatePrompt(chat) {
        const capitalizedChat =
        chat[0].toUpperCase() + chat.slice(1).toLowerCase();
        return `The following is a conversation with an AI assistant.
        
        Human: Hello, who are you?
        AI: I am an AI created by OpenAI. How can I help you today?
        Human: I'd like to cancel my subscription.
        Human: ${capitalizedChat}
        AI: `;
    }

}

const instance = new ServiceChat();
export default instance;