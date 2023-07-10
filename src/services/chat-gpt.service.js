export async function chatCompletion({ messages, model }) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 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'
    },
    body: JSON.stringify({
      model: model,
      messages: messages,
    })
  })
  console.log("🚀 ~ file: chat-gpt.service.js:13 ~ chatCompletion ~ response:", response)

  if (response) {
    return await response.json()
  }


  return {
    choices: [
      {
        message: { role: 'assistant', content: 'Desculpe, tive um problema com a rede. Gostaria de tentar novamente?' }
      }
    ]
  }
}
