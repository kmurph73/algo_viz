import { html, UserInput } from "../constants.js";

export const setDisabled = (
  elements: Array<keyof UserInput>,
  disabled: boolean
): void => {
  for (let index = 0; index < elements.length; index++) {
    const element = html[elements[index]!]!;

    element.disabled = disabled;
  }
};

export const enable = (elements: Array<keyof UserInput>): void => {
  setDisabled(elements, false);
};

export const disable = (elements: Array<keyof UserInput>): void => {
  setDisabled(elements, true);
};
