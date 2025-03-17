/// <reference types="vite/client" />

interface Window {
  AgentInitializer?: {
    init: (config: any) => void;
  };
}