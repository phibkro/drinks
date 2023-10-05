# Cocktail app

## Project description

TODO: Describe the project

## Installation

- Clone the repo

### Running the app

#### Run dev environment

`cd app`\
`npm install`\
`npm run dev`

## Tools

### Vite

is our required frontend build tool. No configuration is required outside of whats included in the repo.

### React Router

allows us to employ URL path routing in our Single Page Application (SPA)

#### Implementation

- All pages are wrapped within `<App />` which contains layout elements like a universal header
- Search Page (/): Users can search for and are presented with a myriad of cocktail recipes
- Details Page (/cocktail/:cocktailId): Displays information specific to the cocktailId parameter
- Error Page (*): Displays if a routing error occurs, for example navigating to an undefined page url

```jsx
const rootPath = import.meta.env.BASE_URL
export const appRouter = createBrowserRouter([
  {
    path: rootPath,
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: rootPath,
        element: <SearchPage />,
      },
      {
        path: "cocktail/:cocktailId",
        element: <DetailsPage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  ]);
```

## Testing

TODO

## Linting

ESlint is used for linting. Our configs lie in .eslintrc.cjs. To manually test the linting of the project run the command

`npm run lint`

## Commit messages

We follow the conventional commits specifications described in <https://www.conventionalcommits.org/en/v1.0.0/>

[more concise and web oriented document](https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13)

We also use the conventional commits VSCode extension for ease of use

### Template

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```
