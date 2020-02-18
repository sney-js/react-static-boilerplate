## TypeScript support

Added support for client-side typescript compiling (through webpack pipeline)

## Path Aliases for Absolute Imports

`react-static-typescript-plugin` supports path aliases [since v3.1](https://github.com/react-static/react-static/pull/963#issuecomment-455596728). It has been set up in this template.

```js
// tsconfig.json
{
  // ...
    "paths": {
      "@components/*": ["src/components/*"]
    },
  // ...
}

// this works in your React app
import FancyDiv from '@components/FancyDiv'
```

## Scss and scss modules support

Added scss & modules loaders to webpack workflow:

1. To include styles to component just import './styles.scss'
2. To use modules inside your components import styles from './styles.module.scss'

Note: to compile modules you need to add .module.scss extension to a file

## Contentful module

For data retrieval from contetnful use contentful module (/contetnful),

Note: Unfortunately I wasn't able add ts support for contentful module and static.config.ts out of box

## Env

There 2 sets for env variables:

1. .env - general purpose env file (for contatnful credentials, prebuild processing, etc)
2. src/environments - client side env variables for 3d party services usage (implemented through file replace plugin)

## Debugger

To attach debugger for webstorm you could folow instructions [here](https://blog.jetbrains.com/webstorm/2017/01/debugging-react-apps/).  
If you want to use breakpoint, ensure that checkbox "Ensure breakpoint are detected when loading scripts" set to true

## Adding new Contentful components

1. Create a folder under `app/containers/` with same name as contentful's content model name.
2. Add a `<componentName>.tsx` file, `dataHandler.ts` and `<componentName>.module.tsx` if required.
3. Change the class names to be `<componentName>` identifiable.
4. If its a page level component:
    5. Create a new entry for your component inside `app/containers/utils/renderer.tsx`
    6. Create a new entry for your component inside `app/containers/page/dataHandler.ts`
5. If its NOT a page level component:
    7. Navigate to `app/containers/<parent-component>/dataHandler.ts` to create entry and link to your component's dataHandler.
6. Pull latest contentful content models using `CONTENTFUL_MANTOKEN=$CONTENTFUL_MANTOKEN npm run contentful:pull -- --include=all` command.

## Icons

To use icons, they need to be exported through [svgr](https://github.com/smooth-code/svgr)

1. Put your icons to public/assets/icons directory
2. npm run svgr
3. icons will be generated into src/app/components/icons directory
4. import icon as any other react component (import SvgArrow from "../components/icons/Arrow";)
5. To add app styling to icon, wrap icon into Icon component

## Api mocking

Implemented simple client-side interceptor for fetch requests (app/core/mocks.ts)

in app/mock-configs.ts add mock config with parameters:

-   url - regexp of url which you want to intercept
-   method - POST, GET, etc.
-   passthrough: true or false (should be intercepted or not)
-   responseData: path to mock data (will be resolved through simple GET request)

## Deployment

You need locally installed aws credentials (User/.aws/credentials);
Deployment: run npm deploy-env script with params (credentials, region, bucket name, dist folder)

## Contentful fields types

To update/generate TS field types, run contentful-typescript-codegen script.

New types will be generated into src/contentful/@types/contentful.d.ts

## Redux store

You can connect any component to redux store through

```js
const mapStateToProps = ({ theme, isLoggedIn, userData }) => {
    return {
        theme,
        isLoggedIn,
        userData,
    };
};

const ComponentConnected = connect(
    mapStateToProps,
    null,
    null,
)(T); // T - your component class;

export default ComponentConnected;
```

For now redux store contains:

```json
{
    "theme": Theme.YELLOW, //global application theme, depends on page
    "isLoggedIn": false, //user auth status
    "balance": null, //user balance, retrieved when user logged in
    "userData": null, //BPLUserData model, retrieved when user logged in
    "multiplier": null //multiplier for spring sparen, goes together with balance
}
```

## User Service

For user-specific data manipulation I suggest to user UserService (src/app/core/user/userService.ts)

```js
UserService.getInstance().updateUserData({ firstName: "Hello John" });
```

Any changes through service will be reflected in redux store.
