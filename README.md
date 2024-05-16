# Floorp Website

## Good to know

- This project uses [Next.js](https://nextjs.org/).
- This project uses [Tailwind CSS](https://tailwindcss.com/).
- This project uses [TypeScript](https://www.typescriptlang.org/).
- This project uses [ESLint](https://eslint.org/).
- This project uses [shadcn](https://ui.shadcn.com/).
- This project uses [Next.js Routing](https://nextjs.org/docs/app/building-your-application/routing) to implement i18n.

### A bit about shadcn

This is a library where you basically "copy" the components to your project and have full control over them. 
This is a great way to have a consistent design across the project and also to have a good starting point for the components.

On contrary to using a library like Material UI, where you have to use their components and styles, with shadcn you can change the components as you wish.

### A bit about the i18n implementation

You can find the i18n resources and utilities in the `i18n` folder. 
The `dictionaries` folder contains the translations for the website. 
The `i18n.config.ts` file contains the configuration for locales and default locale.

If you want to add a new language or improve other translation read about its usage in [./docs/translation-getting-started.md](./docs/translation-getting-started.md).

## Getting Started

First install the dependencies:

```bash
npm install
```

## Running the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
