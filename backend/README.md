# Backend - Full Stack Web Developer

### **Udacity Final Project: Full Stack Capstone - Stars Casting**

The backend for the Stars Casting Agency has been built using Python and Flask, two powerful tools for building web applications. Leveraging the virtualenv environment, the backend maintains a clean and isolated setup for dependencies. The SQLAlchemy ORM seamlessly interfaces with a PostgreSQL database, allowing for efficient data management.

Flask-Migrate ensures smooth database migrations, enabling hassle-free updates to the data structure. Flask-CORS facilitates cross-origin resource sharing, enhancing compatibility with different frontend domains. In addition, the integration of jose and Auth0 empowers the backend with secure authentication and authorization mechanisms, aligning with modern best practices.

This backend architecture efficiently processes requests from the frontend, providing the necessary data through designated endpoints. The use of Flask's intuitive routing system ensures a seamless flow of information. Through this interaction, information related to movies, and actors is retrieved and communicated to the frontend with precision.

The construction of this backend is a testament to the skills cultivated throughout the Udacity Full Stack Web Developer program. By employing industry-standard technologies and adhering to established coding practices, this backend project serves as a cornerstone of reliability, scalability, and security for the Stars Casting Agency application.


## Hosted Live Backend

The live backend application is hosted at: [https://udacity-capstone-backend.vercel.app/](https://udacity-capstone-backend.vercel.app/)

## Backend Specifications
#### Data Modeling
* **Architect relational database models in Python**
    * Use of correct data types for fields
    * Use of primary and optional foreign key ids

* **Utilize SQLAlchemy to conduct database queries**
    * Does not use raw SQL or only where there are not SQLAlchemy equivalent expressions
    * Correctly applies SQLAlchemy to define models and data types
    * Creates methods to serialize model data and helper methods to simplify API behavior such as insert, update and delete.

#### API Architecture and Testing
* **Follow RESTful principles of API development**
    * RESTful principles are followed throughout the project, including appropriate naming of endpoints, use of HTTP methods GET, POST, PATCH, and DELETE
    * Routes perform CRUD operations

* **Structure endpoints to respond to four HTTP methods, including error handling**
    * Specifies endpoints and behavior for at least:
        * Two GET requests
        * One POST request
        * One PATCH request
        * One DELETE request
    * Utilize the `@app.errorhandler` decorator to format error responses as JSON objects for at least four different status codes

* **Enable Role Based Authentication and roles-based access control (RBAC) in a Flask application**
    * Project includes a custom `@requires_auth` decorator that:
        * get the Authorization header from the request
        * decode and verify the JWT using the Auth0 secret
        * take an argument to describe the action
            * i.e. `@require_auth(‘create:drink’)`
        * raise an error if:
            * the token is expired
            * the claims are invalid
            * the token is invalid
            * the JWT doesn’t contain the proper action
    * Project includes at least two different roles that have distinct permissions for actions. These roles and permissions are clearly defined in the project README.

* **Demonstrate validity of API behavior**
    * Includes at least one test for expected success and error behavior for each endpoint using the unittest library
    * Includes tests demonstrating role-based access control, at least two per role.

#### Third-Party Authentication
* **Configure third-party authentication systems**
Auth0 is set up and running at the time of submission. All required configuration settings are included in a bash file which export:
    * The Auth0 Domain Name
    * The JWT code signing secret
    * The Auth0 Client ID

* **Configure roles-based access control (RBAC)**
    * Roles and permission tables are configured in Auth0.
    * Access of roles is limited. Includes at least two different roles with different permissions.
    * The JWT includes the RBAC permission claims.

#### Deployment
* **Application is hosted live at student provided URL**
    * API is hosted live on Heroku or Render Cloud Platform
    * URL must be provided in project README file
    * API can be accessed by URL and requires authentication

* **Includes instructions to set up authentication**
    * Instructions must be provided in README file for setting up authentication so reviewers can test endpoints at live application endpoint

#### Code Quality & Documentation
* **Write clear, concise, and well-documented code**
    * The code adheres to the PEP 8 style guide and follows common best practices, including:
        * Variable and function names are clear.
        * Endpoints are logically named.
        * Code is commented appropriately.
    * Secrets are stored as environment variables.

* **Project demonstrates reliability and testability**
    * Application can be run with no errors and responds with the expected results.
    * API test suite for endpoints and RBAC behavior runs without errors or failures

* **Project demonstrates maintainability**
    * Variable names are logical, code is DRY and well-commented where code complexity makes them useful

* **Project includes thorough documentation**
    * Document project description in README file, including the following information:
        * Motivation for the project
        * URL location for the hosted API
        * Project dependencies, local development and hosting instructions,
        * Detailed instructions for scripts to set up authentication, install any project dependencies and run the development server.
        * Documentation of API behavior and RBAC controls

## Project Setup

1. Clone the repository: `git clone https://github.com/eduardoraider/udacity-capstone.git`
2. Navigate to the project directory: `cd backend`
3. Follow the steps below. 

## Python 3

Follow instructions to install the latest version of python for your platform in the [python docs](https://docs.python.org/3/using/unix.html#getting-and-installing-the-latest-version-of-python)


## Virtual Environment

It is recommended to work within a virtual environment whenever using Python for projects. This keeps your dependencies for each project separate and organaized. Instructions for setting up a virual enviornment for your platform can be found in the [python docs](https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/)

```bash
pip python3 -m venv venv
source venv/bin/activate
```

>**Note** - In Windows, the `env` does not have a `bin` directory. Therefore, you'd use the analogous command shown below:
```
source env/Scripts/activate
```

## PIP Dependencies
Once you have your virtual environment setup and running, install dependencies by running:

```bash
pip install -r requirements.txt
```
This will install all of the required packages we selected within the `requirements.txt` file.

## Key Dependencies
The tech stack will include the following:
 * **[Python3](https://www.python.org/)** is a programming language that lets you work quickly and integrate systems more effectively.
 * **[Flask](https://flask.palletsprojects.com/en/2.3.x/)**  is a micro web framework written in Python. It is designed to make getting started quick and easy, with the ability to scale up to complex applications. Flask is required to handle requests and responses.
 * **[virtualenv](https://virtualenv.pypa.io/en/latest/)** is a tool to create isolated Python environments.
 * **[SQLAlchemy ORM](https://www.sqlalchemy.org/)** is the Python SQL toolkit and Object Relational Mapper that gives application developers the full power and flexibility of SQL.
 * **[PostgreSQL](https://www.postgresql.org/)** is a powerful, open source object-relational database system with a strong reputation for reliability, feature robustness, and performance. 
 * **[Flask-Migrate](https://flask-migrate.readthedocs.io/en/latest/)** is an extension that handles SQLAlchemy database migrations for Flask applications using Alembic. The database operations are made available through the Flask command-line interface.
 * **[jose](https://github.com/mpdavis/python-jose)** The JavaScript Object Signing and Encryption (JOSE) technologies - JSON Web Signature (JWS), JSON Web Encryption (JWE), JSON Web Key (JWK), and JSON Web Algorithms (JWA) - collectively can be used to encrypt and/or sign content using a variety of algorithms.
 * **[Auth0](https://auth0.com/)** is a versatile identity and access management platform providing authentication and authorization services for applications, simplifying secure user access.

## Configure Environment Variables
Create the `.env` file to set up the database path as a variable to connect to the local PostgreSQL. Add the following codes:
```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/capstone?options=-c%20search_path=dbo,public"
DATABASE_TEST_URL="postgresql://postgres:postgres@localhost:5432/capstone_test?options=-c%20search_path=dbo,public"
EXCITED="true"
```

## Database setup
With Postgres up and running, restore a database using the provided `capstone_backup.psql` file. Navigate to the backend folder in the terminal and execute:
```bash
dropdb capstone
createdb capstone
psql capstone < capstone_backup.psql
```

## Auth0 Integration
To set up authentication, follow these steps:
1. Create an Auth0 account and set up a new application.
2. Update the Auth0 configuration in the `.env` file with your Auth0 domain, audience and algorithmis.

```bash
APP_AUTH0_DOMAIN=
APP_AUTH0_AUDIENCE=
APP_AUTH0_ALGORITHMS=['RS256']
```

# Running Server Locally
From within the `./backend` directory, make sure you're working within your created virtual environment.
Activate the virtual environment:
```bash
source venv/bin/activate
```
Ensure you have `.env` and `requirements.txt` available.

Finally, launch the app:
```bash
python3 app.py
```

Access the backend's status by opening [http://127.0.0.1:5000](http://127.0.0.1:5000) in your web browser. You should see the message _**"Capstone is Live!!!!! You are making excellent progress in this Udacity project."**_ displayed on the page.

To halt the backend, use the following command in the terminal:
```bash
ctrl + C
```
To deactivate the virtual environment, execute the following command:
```bash
deactivate
```

## Auth0 - Role Based Access Control (RBAC)

#### Users, Roles and Permissions

* **Casting Assistant**
    - name: Janie Doe
    - email: janie-doe@mail.com
    - password: cH8x*$H@hiRi
	
	**Can view actors and movies**
	
    ```bash
    get:movies
    get:actors
    ```
     
* **Casting Director**
    - name: Jane Doe
    - email: jane-doe@email.com
    - password: n?st=4Hoh0TH
    
	    **All permissions a Casting Assistant has and…**
	    
	    **Add or delete an actor from the database**
	
	    **Modify actors or movies**
	
    ```bash
    get:movies
    edit:movie
    get:actors
    post:actor
    edit:actor
    delete:actor
    create:casting
    delete:casting
    ```

* **Executive Producer**
    - name: John Doe
    - email: john-doe@email.com
    - password: s4m@7os?ut_B
    
	**All permissions a Casting Director has and…**
	
	**Add or delete a movie from the database**
	
    ```bash
    get:movies
    post:movie
    edit:movie
    delete:movie
    get:actors
    post:actor
    edit:actor
    delete:actor
    create:casting
    delete:casting 
    ```


### Authentication

The authentication system used for this project is Auth0. The routes contain the logic to direct the user to the Auth0 login page, manage the JWT token upon successful callback, and handle setting and retrieving the token. This token is used to manage access and actions in the frontend and passed as an Authorization header when making requests to the backend.

### Authorization

The Auth0 JWT includes claims for permissions based on the user's role within the Auth0 system. This project makes use of these claims using the `auth.can(permission)` method which checks if particular permissions exist within the JWT permissions claim of the currently logged in user. This method is then used to enable and disable buttons, and actions throughout the dashboard.


# API Documentation

## Endpoints
Below, you'll find the expected endpoints and their corresponding behaviors for managing movies, actors, and casting information.
### Movies
#### GET /movies
Returns a list of movie objects along with a success value.
- Required Permission: `get:movies`
- Sample cURL for retrieving a list of movies: 
```bash
curl -X GET 'http://127.0.0.1:5000/movies' \
-H 'Authorization: Bearer token(JWT)'
```
- Sample Response:
```json
{
  "movies": [
    {
      "id": 4,
      "image_link": "https://m.media-amazon.com/images/M/MV5BMjA4NDg3NzYxMF5BMl5BanBnXkFtZTcwNTgyNzkyNw@@._V1_QL75_UX380_CR0,0,380,562_.jpg",
      "title": "The Hunger Games"
    },
  ],
  "success": true
}
```

#### GET /movies/`<int:movie_id>`
Retrieves a single movie object along with an array of related actors data, and a success indicator.
- Required Permission: `get:movies`
- Sample cURL for retrieving the movie details: 
```bash
curl -X GET 'http://127.0.0.1:5000/movies/27' \
-H 'Authorization: Bearer token(JWT)'
```
- Sample Response:
```json
{
  "movie": {
    "actors": [
      {
        "actor_id": 27,
        "actor_name": "Jason Statham",
        "id": 72,
        "image_link": "https://m.media-amazon.com/images/M/MV5BMTkxMzk2MDkwOV5BMl5BanBnXkFtZTcwMDAxODQwMg@@._V1_QL75_UX280_CR0,6,280,414_.jpg"
      }
    ],
    "id": 27,
    "image_link": "https://m.media-amazon.com/images/M/MV5BMTM2NTU1ZTktNjc4YS00NjNhLWE4NmYtOTM2YjFjOGUzNmYzXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_QL75_UX380_CR0,0,380,562_.jpg",
    "original_date": "2023-05-19",
    "release_date": "May 19, 2023",
    "title": "Meg 2: The Trench"
  },
  "success": true
}
```

#### POST /movies/create
Create a new movie using data from the submitted form. Returns the success value, date, image, and title.
- Required Permission: `post:movie`
- Sample cURL for creating a new movie: 
```bash
curl -H "Content-Type: application/json" \
-H 'Authorization: Bearer token(JWT)' -X POST -d \
"{\"title\":\"Meg 10: The Trench\", \"date\":\"2023-05-19\", \"image\":\"https://m.media-amazon.com/images/M/MV5BMTM2NTU1ZTktNjc4YS00NjNhLWE4NmYtOTM2YjFjOGUzNmYzXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_QL75_UX380_CR0,0,380,562_.jpg\"}" \
http://127.0.0.1:5000/movies/create
```
- Sample Response:
```json
{
  "date": "2023-05-19",
  "image": "https://m.media-amazon.com/images/M/MV5BMTM2NTU1ZTktNjc4YS00NjNhLWE4NmYtOTM2YjFjOGUzNmYzXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_QL75_UX380_CR0,0,380,562_.jpg",
  "success": true,
  "title": "Meg 10: The Trench"
}
```

#### PATCH /movies/`<int:movie_id>`/edit
Edit the movie using data from the submitted form. Returns the success value, date, image, and title.
- Required Permission: `edit:movie`
- Sample cURL for editing a movie: 
```bash
curl -H "Content-Type: application/json" \
-H 'Authorization: Bearer token(JWT)' -X PATCH -d \
"{\"title\":\"Pretty Woman 2\", \"date\":\"1990-07-27\", \"image\":\"https://upload.wikimedia.org/wikipedia/en/b/b6/Pretty_woman_movie.jpg\"}" \
http://127.0.0.1:5000/movies/2/edit
```
- Sample Response:
```json
{
  "date": "July 27, 1990",
  "image": "https://upload.wikimedia.org/wikipedia/en/b/b6/Pretty_woman_movie.jpg",
  "success": true,
  "title": "Pretty Woman 2"
}
```

#### DELETE /movies/`<int:movie_id>`/delete
Delete a movie based on its ID triggered by a button click. Returns the success value and the title of the deleted movie.
- Required Permission: `delete:movie`
- Sample cURL for deleting a movie: 
```bash
curl -X DELETE 'http://127.0.0.1:5000/movies/28/delete' \
-H 'Authorization: Bearer token(JWT)'
```
- Sample Response:
```json
{
  "success": true,
  "title": "Meg 10: The Trench"
}
```

#### POST /movies/search
Retrieve movies objects based on a search term. The JSON response includes movie IDs, images, and titles.
- Required Permission: `get:movies`
- Sample cURL to search for a movie: 
```bash
curl -H "Content-Type: application/json" \
-H 'Authorization: Bearer token(JWT)' -X POST -d \
"{\"search_term\":\"pretty\"}" \
http://127.0.0.1:5000/movies/search
```
- Sample Response:
```json
{
  "movies": [
    {
      "id": 2,
      "image_link": "https://upload.wikimedia.org/wikipedia/en/b/b6/Pretty_woman_movie.jpg",
      "title": "Pretty Woman 2"
    }
  ],
  "success": true
}
```

### Actors
#### GET /actors
Retrieve a list of actor objects along with a success value.
- Required Permission: `get:actors`
- Sample cURL for retrieving a list of actors: 
```bash
curl -X GET 'http://127.0.0.1:5000/actors' \
-H 'Authorization: Bearer token(JWT)'
```
- Sample Response:
```json
{
  "actors": [
    {
      "gender": 2,
      "id": 4,
      "image_link": "https://static.wikia.nocookie.net/disneyfanon/images/d/d8/Jennifer_Lawrence.jpg",
      "name": "Jennifer Lawrence"
    },
  ],
  "success": true
}
```

#### GET /actors/`<int:actor_id>`
Retrieve a single actor object along with an array of related movies data and a success indicator.
- Required Permission: `get:actors`
- Sample cURL for retrieving actor details: 
```bash
curl -X GET 'http://127.0.0.1:5000/actors/3' \
-H 'Authorization: Bearer token(JWT)'
```
- Sample Response:
```json
{
  "actor": {
    "age": 55,
    "birthdate": "1967-10-28",
    "born": "October 28, 1967",
    "gender": 2,
    "id": 3,
    "image_link": "http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcQr8Py-a1YU77urOYldIKEOx-5WUCj3YOR4VjUzVZmbiFt2yMfraQCE3Za_e-yC3jlFxgEeV1obtjB1Qh0",
    "movies": [
      {
        "id": 94,
        "image_link": "https://upload.wikimedia.org/wikipedia/en/b/b6/Pretty_woman_movie.jpg",
        "movie_id": 2,
        "movie_title": "Pretty Woman 2"
      },
      {
        "id": 74,
        "image_link": "https://m.media-amazon.com/images/M/MV5BMWE0MmEwMWUtZjRjOC00YzE3LWI2MjctNjc3NWQ0YTVmNDQ4XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_QL75_UX380_CR0,20,380,562_.jpg",
        "movie_id": 10,
        "movie_title": "Ticket to Paradise"
      }
    ],
    "name": "Julia Roberts"
  },
  "success": true
}
```

#### POST /actors/create
Create a new actor using data from the submitted form. Returns the success value, name, age, gender, and image.
- Required Permission: `post:actor`
- Sample cURL for creating a new actor: 
```bash
curl -H "Content-Type: application/json" \
-H 'Authorization: Bearer token(JWT)' -X POST -d \
"{\"name\":\"Jason Statham\", \"birthdate\":\"1967-07-26\", \"gender\":\"1\", \"image\":\"https://m.media-amazon.com/images/M/MV5BMTkxMzk2MDkwOV5BMl5BanBnXkFtZTcwMDAxODQwMg@@._V1_QL75_UX280_CR0,6,280,414_.jpg\"}" \
http://127.0.0.1:5000/actors/create
```
- Sample Response:
```json
{
  "age": "1967-07-26",
  "gender": "1",
  "image": "https://m.media-amazon.com/images/M/MV5BMTkxMzk2MDkwOV5BMl5BanBnXkFtZTcwMDAxODQwMg@@._V1_QL75_UX280_CR0,6,280,414_.jpg",
  "name": "Jason Statham",
  "success": true
}
```

#### PATCH /actors/`<int:actor_id>`/edit
Edit an actor using data from the submitted form. Returns the success value, name, age, gender, and image.
- Required Permission: `edit:actor`
- Sample cURL for editing an actor: 
```bash
curl -H "Content-Type: application/json" \
-H 'Authorization: Bearer token(JWT)' -X PATCH -d \
"{\"name\":\"Jose Aldo Statham\", \"birthdate\":\"1967-07-26\", \"gender\":\"1\", \"image\":\"https://m.media-amazon.com/images/M/MV5BMTkxMzk2MDkwOV5BMl5BanBnXkFtZTcwMDAxODQwMg@@._V1_QL75_UX280_CR0,6,280,414_.jpg\"}" \
http://127.0.0.1:5000/actors/27/edit
```
- Sample Response:
```json
{
  "age": "1967-06-26",
  "gender": 1,
  "image": "https://m.media-amazon.com/images/M/MV5BMTkxMzk2MDkwOV5BMl5BanBnXkFtZTcwMDAxODQwMg@@._V1_QL75_UX280_CR0,6,280,414_.jpg",
  "name": "Jose Aldo Statham",
  "success": true
}
```

#### DELETE /actors/`<int:actor_id>`/delete
Delete an actor based on its ID, triggered by a button click. Returns the success value and the name of the deleted actor.
- Required Permission: `delete:actor`
- Sample cURL for deleting an actor: 
```bash
curl -X DELETE 'http://127.0.0.1:5000/actors/27/delete' \
-H 'Authorization: Bearer token(JWT)'
```
- Sample Response:
```json
{
  "name": "Jose Aldo Statham",
  "success": true
}
```

#### GET /gender/`<int:gender_id>`
Retrieve a list of actors objects by gender, accompanied by a success value.
- Required Permission: `get:actors`
- Sample cURL to retrieve actors by gender: 
```bash
curl -X GET 'http://127.0.0.1:5000/gender/1' \
-H 'Authorization: Bearer token(JWT)'
```
- Sample Response:
```json
{
  "actors": [
    {
      "gender": 1,
      "id": 5,
      "image_link": "https://static.wikia.nocookie.net/disneyfanon/images/c/c8/George_Clooney.jpg",
      "name": "George Clooney"
    },
  ],
  "success": true
}
```

#### POST /actors/search
Retrieve actors objects based on a search term. The JSON response includes actors IDs, gender ids, images, and names.
- Required Permission: `get:actors`
- Sample cURL to search for an actor: 
```bash
curl -H "Content-Type: application/json" \
-H 'Authorization: Bearer token(JWT)' -X POST -d \
"{\"search_term\":\"julia\"}" \
http://127.0.0.1:5000/actors/search
```
- Sample Response:
```json
{
  "actors": [
    {
      "gender": 2,
      "id": 3,
      "image_link": "http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcQr8Py-a1YU77urOYldIKEOx-5WUCj3YOR4VjUzVZmbiFt2yMfraQCE3Za_e-yC3jlFxgEeV1obtjB1Qh0",
      "name": "Julia Roberts"
    }
  ],
  "success": true
}
```

### Casting
#### POST /casting
Add actors to movies based on a list of actor IDs related to the movie ID. Returns the success value.
- Required Permission: `create:casting'`
- Sample cURL for adding actors to a movie: 
```bash
curl -H "Content-Type: application/json" \
-H 'Authorization: Bearer token(JWT)' -X POST -d \
"{\"movie_id\":2, \"casting_ids\":\"[3]\"}" \
http://127.0.0.1:5000/casting
```
- Sample Response:
```json
{
  "success": true
}
```

#### DELETE /casting/<int:casting_id>/delete
Remove an actor from a movie based on the actor's ID, triggered by a button click. Returns the success value.
- Required Permission: `delete:casting`
- Sample cURL for deleting an actor from a casting movie: 
```bash
curl -X DELETE 'http://127.0.0.1:5000/casting/76/delete' \
-H 'Authorization: Bearer token(JWT)'
```
- Sample Response:
```json
{
  "success": true
}
```

## Error Handling
Errors are returned as JSON objects in the following format:
```json
{
    "success": False, 
    "error": 400,
    "message": "Bad request"
}
```
The API will return one of these eight error types when requests fail:
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 505: Method Not Allowed
- 409: Conflict
- 422: Unprocessable Entity
- 500: Internal Server Error


## Testing
With Postgres running, restore the 'test' database using the provided `capstone_test.psql` file. Navigate to the backend folder in the terminal and run
```bash
dropdb capstone_test
createdb capstone_test
psql capstone_test < capstone_test.psql
```
Activate the virtual environment
```bash
source venv/bin/activate
```
Ensure you have `.env` and `requirements.txt` available.

For running tests, execute:
```bash
python3 test_app.py
```
Check the test results directly within the terminal.

----

#### 🛠 by Eduardo O. Raider
**Software Engineer**