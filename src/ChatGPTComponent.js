import React, { useState } from 'react';

const ChatGPTComponent = () => {
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState('');

    const fetchGPTResponse = async () => {
        setIsLoading(true)
        try {
            const result = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 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' // Substitua YOUR_API_KEY pela sua chave de API
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'user', content: `me de apenas o nome do produto mais indicado a partir da seguinte frase em uma palavra: '${inputText}'` }],
                    temperature: 0.7
                })
            });

            const data = await result.json();

            // Verifica se data.choices existe e possui pelo menos um elemento
            if (data.choices && data.choices.length > 0) {
                setResponse(data.choices[0].message.content);
                window.location.href = `https://www.magazineluiza.com.br/busca/${data.choices[0].message.content}`
            } else {
                console.error('Resposta inesperada da API:', data);
                setResponse('Houve um erro ao obter a resposta da API.');
            }

        } catch (error) {
            console.error('Houve um erro ao fazer a chamada de API:', error);
            setResponse('Houve um erro ao fazer a chamada de API.');
        }
    };

    let styleSheet = document.styleSheets[0];

    let keyframes = `@keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }`

    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

    return (
        <>
            {isLoading && <div
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    /* From https://css.glass */
                    background: 'rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(4px)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignContent: 'center',
                    justifyContent: 'center',

                }}
            >
                <div style={{
                    flex: 1,
                    color: 'white',
                    padding: '32px',
                    lineHeight: '28px',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'end',
                    justifyContent: 'center',
                }}>
                    <div style={{
                        border: '16px solid #f3f3f3', /* Light grey */
                        borderTop: '16px solid #7D2FE0', /* purple */
                        borderRadius: '50%',
                        width: '100px',
                        height: '100px',
                        animation: 'spin 2s linear infinite',

                    }}></div>
                </div>
                <div
                    style={{
                        flex: 1,
                        color: 'white',
                        padding: '32px',
                        fontSize: '20px',
                        lineHeight: '32px',
                        textAlign: 'center',
                        fontWeight: '800'
                    }}>

                    No momento, estamos aproveitando o poder do Aprendizado de Máquina e do Processamento de Linguagem Natural para oferecer resultados precisos e relevantes...
                </div>
            </div >}
            <div style={{
                height: '100vh',
                width: '100vw',
                background: 'radial-gradient(99.45% 99.45% at 50% 0.55%, #3D3AA7 0%, #24226C 0.01%, #240F5F 26.04%, #000000 100%)',
            }}>
                <div style={{
                    width: '100%',
                    background: 'rgba(217, 217, 217, 0.18)',
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                    <p style={{
                        fontFamily: 'Montagu Slab',
                        fontStyle: 'normal',
                        fontWeight: '700',
                        fontSize: '24px',
                        lineHeight: '31px',
                        margin: '10px 10px',
                        color: '#7D2FE0',
                        textShadow: '4px 4px 4px rgba(0, 0, 0, 0.25)'
                    }}>TP</p>
                    <div style={{ width: '10px' }}></div>
                    <p style={{
                        fontFamily: 'Montagu Slab',
                        fontStyle: 'normal',
                        fontWeight: '700',
                        fontSize: '24px',
                        lineHeight: '31px',
                        margin: '10px 10px',
                        color: '#FFFFFF',
                        textShadow: '4px 4px 4px rgba(0, 0, 0, 0.25)'
                    }}>TaylorPicks</p>
                </div>
                <div>
                    <div
                        style={{
                            fontFamily: 'Montagu Slab',
                            fontStyle: 'normal',
                            fontWeight: '700',
                            fontSize: '24px',
                            lineHeight: '31px',
                            textAlign: 'center',

                            color: '#7D2FE0',

                            textShadow: '4px 4px 4px rgba(0, 0, 0, 0.25)',

                            padding: '32px'
                        }}
                    >
                        Encontre o produto ideal para sua ocasião conosco!
                    </div>
                    <div style={{
                        fontFamily: 'Lato',
                        fontStyle: 'normal',
                        fontWeight: '300',
                        fontSize: '12px',
                        lineHeight: '18px',
                        textAlign: 'center',

                        color: '#FFFFFF',

                        textShadow: '4px 4px 4px rgba(0, 0, 0, 0.25)',

                        padding: '0 32px 32px 32px'
                    }}>
                        Utilizando Aprendizado de Máquina e Processamento de Linguagem Natural, asseguraremos que o produto perfeito seja recomendado especificamente para você
                    </div>
                </div>
                <div style={{
                    padding: '12px',
                }}>
                    <div style={{
                        fontFamily: 'Lato',
                        fontStyle: 'normal',
                        fontWeight: '700',
                        fontSize: '12px',
                        lineHeight: '14px',
                        color: '#FFFFFF',
                        paddingBottom: '6px'
                    }}>O que procura?</div>
                    <textarea
                        style={{
                            backgroundColor: '#000000',
                            color: '#ffffff',
                            fontFamily: 'Lato',
                            fontStyle: 'normal',
                            fontSize: '12px',
                            lineHeight: '14px',
                            width: '100%',
                            marginBottom: '12px',
                            borderRadius: '10px',
                        }}
                        rows={4}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Digite seu texto aqui..."
                    ></textarea>
                    <button
                        style={{
                            padding: '8px',
                            fontFamily: 'Lato',
                            fontStyle: 'normal',
                            fontSize: '12px',
                            width: '100%',
                            height: '46px',
                            borderRadius: '10px',
                            background: '#5214A1',
                            color: '#fff'
                        }}
                        onClick={fetchGPTResponse}>PROCESSAR</button>
                </div>
            </div></>
    );
};

export default ChatGPTComponent;
