## Setup the project

- Download the template form this git repo.
- In the root directory create a `.env` file and put following env variables.
  ```
    PORT= <PORT number of your choice> For Example: PORT= 3000 || 5000 || 8000
  ```
- Install the dependencies:
  ```
    npm install
  ```
- Indise the `src/config` folder, create a file named as `config.json` and write the following code:

  ```
    {
      "development": {
       "username": "root",
       "password": null,
       "database": "database_development",
       "host": "127.0.0.1",
       "dialect": "mysql"
      },
      "test": {
        "username": "root",
        "password": null,
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "mysql"
      },
      "production": {
        "username": "root",
        "password": null,
        "database": "database_production",
        "host": "127.0.0.1",
        "dialect": "mysql"
      }
    }
  ```

- Go inside the `src` folder and run following command:

  ```
    npx sequelize init
  ```

- If you are setting up your development environment, then write the username and password of your db and in dialect mention the type of database your are using. For Example:
  ```
    one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle'
  ```
- Go inside the `src` folder and run following command:

  ```
    npx sequelize db:create
  ```

- If you are setting up the test or production environment, then specify the host(Url where your DB is hosted).

- Start the development server:
  ```
    npm run start
  ```
