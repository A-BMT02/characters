![Version](https://img.shields.io/github/package-json/v/idanstark42/dw-characters)
![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)

![Dependencies status](https://img.shields.io/david/idanstark42/dw-characters)

![Issues count](https://img.shields.io/github/issues/idanstark42/dw-characters)
![Pull requests](https://img.shields.io/github/issues-pr-raw/idanstark42/dw-characters?label=pull%20requests)

# Characters
This is an application for management of RPG characters.

### Structure and Technologies
The application is built in [ReactJS](https://reactjs.org/), and uses [MongoDB Realm](https://www.mongodb.com/realm/lp?utm_content=rlsapostreg&utm_source=google&utm_campaign=gs_emea_rlsamulti_search_brand_dsa_atlas_desktop_rlsa_postreg&utm_term=&utm_medium=cpc_paid_search&utm_ad=&utm_ad_campaign_id=14412646473&adgroup=131761130532&gclid=CjwKCAiA6seQBhAfEiwAvPqu11G3bb1EEN5XPMvnmS_s236EvB3qBJuR7uiq00fp51p8oDQH6s7RUxoC3CoQAvD_BwE) as backend.

The application itself has a classic ReactJS structure, using a `src/components` folder for most of its code and `src/css` folder for most of its SCSS.

Inside the `src/components` folder there are three subfolders, unlike usually done in react. Two of them are the classic `pages` and `presentation`, containing page-specific and generic components respectively. The last folder, `contexts` includes wrapping context components and hooks that are used for data manipulation in the application.

Another folder in the `src` folder inlucdes the adapters for each of the games with which the application can work. The application uses [rpg-js](https://github.com/rpg-apps/rpg-js/) parser for the [rpg-yaml](https://github.com/rpg-apps/rpg-yaml) language, and the [rpg-yaml](https://github.com/rpg-apps/rpg-yaml/tree/master/games) database of games.
Each game's rulebook in the database has an adapter in the `games` folder (currently only Dungeon World is supported). The adapter is build out of two files, a SCSS file and a JS file. The SCSS file includes how to display the different fields of the character in each of the pages, and the JS file includes the characters settings and event handlers for interactivity.

### Contribution
The software is ran using [yarn](https://yarnpkg.com/).
Just clone the repository, then run `yarn install` and then `yarn start`.

**Known Installation Issues**
* If you have a `node_modules` folder somewhere in your folder tree related to this project's folder with a `babel-jest` module in it, it may creae problems with `yarn install`.
