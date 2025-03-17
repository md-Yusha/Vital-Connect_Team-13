import { useEffect } from 'react';

const VoiceAgent = () => {
  useEffect(() => {
    // Create and append the ElevenLabs element
    const agent = document.createElement('elevenlabs-convai');
    agent.setAttribute('agent-id', 'BNCYHhjG3zoRAvREvklH');
    document.body.appendChild(agent);

    // Cleanup on unmount
    return () => {
      agent.remove();
    };
  }, []);

  return null;
};

export default VoiceAgent;