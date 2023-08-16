# Frontend - Full Stack Web Developer

### **Udacity Final Project: Full Stack Capstone - Stars Casting**

The Stars Casting Agency frontend has been constructed utilizing the React framework, powered by the Vite toolchain for enhanced performance. Authentication and role-based management have been seamlessly integrated using Auth0, ensuring controlled access for distinct user roles.

Designed as an efficient data consumer, the frontend seamlessly interacts with the backend through designated endpoints, facilitating the seamless retrieval and display of crucial cast, movie, and actor information. This interface provides users with an intuitive and accessible platform to oversee and administer the casting of the agency.

The overarching objective of this endeavor is to demonstrate the culmination of proficiencies cultivated throughout the Udacity Full Stack Web Developer program. This frontend project stands as a testament to the adept utilization of modern technologies in tandem with established best practices, resulting in a robust and user-centric solution.

## Hosted Live Frontend

The live frontend application is hosted at: [https://udacity-capstone-frontend.vercel.app/](https://udacity-capstone-frontend.vercel.app/)

## Project Setup

> _tip_: this frontend is designed to work with [Flask-based Backend](../backend). It is recommended you stand up the backend first and then the frontend should integrate smoothly.


1. Clone the repository: `git clone https://github.com/eduardoraider/udacity-capstone.git`
2. Navigate to the project directory: `cd frontend`
3. Follow the steps below. 

## Installing Dependencies Node and NPM

This project depends on Nodejs and Node Package Manager (NPM). Before continuing, you must download and install Node (the download includes NPM) from [https://nodejs.com/en/download](https://nodejs.org/en/download/). 

>_tip_: **npm i** is shorthand for **npm install**

```bash
npm install
```
After successfully installing the Node, verify the installation as shown below.

```bash
node -v
npm -v
```

## Configure Environment Variables

Create the `.env` file and update with backend base URL.
```bash
VITE_REACT_APP_BASE_URL=http://127.0.0.1:5000
```

## Auth0 Integration

To set up authentication, follow these steps:
1. If you didn't create it in the backend configuration, create an Auth0 account and set up a new application.
2. Update the Auth0 configuration in the `.env` file with your Auth0 domain, audience and client ID

```bash
VITE_REACT_APP_AUTH0_DOMAIN=
VITE_REACT_APP_AUTH0_AUDIENCE=
VITE_REACT_APP_AUTH0_CLIENT_ID=
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

## Running Frontend in Dev Mode

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits.


To stop the frontend, simply use the following command in the terminal:
```bash
ctrl + C
```

----

#### 🛠 by Eduardo O. Raider
**Software Engineer**