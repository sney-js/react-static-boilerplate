# React Static Boilerplate

## Getting Started

```bash
yarn install
yarn start
```

This runs the boilerplate on default data. An example contentful space and environment are used (see `.env`).

## Configuration

### Contentful Keys

Edit `.env`

### Static site generation

`src/contentful/RouteConfig.ts` contains data regarding static page generation.

```js
{
    pages: [
        { contentType: "page", parentField: "parentPage" },
        { contentType: "article", parentField: "category" },
        { contentType: "category" },
    ],
    cleanupConfig: {
        handlers: {
            link: linkHandler,
        },
        ignoreProps: ["sys"],
        ignoreTypes: [],
    },
    defaultLocale: "en-US",
}
```

`pages` describe content model names on your contentful that you want to generate routes for. Pages should have 2 required fields: `title` and `name`. `name` becomes the url part for that page. `parentField` determines the field that links to another one of the above `pages` that is used as parent path for final url generation.

`defaultLocale` must correspond to the default locale configured on your space.

`cleanupConfig`: `sys` is removed from all contentful entries on frontend to reduce memory `ignoreProps` is used to control this. Other entries like `link` that create links to other page entries also take up space. A handler can be provided that converts page data into link data. (has type `LinkData`) 

## Environments

There 2 sets for env variables:

1. .env - general purpose env file (for contatnful credentials, prebuild processing, etc)
2. src/environments - client side env variables for 3d party services usage (implemented through file replace plugin)

## Contribution

### Contentful fields types

When you edit contentful models, you must update the local copy of its type. To update/generate TS field types, run `contentful-typescript-codegen` script.

New types will be generated into `src/contentful/@types/contentful.d.ts`

### Contentful Models Backup

In addition to types, we also store contentful model structure as code. When you create a PR, make sure to run `contentful:pull` command to update the component you have been working on's content model structure.

If you have pulled from another branch and want to update your contentful environment to with the latest change from code, use `contentful:push`. **Caution: Make sure your environment is not master as this can be destructive to live site.**

### Adding new Contentful components

1. Create a folder under `app/containers/` with same name as contentful's content model name.
2. Add a `<componentName>.tsx` file, `dataHandler.ts` and `<componentName>.module.tsx` if required.
3. Change the class names to be `<componentName>` identifiable.
4. If its a page level component:
    5. Create a new entry for your component inside `app/containers/utils/renderer.tsx`
    6. Create a new entry for your component inside `app/containers/page/dataHandler.ts`
5. If its NOT a page level component:
    7. Navigate to `app/containers/<parent-component>/dataHandler.ts` to create entry and link to your component's dataHandler.
6. Pull latest contentful content models using `CONTENTFUL_MANTOKEN=$CONTENTFUL_MANTOKEN npm run contentful:pull -- --include=all` command.

### Icons

To use icons, they need to be exported through [svgr](https://github.com/smooth-code/svgr)

1. Put your icons to public/assets/icons directory
2. npm run svgr
3. icons will be generated into src/app/components/icons directory
4. import icon as any other react component (import SvgArrow from "../components/icons/Arrow";)
5. To add app styling to icon, wrap icon into Icon component
