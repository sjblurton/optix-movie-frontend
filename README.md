# Optix UI Tech Test Frontend

This is the frontend project for the Optix UI tech test. It includes a React application with various components, hooks, and context providers. The project is set up with TypeScript, ESLint, and Vitest for testing.

## Table of Contents

- [Backend API](#backend-api)
- [Frontend Links](#frontend-links)
- [Why useSWR](#why-useswr)
- [Why React Hook Form](#why-react-hook-form)
- [Why Vitest](#why-vitest)
- [Coverage Tests](#coverage-tests)
- [Zod](#zod)
- [Error Boundaries](#error-boundaries)
- [Loading](#loading)
- [Acceptance Criteria](#acceptance-criteria)

## Backend API

- Deployed: [https://optix-movies-api.onrender.com/](https://optix-movies-api.onrender.com/)
- Docker Image: `docker pull sjblurton/optix-tech-test-api`
- GitHub: [https://github.com/sjblurton/optix-movies-api](https://github.com/sjblurton/optix-movies-api)

## Frontend Links

- deployed: TBA
- Docker Image: `docker pull sjblurton/optix-tech-test-frontend`
- GitHub: TBA

## Why useSWR

useSWR handles all the caching so I don't need to. While TanStack Query is my preference, it didn't seem necessary for this small project.

I think your previous API might have been built to see if I know how to use `useMemo`. I prefer to cache on the server and have the API provide the data as needed, then use `useMemo` on the client.

## Why React Hook Form

React Hook Form handles all the hard work with forms. For more complex forms, I would use Zod for schemas. But since this form is simple, I used the built-in validation.

## Why Vitest

I had never used Vitest before but had read great things about it. I had been using Jest, but Vitest is a lot better, and I will use it in the future. Since this was my first time using Vite, it made sense to use Vitest.

## Coverage Tests

| File      | % Stmts | % Branch | % Funcs | % Lines |
| --------- | ------- | -------- | ------- | ------- |
| All files | 97.59   | 93.33    | 96.96   | 97.5    |

## Zod

Zod is my preferred way of validating data as it's type-safe and you can auto-generate the types.

## Error Boundaries

I only have one error boundary here as they all rely on the same fetching of the movies, though it could maybe be improved. It's best to have them for most components so if one component breaks, it only takes out one part of the program and doesn't crash everything.

## Loading

I'm using the Skeleton component for the loading states. It's more subtle. I'm not 100% set on it, but for a quick demo, I'm fine with it.

## Acceptance Criteria

- ✅ Display total number of movies.
- ✅ Table
  - ✅ Movie titles
  - ✅ Average review score (to 1 decimal place)
  - ✅ Company that produces the film.
- ❌✅ Movie company data comes from the movieCompanies GET request. (I edited the API to send this data and also renamed the endpoint as URLs don't care about uppercase)
- ✅ Movies data comes from the movies GET request.
- ✅ User must be able to select a table row to leave a review with a form appearing when there is a selected movie.
- ❌✅ Request to submitReview endpoint and display the message returned on response. (I renamed the endpoint and made it a PUT for updating)
- ✅ Form must restrict the message to 100 characters and show an error message if over 100, not allowing submission in this instance.
- ✅ Highlight selected movie row when clicked.
- ✅ Handle error and loading states.
- ✅ Reviews column should be sortable.
- ✅ Submit review form should appear in a modal on mobile devices or small breakpoints.
- ✅ Add a button (or other mechanism) to refresh movies and movie companies.
- ✅ Deploy application using docker.
