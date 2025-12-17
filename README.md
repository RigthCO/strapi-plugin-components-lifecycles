# Strapi v5 - Components Lifecycles

A plugin for [Strapi Headless CMS](https://github.com/strapi/strapi) that provides a way to easily create lifecycles for components.

## Features

Allows to easily create components lifecycles just like creating for APIs

## How it works

Currently, Strapi components have the following file strucutre:

```
/components
    /{category1}
        {component1}.js
        {component2}.js
    /{category2}
        {component1}.js
```

This plugin allows you to create one `lifecycles` folder inside each `category`. Inside that folder you are able to create one `.(js/ts)` file for each component of that same category.

One example:

```
/components
    /{category1}
        /lifecycles
            {component1}.js
        {component1}.js
```

The struture above tells the plugin that it will be subscribed to the `{component1}` the lifecycles exported from the `/lifecycles/{component1}.js`.

## Rules

- All wanted lifecycles to be subscribed must be inside the `/lifecycles` folder;
- The name of the lifecycles file **MUST** be the same as the component file name;
    - The console will warn if there is any lifecycles that are not being subscribed because the component does not exist;
- The lifecycles export is the same as when creating lifecycles to APIs;

## Extras

- The examples use `.js` files but the plugin also works with `.ts` files;
- The lifecycles subscription uses Strapi `strapi.db.lifecycles.subscribe` method and because of that it does not show any errors when a invalid lifecycle is being exported;
- Since it is lifecycles, they will always execute even if the components are being used in many APIs, there is no way to tell for the lifecycles to only execute if the component is on API A, B or C.

## Compatibility

The plugin was created and tested on top of Strapi `v5.33.0`.
