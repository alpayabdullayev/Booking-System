// import React, { useState } from "react";
// import axios from "axios";

// const Chatbot = () => {
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState([]);

//   const sendMessage = async () => {
//     if (input.trim() === "") return;

//     setMessages([...messages, { author: "user", text: input }]);
//     setInput("");

//     try {
//       const response = await axios.post(
//         "https://api.openai.com/v1/engines/curie/completions",
//         {
//           prompt: input,
//           max_tokens: 150,
//           temperature: 0.7,
//           n: 1,
//           stop: ["\n"],
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: "Bearer YOUR_OPENAI_API_KEY",
//           },
//         }
//       );

//       setMessages([
//         ...messages,
//         { author: "bot", text: response.data.choices[0].text.trim() },
//       ]);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div>
//       <div style={{ height: "300px", overflowY: "scroll" }}>
//         {messages.map((msg, index) => (
//           <div key={index}>
//             <strong>{msg.author}: </strong>
//             {msg.text}
//           </div>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         onKeyPress={(e) => {
//           if (e.key === "Enter") sendMessage();
//         }}
//       />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// };

// export default Chatbot;
