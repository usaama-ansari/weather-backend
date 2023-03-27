

 # Weather app Backend
  ----------------------------------------------------------------------------------------------
 ### Synopsis
 NOTE: export `WEATHER_API_KEY` as environment variable and `NODE_ENV` as "development" for development mode
 This is backend for a Weather App. It uses the [open weather api's](https://openweathermap.org).
 It provides apis for following use cases:
 - To add city to the list of existing cities in database.
 - To fetch all cities stored in database
 - To fetch current weather data for a city
 - To fetch 5 days forecast data of a city
 
##### Note: It also makes use of caching to reduce API hits to weather api server. For this project `node-cache` is used. But the architecture easily support relacement with `Redis` or other caching technology
 ----------------------------------------------------------------------------------------------
 ###### This project is setup using:
   - **Yarn** version 3.1.1. See [this](https://yarnpkg.com/getting-started/install) to install **Yarn** in your system.
   - **NODE JS** version 18.12.0 | [Node installation guide](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-22-04)
   - **ExpressJS** framework version 4.18.2
   - **MongoDB** version 5
   
# Installation

##### Install Node version v18.12.0
 Install Node via NVM. [Source]("https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-22-04")

##### Run the project
NOTE: If you dont have `nodemon` installed, then first install that globally. You can grlobally install nodemon with `npm`. Yarn is supposed to not support global install
```sh
npm install -g nodemon
```
Checkout to master
   ```sh
   git checkout master
   ```
   install dependencies:
   ```sh
   yarn install
   ```
   
   Start the development server:
   ```sh
   yarn start
   ```
   This will start the nodemon with the `ts-node`
   
   # Folder structure
 
   The folder structure is inspired from [Clean architecture](https://khalilstemmler.com/articles/software-design-architecture/organizing-app-logic/)
   --------------------------------------------------------------------------------------------
   ##### Folder Structure:
   - **common** - Contains common modules
   - **controller** - contains controllers
   - **infra** - contains infrastructure related modules, like `Database` class, `Server` class, middlewares and `AppBootstrapper`
   - **lib** - Contains external third party library wrapper classes
   - **mappers** - Data mappers to provide user specific data
   - **services** - application services that are used by controllers.
----------------------------------------------------------------------------------------------
   - `{root-directory}/index.ts` file is where the `Server` is created and starts listening. The `Server` class is a custom class which abstracts the unlerlying `express` framework.
   - The `Server` class bootstraps the **middlewares**, starts the **database** connection, configures the **IoC** container etc. You can  extend it further to bootstrap more infrastructure related mechanisms.
   - The `Server` class registers middlewares via a `loadMiddlewares()` function exported by `~/src/shared/infra/middlewares` folder. All middlewares are supposed to be created in this folder and registered in `~/src/shared/infra/middlewares/index.ts` file's `loadMiddlewares()` function.
   - Router is a type of middleware in express app. So the root router is registed as a middleware. Once the `Server` class calls the `loadMiddlewares` method the routing is in place. The `rootRouter` in `~/src/shared/infra/middlewares/routingMiddleware` imports nester routers from all modules, and bundles them with it. So all api requests go through this `rootRouter`.
   

  # Path Aliases
 
  This are a very usefull feature supported by typescript via `ts-config.json`.
  To save you from typing the complete relative path of this sort `../../../../......./to-some-folder`, what this alows you to do is declare aliases in `ts-config` file. So tha above path becomes `@Shared/to-some-folder`.
  
  Some pre-configured aliases are present with this base structure:
  ```json
 "paths": {
      "@Common/*": ["common/*"],
      "@Controllers/*": ["controllers/*"],
      "@Lib/*": ["lib/*"],
      "@Services/*": ["services/*"],
      "@Infra/*": ["infra/*"]
    }
```

You can extend path aliases further. See this [guide](https://www.typescriptlang.org/docs/handbook/module-resolution.html)
