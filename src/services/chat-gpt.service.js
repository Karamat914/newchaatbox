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
