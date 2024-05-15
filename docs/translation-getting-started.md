# How everything works

This document is a guide to help you understand how the translation process works.

The `./i18n/dictionaries.ts` file responsible for loading the translations from the dictionaries.
And them the `getDictionary(Locale)` function is responsible for returning the dictionary for the given locale.

> [!NOTE]  
> All the .json files under the dictionaries should have the same keys.
> If you add a new key to one of the files, you should add it to all the other files.

## Adding a new language

To add a new language, you need to create a new .json file in the `./i18n/dictionaries` folder.
The file should have the same keys as the other files.

Then you go to the 
