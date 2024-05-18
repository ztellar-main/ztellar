/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_CUSTOM_ENV_VARIABLE: import('./<your_path>/MyCustomType').MyCustomType
  
    // Optionally describe the original values from vite, needed if you remove <reference types="vite/client" /> line as I did
    readonly BASE_URL: string;
    readonly MODE: string;
    readonly DEV: boolean;
    readonly PROD: boolean;
    readonly SSR: boolean;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }