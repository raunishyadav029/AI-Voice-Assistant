
import { useState } from 'react'


const VoiceAssistant = () => {
  const[commands, setCommands]= useState(true);
  const [texts, setTexts] = useState("")
  const [response, setResponse] = useState("");
  const [isListening, setIsListening] = useState(false);

  const speak = (abc, callback) => {
    const utterance = new SpeechSynthesisUtterance(abc);
    window.speechSynthesis.speak(utterance);

    utterance.onend = () => {
      if(callback) callback();
    };
  };


  const handleCommands =(command) => {
    if(command.includes("open whatsapp")){
      const message = "opening whatsapp"
      setResponse(message);
      speak(message)
      window.open("https://web.whatsapp.com/", "_blank");
    }
    else if(command.includes("open facebook")){
      const message = "opening facebook"
      speak(message)
      setResponse(message)
      window.open("https://web.facebook.com/", "_blank")
    }
    else if(command.includes("open instagram")){
      const message = "opening instagram"
      speak(message)
      setResponse(message)
      window.open("https://instagram.com/", "_blank")
    }
    else if(command.includes("open youtube")){
      const message = "opening youtube"
      speak(message)
      setResponse(message)
      window.open("https://youtube.com/", "_blank")
    }
      else if(command.includes("open google")){
        const message = "opening google"
        speak(message)
        setResponse(message)
        window.open("https://google.com/", "_blank")
    }
    else{
      const message = `Searching google for... ${command}`
      setResponse(message)
      speak(message)
      window.open(`https://www.google.com/search?q=${encodeURIComponent(command)}`, "_blank")
    }
  }



// Function to Start listening
  const startListening = () => {
    if(!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)){
      const message= "Speech recognition does'nt support on this browser"
      setResponse(message)
      alert(message)
      return;
    }
     const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)
     recognition.lang = "en-US"

     recognition.onstart =() => {
      setIsListening(true);
      setTexts(true)
      setResponse(true);
     }

     recognition.onresult = (event)=>{
      const text = event.results[0][0].transcript.toLowerCase()
      setTexts(text)
      handleCommands(text)

      setTimeout(() => {
        setCommands(true);
      }, 1000); // Slight delay to reset button
    };

     
    //  Event when recognistion ends
    recognition.onend = () =>{
      setIsListening(false);
    }
    // Event when an error occurs
    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setResponse(`Error: ${event.error}`);
      setIsListening(false);
      speak("Network Error please use diffrent browseer")
    };

    // Start recognition
     recognition.start()
    

  };

  const handleClick = () => {
    setCommands(false);
    speak("Listening...Please give me a command",
       () => {startListening();});
    
  };

  
  return (
    <div className='w-screen h-screen bgimg flex flex-col gap-6 justify-center items-center'>

      <h1 className='text-6xl translate-x-[-5%] font-extrabold uppercase text-green-600 '>AI Voice Assistant</h1>
      <p className='text-md  font-semibold text-black'>{
      commands? "Please give me a command" : "Processing your command"}
      </p> 

      <button onClick={handleClick}
       className={`px-6 py-3 bg-black rounded-lg shadow-lg transition ${isListening || !commands
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          disabled={isListening || !commands}
          >
          {isListening ? "Listening..." : "Start Listening..."}

        </button>

        <div className="mt-3 translate-x-6 w-full max-w-md h-auto bg-white shadow-lg rounded-xl p-5">
          <p className="text-gray-700 text-xl">
            <span className="text-green-700 font-semibold">Recognized Speech</span>: {texts || "N/A"}
          </p>
          <p className="text-gray-800 mt-2 text-xl"><span className="text-orange-600 font-semibold ">Response</span>: {response || "N/A"}</p>
        </div>
  

    </div>
  )
}

export default VoiceAssistant