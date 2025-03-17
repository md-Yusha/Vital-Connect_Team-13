import { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
    // Initialize the chatbot
    window.AgentInitializer?.init({
      agentRenderURL: "https://agent.jotform.com/0195a32b9bd175858b960c075ed4d3c35080",
      rootId: "JotformAgent-0195a32b9bd175858b960c075ed4d3c35080",
      formID: "0195a32b9bd175858b960c075ed4d3c35080",
      queryParams: ["skipWelcome=1", "maximizable=1"],
      domain: "https://www.jotform.com",
      isDraggable: false,
      background: "linear-gradient(180deg, #6C73A8 0%, #6C73A8 100%)",
      buttonBackgroundColor: "#0066C3",
      buttonIconColor: "#FFFFFF",
      variant: false,
      customizations: {
        "greeting": "Yes",
        "greetingMessage": "Hi! How can I assist you?",
        "openByDefault": "No",
        "pulse": "Yes",
        "position": "left",
        "autoOpenChatIn": "0"
      },
      isVoice: undefined
    });
  }, []);

  return null;
};

export default Chatbot;