
import React from 'react';
import './App.css';
import './normal.css';
import {useState} from 'react';

function App() {
  //adding state for input and chat log
  const [input,setinput]=useState("");
  const [chatLog,setchatLog]=useState([{
    user:"gpt",
    message:"how can i help you today?",
 },
{
  user:"me",
  message:"yes"
} ]);

//clear chats
function clearChat(){
  setchatLog([]);
}

  async function handleSubmit(e)
   {
    e.preventDefault();// to prevent default behaviour of it
    let chatLogNew=[...chatLog,{user:"me",message:`${input}`}]  // means in chatlog now input saved
    await setinput("");//setting it to nothing when enter pressed

    setchatLog(chatLogNew)
    //fetch request to the api combining the chatlog array of messagesand sending it as message to locvalhost 3000as a post
    const messages=chatLogNew.map((message)=>message.message).join("\n")
    const response=await fetch("http://localhost:3080/",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        message:messages
        
      })
    });
    const data=await response.json();
    setchatLog([...chatLogNew,{user:"gpt" ,message:`${data.message}`}])
     
    //console.log(data.message); // to get the message
     
   }

   
  return (
    <div className="App">
      <aside className="sidemenu">
        <div className="side-menu-button" onClick={clearChat}>
          <span>+</span>
          New Chat
        </div>
      </aside>
      <section className="chatbox">
        <div className="chat-log">
         {chatLog.map((message,index) =>(
          <ChatMessage  key={index} message={message} />
         ))}
          
        </div>
        <div className="chat-input-holder">
          <form onSubmit={ handleSubmit}>
          <input rows="1" value={input} onChange={(e)=>setinput(e.target.value)} className="chat-input-text-area" placeholder="Type your message here">

          </input>
          </form>
        </div>

      </section>
      
    </div>
  );
}
//if message user gpt then we also pass chatgpt in the avatar
const ChatMessage=({message})=>{
  return(
    <div className={`chat-message ${message.user ==="gpt" && "chatgpt"}`}>
    <div className="chat-message-center">
    <div className={`avatar ${message.user ==="gpt" && "chatgpt"}`}> 
      
      </div>
      <div className="message">
         {message.message}
      </div>
    </div>
  </div>
  )
}

export default App;




