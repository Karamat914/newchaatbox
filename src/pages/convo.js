import React, { useRef, useState } from "react";
import SendIcon from "../components/icons/send";
import OpenIcon from "../components/icons/open";
import Button from "../components/button";
import TextInput from "../components/text-input";
import ChatBubble from "../components/chat-bubble";
import Avatar from "../components/avatar";
import { chatCompletion } from "../services/chat-gpt.service";
import AppBar from "../components/app-bar";
import { Swiper, SwiperSlide } from 'swiper/react';

// import {
//   Navigation,
//   Pagination,
//   Mousewheel,
//   Keyboard,
//   EffectCoverflow,
// } from "swiper/modules";
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


import pic2 from "../assects/pic2.webp";
import pic3 from "../assects/pic3.webp";
import pic4 from "../assects/pic4.webp";


export default function Convo() {
  const model = "gpt-3.5-turbo";
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "system",
      content:
        "Você é uma assistente virtual chamada Lu. A Lu uma mulher de 30 anos, conectada, de um e-commerce chamado Magalu. Você responderá a clientes da Magalu que buscam produtos que existam neste e-commerce. Os clientes buscam especificamente produtos, portanto você não deve recomendar serviços. Primeiro, você deve se apresentar, e logo após, você responderá num formato de lista com 3 items numa linguagem acessível, intuitiva, que assemelhasse a Lu.",
    },
  ]);
  const [thinking, setThinking] = useState(false);
  const [productPreview, setProductPreview] = useState([]);
  const bottomRef = useRef();
  const watchImages = [
    {
      image: pic4,
      name: "",
    },
    {
      image: pic3,
      name: "",
    },
    {
      image: pic2,
      name: "",
    },
  ];
  const updatedWatchImages = watchImages.map((item, index) => {
    if (index < productPreview.length) {
      return {
        ...item,
        name: productPreview[index],
      };
    }
    return item;
  });
  async function handleSendMessage() {
    if (!currentMessage || currentMessage.length === 0) {
      return;
    }

    const newMessages = [
      ...messages,
      { role: "user", content: currentMessage },
    ];
    setMessages(newMessages);
    setThinking(true);
    setCurrentMessage("");
    setProductPreview([]);

    console.log("request");

    const response = await chatCompletion({
      messages: newMessages,
      model: model,
    });
    console.log(
      "🚀 ~ file: convo.js:41 ~ handleSendMessage ~ response:",
      response
    );

    console.log(response);

    setMessages([...newMessages, response.choices[0].message]);

    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    const products = await chatCompletion({
      messages: [
        ...newMessages,
        response.choices[0].message,
        {
          role: "system",
          content:
            "Agora você é apenas uma IA cujo único objetivo é resumir em uma simple lista os produtos que você mencionou, que deve respeitar exatamente as instruções a seguir, e não deve personificar nenhum personagem. Não se desculpe nem acrescente contextos extras na sua próxima mensagem. Não use desculpas. Não dê exemplos de produtos. Use apenas o que já foi dito anteriormente. Execute a tarefa seguindo precisamente o que foi pedido.",
        },
        {
          role: "user",
          content: `Resuma a lista de produtos da sua última mensagem de sugestão em APENAS os nomes para serem usados numa busca no Magalu no seguinte formato, sem adicionar nada antes:

        1. produto 1
        2. produto 2
        3. produto 3`,
        },
      ],
      model: model,
    });
    console.log(
      "🚀 ~ file: convo.js:67 ~ handleSendMessage ~ products:",
      products
    );

    // console.log(products);

    const productList = products.choices[0].message.content
      .split(/\n?\d\.\s?/)
      .filter((s) => !!s)
      .slice(-3);
    console.log(
      "🚀 ~ file: convo.js:70 ~ handleSendMessage ~ productList:",
      productList
    );
    console.log(productList);

    setProductPreview(productList);
    setThinking(false);

    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  return (
    <div className="h-screen w-screen">
      <AppBar />
      <div className="p-2 pb-20">
        <p className="text-gray-300 text-xs text-center italic">
          Aqui é o início da sua conversa com a Lu.
        </p>
        {messages.length <= 1 && (
          <div className="p-2 rounded-xl text-gray-600 bg-gray-200 text-center mt-2 italic drop-shadow-lg">
            Dica: Escreva abaixo para a Lu o que você procura, e utilizando
            Processamento de Linguagem Natural e Aprendizado de Máquina, ela irá
            buscar o produto perfeito para sua ocasião.
          </div>
        )}
        {messages
          .filter((m) => !["system", "function"].includes(m.role))
          .map((m, i) => (
            <div
              key={"message-" + i}
              className={
                "flex flex-row py-1 items-end " +
                (m.role === "user" ? "flex-row-reverse" : "")
              }
            >
              <Avatar
                initial={m.role === "user" ? "U" : "L"}
                src={m.role === "user" ? null : "/lu-profile.jpg"}
              />
              <div className="w-2" />
              <ChatBubble
                content={m.content}
                className=""
                secondary={m.role === "user" ? 1 : 0}
              />
            </div>
          ))}
        {thinking && (
          <div className={"flex flex-row py-1 items-end "}>
            <Avatar initial={"L"} src="/lu-profile.jpg" />
            <div className="w-2" />
            <p className="text-gray-300 text-xs text-center italic">
              digitando...
            </p>
          </div>
        )}
        {productPreview.length > 0 && (
          <div className="slider">
            <p className="text-gray-300 text-xs text-center italic">
              Clique em um dos produtos e siga para suas sugestões de compra
              personalizadas:
            </p>
            <div className="flex flex-col justify-between container">
              <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 2.5,
                }}
                pagination={{ el: ".swiper-pagination", clickable: true }}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                  clickable: true,
                }}
                modules={[EffectCoverflow, Pagination, Navigation]}
                className="swiper_container"
              >
                {productPreview?.map((p, i) => (
                    <SwiperSlide key={`preview-${i}`}>
             
                        <div
                          onClick={() => {
                            window
                              .open(
                                `https://www.magazineluiza.com.br/busca/${p}`,
                                "_blank"
                              )
                              .focus();
                          }}
                        >
                          <div className="iconsilder">
                          <OpenIcon width={"18px"} />
                          </div>
                            {updatedWatchImages
                              .filter((item) => item.name === p)
                              .map((item, j) => (
                                <div key={`watch-${i}-${j}`}>
                                  <img
                                    className="imgproduct"
                                    src={item.image}
                                    alt="Card Image"
                                  />
                                </div>
                              ))}
                              <p className="silider_p">{p}</p >

                         
                            

                            
                          {/* </div> */}
                        {/* </div> */}
                      </div> 
                   
                   
                    </SwiperSlide>
                    
                ))}
                    <div className="slider-controler">
                      <div className="swiper-button-prev slider-arrow">
                        <ion-icon name="arrow-back-outline"></ion-icon>
                      </div>
                      <div className="swiper-button-next slider-arrow">
                        <ion-icon name="arrow-forward-outline"></ion-icon>
                      </div>
                      <div className="swiper-pagination"></div>
                    </div>
              </Swiper>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div className="flex flex-row fixed bottom-0 bg-gray-200 w-full p-2 rounded-t-xl drop-shadow-lg newclassAdd">
        <div className="flex flex-1">
          <TextInput
            className="w-full text-xl inputfeilid"
            value={currentMessage}
            onChange={(e) => {
              setCurrentMessage(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.which === 13) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
        </div>
        <div className="ml-2">
          <Button
            onClick={() => {
              handleSendMessage();
            }}
          >
            <SendIcon width={"45px"} className="stroke-white p-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}