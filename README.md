# AI Study Assistant

A command-line study assistant powered by the Google Gemini API. Ask it to explain any topic, and get clear, concise explanations right in your terminal.

## Features

- Explain any concept or topic on demand
- Persistent conversation memory within a session (Day 2)
- Clean CLI interface via Node.js readline

## Project Structure

```
.
├── src/
│   ├── config/
│   │   └── gemini.js        # Gemini model singleton
│   ├── services/
│   │   └── aiService.js     # explainTopic() and core AI logic
│   └── index.js             # CLI entry point (readline)
├── .env                     # API key (not committed)
├── .env.example             # Template for environment setup
├── package.json
└── README.md
```

## Prerequisites

- Node.js v18+
- A [Google AI Studio](https://aistudio.google.com/) account and API key

## Setup

1. **Clone the repo**

   ```bash
   git clone https://github.com/argha0079/ai-study-assistant.git
   cd ai-study-assistant
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure your API key**

   ```bash
   cp .env.example .env
   ```

   Then edit `.env` and add your key:

   ```
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Run the assistant**

   ```bash
   node src/index.js
   ```

## Usage

Once running, type any topic or question at the prompt:

```
You: Explain recursion
Assistant: Recursion is a technique where a function calls itself...

You: Give me a JavaScript example
Assistant: Here's a classic recursive example...

You: /clear
Conversation cleared.

You: /exit
```

### Commands

| Command  | Description                        |
|----------|------------------------------------|
| `/clear` | Clear conversation history         |
| `/exit`  | Quit the assistant                 |

## Environment Variables

| Variable         | Description              |
|------------------|--------------------------|
| `GEMINI_API_KEY` | Your Google Gemini API key |


## Tech Stack

- **Runtime:** Node.js (ES6 modules)
- **AI:** Google Gemini API (`@google/generative-ai`)
- **Config:** dotenv

## License

MIT