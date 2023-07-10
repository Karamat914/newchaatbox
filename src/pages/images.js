import React, { useEffect, useState } from "react";
import axios from "axios";
const CORS_PROXY_URL = "https://cors-anywhere.herokuapp.com/";
const useWebsiteImageExtractor = (url) => {
    debugger;
  const [imageUrls, setImageUrls] = useState([]);
  console.log("🚀 ~ file: images.js:7 ~ useWebsiteImageExtractor ~ imageUrls:", imageUrls)

  useEffect(() => {
    debugger;
    const fetchWebsiteContent = async () => {
      try {
        debugger
        const response = await axios.get(CORS_PROXY_URL + url);
        console.log("🚀 ~ file: images.js:13 ~ fetchWebsiteContent ~ response:", response)
        const html = response.data;

        // Parse the HTML content using DOMParser
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // Find all <img> tags and extract the "src" attribute
        const images = doc.getElementsByTagName("img");
        const urls = Array.from(images).map((img) => img.getAttribute("src"));

        setImageUrls(urls);
      } catch (error) {
        console.error("Error fetching website content:", error);
      }
    };

    fetchWebsiteContent();
  }, [url]);

  return imageUrls;
};

const WebsiteImageExtractor = ({ p }) => {
  const url = `https://www.magazineluiza.com.br/busca/${p}`;
  const imageUrls = useWebsiteImageExtractor(url);

  return (
    <div>
      <h2>Image URLs from {url}</h2>
      {imageUrls.map((imageUrl, index) => (
        <img key={index} src={imageUrl} alt={`Image ${index + 1}`} />
      ))}
    </div>
  );
};

export default WebsiteImageExtractor;
