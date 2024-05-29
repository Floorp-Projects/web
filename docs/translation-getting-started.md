# How everything works

This document is a guide to help you understand how the translation process works.

The `./i18n/dictionaries.ts` file responsible for loading the translations from the dictionaries.
And them the `getDictionary(Locale)` function is responsible for returning the dictionary for the given locale.

> [!NOTE]  
> All the .json files under the dictionaries should have the same keys.
> If you add a new key to one of the files, you should add it to all the other files.

## Adding a new language

There is a Crowdin project for the translation of the documentation. You can access it [here](https://crowdin.com/project/floorp-web).

If you want to contribute request access to the project and start translating the strings.

## How to use the translations

To use the translation in a server side rendered page you can use it like this: 

```tsx
import { getDictionary } from '@/i18n/dictionaries'

export default async function Page({ params: { lang } }) {
  const dict = await getDictionary(lang) // en
  return <button>{dict.products.cart}</button> // Add to Cart
}
```

For client side rendered components you can pass the required locale strings as props.

```tsx
import { getDictionary } from '@/i18n/dictionaries'

type ProductProps = {
  buttonLabel: string
}

export default function Product({ buttonLabel }: ProductProps) {
  return <button>{buttonLabel}</button> // Add to Cart
}
```

## Advanced usage

You might encounter that there is part of the locale that you might want to format or style there are useful functions to 
use. These functions do not work nested with each other yet.

### formatTranslation

Let's say you have a string like this:

```json
{
  "products": {
    "price": "Price: {{price}}"
  }
}
```

You can use the formatTranslation function to replace the `{{price}}` with the actual price.

```tsx
import { formatTranslation } from '@/i18n/utils'

const price = 10

const dict = await getDictionary('en')

const priceString = formatTranslation(dict.products.price, { price: price }) // Price: 10
```

Or let's say you want to have a line break in the translation:

```json
{
  "products": {
    "price": "Price: {{price}}\nQuantity: {{quantity}}",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.\nSed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  }
}
```

You can use the formatTranslation function to replace the `{{price}}` and `{{quantity}}` with the actual values.

Or you can call the function with the translation only and it will return the translation with the line breaks.

> [!NOTE]
> The line breaks will get replace whether you pass the value dictionary or not.

```tsx

const dict = await getDictionary('en')

const priceString = formatTranslation(dict.products.price, { price: 10, quantity: 2 }) // Price: 10<br/>Quantity: 2
const descriptionString = formatTranslation(dict.products.description) // Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br/>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
```

### replaceComponent or replaceComponents

Let's say you have a string like this:

`Lorem ipsum dolor sit amet, consectetur adipiscing elit. <Link href='{{link}}'>Click here</Link>.`

First you need to specify the part of the string which has to be wrapped:

```json
{
  "products": {
    "price": "Price: {{price}}",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. <1>Click here</1>."
  }
}
```

Then you can use the replaceComponent function to replace the `<1>Click here</1>` with the actual link.

```tsx

import { replaceComponent } from '@/i18n/utils'

const dict = await getDictionary('en')

// The Link component should be imported from the next/link
const descriptionString = replaceComponent(dict.products.description, { key: "1", type: Link, rest: {href: "https://google.com"}})
```

Or let's say you have multiple components to replace:

```json
{
  "products": {
    "price": "Price: {{price}}",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. <1>Click here</1> <2>Click here</2>."
  }
}
```

You can use the replaceComponents function to replace the `<1>Click here</1>` and `<2>Click here</2>` with the actual links.

```tsx

import { replaceComponents } from '@/i18n/utils'

const dict = await getDictionary('en')

// The Link component should be imported from the next/link
const replacements = [
    { key: "1", type: Link, rest: {href: "https://google.com"}},
    { key: "2", type: Link, rest: {href: "https://google.com"}}
]

const descriptionString = replaceComponents(dict.products.description, replacements)
```

### Shortcuts

If there is common replacement component, then you  can put it under the `./i18n/common=components.ts` file.