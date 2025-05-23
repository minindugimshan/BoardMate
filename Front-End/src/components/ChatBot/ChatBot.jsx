import { useState, useRef, useEffect } from "react";

export default function ChatBot() {
  const [showChatBot, setShowChatBot] = useState(false);
  return (
    <>
      <div
        className="w-[5rem] h-[5rem] p-2 bg-white rounded-full fixed bottom-5 right-5 shadow-md z-100 flex items-center justify-center cursor-pointer group"
        onClick={() => setShowChatBot(!showChatBot)}
      >
        <div className="flex items-center justify-center">
          <ChatBotIcon className="transition-transform duration-500 ease-in-out group-hover:rotate-360" />
        </div>
      </div>

      {showChatBot && <ChatBotWindow />}
    </>
  );
}

const ChatBotWindow = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    // Set visible after a small delay to enable the transition
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10);

    return () => clearTimeout(timer);
  }, []);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div 
      className={`fixed bottom-30 right-5 z-100 bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300 ease-in-out ${
        isVisible ? 'opacity-100 transform-none' : 'opacity-0 transform translate-y-10'
      }`}
      style={{ width: '350px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)' }}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
      <iframe
        ref={iframeRef}
        className="transition-opacity duration-300"
        style={{ opacity: isLoading ? 0 : 1 }}
        src="https://dialogflow.cloud.google.com/api-client/demo/embedded/0d4c667e-7884-4dcd-b12a-5886d5844308"
        width="350"
        height="430"
        onLoad={handleIframeLoad}
      ></iframe>
    </div>
  );
};

const ChatBotIcon = ({ className = "" }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="48" 
      height="48" 
      viewBox="0 0 24 24"
      className={className}
    >
      <g fill="none">
        <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
        <path
          fill="currentColor"
          d="M9.107 5.448c.598-1.75 3.016-1.803 3.725-.159l.06.16l.807 2.36a4 4 0 0 0 2.276 2.411l.217.081l2.36.806c1.75.598 1.803 3.016.16 3.725l-.16.06l-2.36.807a4 4 0 0 0-2.412 2.276l-.081.216l-.806 2.361c-.598 1.75-3.016 1.803-3.724.16l-.062-.16l-.806-2.36a4 4 0 0 0-2.276-2.412l-.216-.081l-2.36-.806c-1.751-.598-1.804-3.016-.16-3.724l.16-.062l2.36-.806A4 4 0 0 0 8.22 8.025l.081-.216zM11 6.094l-.806 2.36a6 6 0 0 1-3.49 3.649l-.25.091l-2.36.806l2.36.806a6 6 0 0 1 3.649 3.49l.091.25l.806 2.36l.806-2.36a6 6 0 0 1 3.49-3.649l.25-.09l2.36-.807l-2.36-.806a6 6 0 0 1-3.649-3.49l-.09-.25zM19 2a1 1 0 0 1 .898.56l.048.117l.35 1.026l1.027.35a1 1 0 0 1 .118 1.845l-.118.048l-1.026.35l-.35 1.027a1 1 0 0 1-1.845.117l-.048-.117l-.35-1.026l-1.027-.35a1 1 0 0 1-.118-1.845l.118-.048l1.026-.35l.35-1.027A1 1 0 0 1 19 2"
        />
      </g>
    </svg>
  );
};