# Shopify Challenge

Shopify app that allows for bulk price edits and automatically updates the title every hour.

Initial boiler plate was created using the [Shopify CLI](https://shopify.dev/apps/tools/cli).
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE.md)

## Requirements

- [A Shopify partner account](https://partners.shopify.com/signup).
- [Development store](https://help.shopify.com/en/partners/dashboard/development-stores#create-a-development-store) where you can install and test your app.

## Installation

Using the [Shopify CLI](https://github.com/Shopify/shopify-cli) run:

```sh
shopify app create node -n APP_NAME
```

## Deployment

Connect the app to heroku by running:
```sh
shopify deploy heroku
```
Set up the cron job by configuring the heroku scheduler to run the following command every hour:
```
node server/helpers/worker.js
```

## Built With
- Node.js - Back-end
- React - Front-end
- Heroku - Deployment
