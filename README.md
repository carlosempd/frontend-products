# Products catalog

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.1.

This web is a test to show a catalog of products and it can list, create, update and soft deletes products.

It consists of a main route `products` and a series of dialogs to create, update or visualize individual products.

Image field is only a string to store a url of images, not a file upload input.
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Environment Variables
It is important to configure required environment variables in a `/src/environments/environment.ts` file in order to run the project. In this case it only contains the apiURL for the backend server.

Here is an example with all the required env variables
| **environment.ts** |
| --- | 
```typescript
export const environment = {
    apiUrl: 'https://api-catalog.onrender.com',
}

```

## Guide

As mentioned, this project was generated with Angular Cli, so if you want to run this project locally you must install Angular in order to be able to run the project. Please follow the link [Angular-cli](https://github.com/angular/angular-cli) to see the installation instructions.

You must install nodeJs also. [Node JS - Documentation](https://nodejs.org/en/)

Please follow this steps in order to run the project:
1. Clone or Download this project. In a terminal run: 
    ```bash
        git clone https://github.com/carlosempd/frontend-products
    ```
    (Install [git](https://git-scm.com/downloads) in case you haven't installed it yet).

2. In the terminal navigate to the project folder. For example:
    ```bash
        cd /frontendproducts
    ```

3. Install node modules using:
    ```bash
        npm install
    ```

4. Run the Development Server as follows in 'Development server' section.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

