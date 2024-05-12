import React from "react";


/**
 * Formats a translation string with the given values.
 * {{name}} will be replaced with the value of values.name
 * @param translation
 * @param values
 */
export function formatTranslation(translation: string, values: Record<string, string>) {
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
  const textOnly = innerText.replace(new RegExp(`<${key}>|<\/${key}>`, "g"), "");
  const Type = component.type;
  let element = typeof Type === "string" ?
    React.createElement(Type, {key, ...component.rest}, textOnly) :
    React.createElement(Type, {key, ...component.rest}, textOnly);

  const parts = translation.split(innerText);
  return [parts[0], element, parts[1]];
}


/**
 * Replaces a component in a translation string with the given component.
 * @param translation
 * @param component
 */
export function replaceComponent(translation: string, component: TranslationComponent) {
  const parts = _replaceComponent(translation, component);
  return React.createElement(React.Fragment, {key: "fragment"}, parts[0], parts[1], parts[2]);
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
        const text = elements[0] as string;
        const parts = _replaceComponent(text, component);
        if (parts instanceof Array) {
          elements[0] = [parts[0], parts[1], parts[2]];
        } else {
          elements[0] = parts;
        }
      }

      if (elements[elements.length - 1] === "string") {
        const text = elements[2] as string;
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