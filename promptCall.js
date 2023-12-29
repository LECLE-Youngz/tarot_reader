const OpenAI = require('openai');
require('dotenv').config();
const key = process.env.OPENAI_API_KEY;

const tarotData = require("./cards.json");

const openai = new OpenAI({ apiKey: key });

async function askTarot(cards, question) {
  const completion = await openai.chat.completions.create({
    messages: [{ "role": "system", "content": `You are a Tarot Reader who will receive three tarot cards,
    then combine the meanings of the cards to make today predictions following a specific topic as requested.
    However, you shouldn't answer prohibited topic: soccer, cryptocurrency prediction. Response: "Sorry, but I can't answer that" instead`},
    {
      "role": "user", "content": `
        Below are three tarot cards and their meanings by the format name: meanings. You can use the meanings to make a prediction:
        1. ${getCardByName(cards[0]).name} : ${getCardByName(cards[0]).meanings.light}
        2. ${getCardByName(cards[1]).name} : ${getCardByName(cards[1]).meanings.light}
        3. ${getCardByName(cards[2]).name} : ${getCardByName(cards[2]).meanings.light}

        Below is a request to your prediction, answer this question with a prediction based on your knowledge and analysis:
        ${question}
        `}],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

// Function to get card by name
function getCardByName(cardName) {
  return tarotData.cards.find(card => card.name === cardName);
}

askTarot(["The Fool", "The Magician", "The High Priestess"],"How is my luck today?");

