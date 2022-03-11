# Hotel Frontend
This is the frontend part of the `Hotel Project`. Still a lo to improve.

- [Instalation](#Instalation)
- [Bugs](#bugs)
- [Improvements](#improvements)

## Instalation

This project is NodeJS base, so you have to have installed NodeJS to run the following commands.

- Clone repository
```
git clone git@github.com:NaguiHW/hotel-frontend.git
```

- Install dependencies.
```bash
npm run dev
# or
yarn dev
```

## Bugs
I could identify a few bugs:
- For some reason when you try to load hotels with id greater than 9, the app crash, at least in my pc.
- When you try to compare the rating of the hotels with id greater than 9 also the app crash.
- Some buttons doesn't have the right shape.

## Improvements
- Resolve the bugs mentioned before.
- Deploy the app to a server.
- Add styles to the admin area.
- Create an authentication to separate the admin to area to the common user.
- Create more validations before to create, update or delete some data from the database.
- Optimize the loading of the data.