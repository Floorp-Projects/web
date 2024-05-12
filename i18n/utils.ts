import React from "react";


function _formatTranslation(translation: string, values: Record<string, string> = {}) {
  for (const key in values) {
    translation = translation.replace(`{{${key}}}`, values[key]);
  }
  return translation;
}


export type TranslationComponent = {
  key: string;
  type: string | any;
  rest: object;
}

function _replaceComponent(translation: string, component: TranslationComponent) {
  const key = component.key;
  const innerTextReg = translation.match(new RegExp(`<${key}>(.*?)<\/${key}>`));
  const innerText = innerTextReg ? innerTextReg[0] : null;
  if (!innerText) {
    return translation;
  }
  let textOnly = innerText.replace(new RegExp(`<${key}>|<\/${key}>`, "g"), "");
  textOnly = _formatTranslation(textOnly);
  const Type = component.type;
  let element = typeof Type === "string" ?
    React.createElement(Type, {key, ...component.rest}, textOnly) :
    React.createElement(Type, {key, ...component.rest}, textOnly);

  const parts = translation.split(innerText);
  return [parts[0], element, parts[1]];
}

function _replaceLineBreaks(translation: string): React.ReactNode {
  let elements: any[] = [];
  if (translation === "" || translation === null) {
    return null;
  }
  const parts = translation.split("\n");
  for (let i = 0; i < parts.length; i++) {
    elements.push(parts[i]);
    if (i < parts.length - 1) {
      elements.push(React.createElement("br", {key: `br-${i}`}));
    }
  }

  return React.createElement(React.Fragment, {key: "fragment"}, elements);
}

/**
 * Formats a translation string with the given values.
 * {{name}} will be replaced with the value of values.name
 * @param translation
 * @param values
 */
export function formatTranslation(translation: string, values: Record<string, string> = {}) {
  let formattedStr = _formatTranslation(translation, values);
  return _replaceLineBreaks(formattedStr);
}

/**
 * Replaces a component in a translation string with the given component.
 * @param translation
 * @param component
 */
export function replaceComponent(translation: string, component: TranslationComponent) {
  const parts = _replaceComponent(translation, component);
  const leftText = _replaceLineBreaks(parts[0] as string);
  const rightText = _replaceLineBreaks(parts[2] as string);
  let elements = [leftText, parts[1], rightText];
  return React.createElement(React.Fragment, {key: "fragment"}, elements);
}

/**
 * Replaces components in a translation string with the given components.
 * @param translation
 * @param components
 */
export function replaceComponents(translation: string, components: TranslationComponent[]) {
  let elements: any[] = [];
  for (const component of components) {
    if (elements.length > 0) {
      if (typeof elements[0] === "string") {
        let text = elements[0] as string;
        const parts = _replaceComponent(text, component);
        if (parts instanceof Array) {
          elements[0] = [parts[0], parts[1], parts[2]];
        } else {
          elements[0] = parts;
        }
      }

      if (elements[elements.length - 1] === "string") {
        let text = elements[2] as string;
        const parts = _replaceComponent(text, component);
        if (parts instanceof Array) {
          elements[2] = [parts[0], parts[1], parts[2]];
        } else {
          elements[2] = parts;
        }
      }
    } else {
      const parts = _replaceComponent(translation, component);
      if (parts instanceof Array) {
        elements = [parts[0], parts[1], parts[2]];
      } else {
        elements = [parts];
      }
    }
  }
  return React.createElement(React.Fragment, {key: "fragment"}, elements);
}