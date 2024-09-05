/// <reference types="svelte" />

import { FormEventHandler } from "svelte/elements";

declare namespace svelte.JSX {
    interface HTMLProps<T> {
        onclickoutside?: (event: CustomEvent) => void;
    }
}


declare module 'svelte/elements' {
    export interface HTMLAttributes<T extends EventTarget>{
        onclickoutside?: (event: CustomEvent) => void; 
    }
}