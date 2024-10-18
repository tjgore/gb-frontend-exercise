# Givebutter Frontend Take-home

## Overview

Our goal is to fix and enhance a Pokedex application. If you are unfamiliar with the world of Pokemon, here is a brief explanation:

> The Pokedex is an electronic device created and designed to catalog and provide information regarding the various species of Pokemon featured in the Pokemon video game, anime and manga series.

[Source](https://pokemon.fandom.com/wiki/Pokedex)

Our version of the Pokedex is able to list and search through Pokemon. However, our search is a bit buggy. Additionally, we want to add a feature that shows a selected Pokemon's details like its **type**, **moves**, and **evolution chain**.

Your time is valuable, and we are extremely appreciative of you participating in this assessment. We're looking to gauge your ability to read and edit code, understand instructions, and deliver features, just as you would during your typical day-to-day work. We expect this test to take no more than one to two hours and ask to complete this work within the next two days. Upon submit, we will review and provide feedback to you regardless of our decision to continue the process.

Please update and add code in `App.js` and `index.css` based on the requirements found below. Additionally, we ask you to edit the `readme.md` with answers to a few questions found in the `Follow-up Questions` section also found below.

When you are finished, please upload your completed work to your Github and invite `@gperl27` to view it. **Do not open a PR please.**

## Setup

- This repo was scaffolded using `create-react-app`. As such, this app requires a stable version of `node` to get up and running.

[[Updated]]
 - If you have nvm, run `nvm use` to use the correct version of node. If not, install the correct version of node (20.18) to continue.
- Clone this repo and run `npm install`.
- To run the app, run `npm start`.
- Please reach out to the Givebutter team if you have any issues with the initial setup or have any problems when running the initial app.


## Requirements

### Search
- Typing in the search input should filter the existing Pokemon list and render only matches found
- Fix any bugs that prevent the search functionality from working correctly
- If there are no results from search, render "No Results Found"
- The search results container should be scrollable
- The UI should match the below mockup

![](mockup0.png)

### Details Card

- Clicking "Get Details" for any given Pokemon should render a card that has the Pokemon's `name`, `types`, `moves`, and `evolution chain`
- Use the api functions defined in `api.js` to retrieve this data. Adding new endpoints or editing existing ones are out of scope
- The details card should match the below mockup

![](mockup1.png)

## Follow-up Questions

Please take some time to answer the following questions. Your answers should go directly in this `readme`.

- Given more time, what would you suggest for improving the performance of this app?

  I would suggest the following improvements to enhance the performance of this app:
  - Save the initial `fetchAllPokemon` API call data to local storage for a few days to prevent a request on the app's initial render. Pokemon data is small and unlikely to change often, so this will save a few API calls.
  - Add react query and use its caching functionality to prefetch and store response data for `fetchPokemonSpeciesByName`, `fetchPokemonDetailsByName`, and `fetchEvolutionChainById` under the same key. This will reduce the number of API calls for Pokemon details that are viewed often.
  - Break out the Pokemon list and card details into separate components and use react hook `useCallback` and `memo` to prevent rerendering the Pokemon list 151 times when clicking the "Get details" buttons for a Pokemon. This improvement will cause only the list item for the clicked button to rerender rather than the entire list.
  - Add lodash debounce to the search input to prevent filtering each time a character is typed. I doubt this will make a difference, but it's a good practice.

- Is there anything you would consider doing if we were to go live with this app?

  I would consider the following before going live:
    - Make the app responsive.
    - Fix the glitch when clicking the "Get details" button. I would probably add the Pokemon details as a modal or keep the details card visible with a default Pokemon.
    - Make the search accessible with the following: wrap the input in a form, add a search label, and add a aria-live region or alert role to announce the results and errors.
    - Create the production build of the app.
    - Add Cloudflare to cache JS and CSS assets and to protect against DDos attacks.
    - Add analytics to track usage of searches and clicks. I would use a free Sprig account.
    - Add Sentry.io for performance monitoring and error tracking.
    - Create a minimal setup to deploy on push.
    - Remove the request param `limit=151` and add pagination because we Gotta Catch ‘Em All!  [Pokemon Theme Song](https://www.youtube.com/watch?v=rg6CiPI6h2g)


- What was the most challenging aspect of this work for you (if at all)?

  It has been a long time since I have written CSS like this. I have been a hard-core Tailwind CSS user for a couple of years, and using BEM css naming again felt odd.
