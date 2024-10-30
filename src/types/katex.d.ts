// src/types/katex.d.ts
declare module "katex" {
  export function render(
    tex: string,
    element: HTMLElement,
    options?: {
      displayMode?: boolean;
      throwOnError?: boolean;
      errorColor?: string;
      macros?: { [key: string]: string };
      colorIsTextColor?: boolean;
      maxSize?: number;
      maxExpand?: number;
      strict?: boolean | "warn" | "ignore" | ((errorCode: string, errorMsg: string, token?: any) => boolean);
      trust?: boolean | ((context: { command: string; url: string }) => boolean);
      output?: "html" | "mathml" | "htmlAndMathml";
    }
  ): void;
}
