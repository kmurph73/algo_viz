import { html } from "../constants.js";
export const setDisabled = (elements, disabled) => {
    for (let index = 0; index < elements.length; index++) {
        const element = html[elements[index]];
        element.disabled = disabled;
    }
};
