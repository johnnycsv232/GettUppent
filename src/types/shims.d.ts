// This file silences IDE errors when node_modules are missing or types are incomplete

declare module 'next/font/google' {
  export const Inter: any;
  export const Poppins: any;
  export const Oswald: any;
}

declare module 'fs' {
  export const readFileSync: any;
}

declare module 'path' {
  export const join: any;
}

