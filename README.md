# Car Dealership

This is aproject to test my front and back abilities, where we will be doing a car dealership site with the following characteristics 

**- Frontend** 
    - React
    - TypeScript
    - Vite

**- Backend**
    - Node
    - Express

## About the site

The site is a typically car dealership, where users could see and explore the option they have to buy a brand new car, also used cars.  
Tallking techinally, this site will have a server and a database to hold all the cars and related info.
There is also a special page for the owner to create or modify products

## DEVELOPMENT

**project structure**

car-dealership-site/
├── backend/
│   ├── controllers/ *Handles request and response logic for different endpoints*
│   │   ├── carController.ts
│   ├── models/ *Defines data structures and schema *
│   │   ├── carModel.ts
│   ├── routes/ *Manages application routes*
│   │   ├── carRoutes.ts
│   ├── services/ *Contains business logic and interacts with the database*
│   │   ├── carService.ts
│   ├── middleware/ *Holds middleware functions, such as authentication*
│   │   ├── authMiddleware.ts
│   ├── config/ *Contains configuration files, such as database configuration*
│   │   ├── dbConfig.ts
│   ├── app.ts *Main application setup*
│   ├── server.ts *Entry point to start the server*
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── app/ *Redux ?*
│   │   │   ├── store.ts
│   │   │   ├── rootReducer.ts
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── HomePage.tsx
│   │   │   ├── CarPage.tsx
│   │   ├── services/
│   │   │   ├── api.ts
│   │   ├── App.tsx
│   │   ├── index.tsx
│   ├── vite.config.ts
├── database/
│   ├── migrations/
│   ├── seeders/
│   ├── models/
│   │   ├── car.sql
.
.
.
