# Full Stack Web Developer

### **Udacity Final Project: Full Stack Capstone**

Stars Casting Agency, also known as the Capstone Project, is the final project of the Udacity Full Stack Web Developer program. This final project of the course was developed by Eduardo Raider - Software Engineer.

## Motivation

The project's objective is to engineer a robust database-backend web API with user access controls. This entails the development of secured endpoints designed access management protocols, complemented by a front-end interface optimized to efficiently consume and interact with this data while maintaining the access controls.

This initiative proposes to build a dashboard for a talent casting agency. This dashboard integrates both backend and frontend components, to meet distinct roles encompassing Executive Producers, Casting Directors, and Casting Assistants. The permissions for each role can be found in detail within the respective READMEs for both the frontend and backend through the provided links.

This project serves as a testament to the comprehensive skill set honed during the Udacity Full Stack Web Developer program. The proficiencies showcased span across SQL proficiency and adeptness in data modeling for web applications, anchored in the application of CRUS (Create, Read, Update, Delete) operations bolstered by state-of-the-art Object-Relational Mapping (ORM) techniques. The project encapsulates a diverse gamut of competencies, encompassing API development, documentation, API testing, Identity Access Management, and the orchestration of role-based access controls (RBAC) across the technology stack.

Furthermore, the scope of this project extends to the domains of server deployment, underpinned by the encapsulation of applications within containers for portability and scalability, continuous integration and continuous deployment (CI/CD) pipeline to comprehension of the software development lifecycle.

In essence, this project constitutes a synthesis of acquired knowledge and expertise during the Udacity Full Stack Web Developer Nanodegree program.

#### General Specifications
 * Models will include at least…
	 * Two classes with primary keys at at least two attributes each
	[ * Optional but encouraged] One-to-many or many-to-many relationships between classes
 * Endpoints will include at least…
	 * Two GET requests
	 * One POST request
	 * One PATCH request
	 * One DELETE request
 * Roles will include at least…
	 * Two roles with different permissions
	 * Permissions specified for all endpoints
 * Tests will include at least….
	 * One test for success behavior of each endpoint
	 * One test for error behavior of each endpoint
	 * At least two tests of RBAC for each role

#### Casting Agency Specifications
 * The Casting Agency models a company that is responsible for creating movies and managing and assigning actors to those movies. You are an Executive Producer within the company and are creating a system to simplify and streamline your process.
 * Models:
	 * Movies with attributes title and release date
	 * Actors with attributes name, age and gender
 * Endpoints:
	 * GET /actors and /movies
	 * DELETE /actors/ and /movies/
	 * POST /actors and /movies and
	 * PATCH /actors/ and /movies/
 * Roles:
	 * Casting Assistant
		 * Can view actors and movies
	 * Casting Director
		 * All permissions a Casting Assistant has and…
		 * Add or delete an actor from the database
		 * Modify actors or movies
	 * Executive Producer
		 * All permissions a Casting Director has and…
		 * Add or delete a movie from the database
 * Tests:
		 * One test for success behavior of each endpoint
		 * One test for error behavior of each endpoint
		 * At least two tests of RBAC for each role

## Hosted Live App

The live application is hosted at: [https://udacity-capstone-frontend.vercel.app/](https://udacity-capstone-frontend.vercel.app/)

**_Access credentials for tests are located in the [frontend README.md](./frontend/README.md)_**

# About the Stack

This application's backbone comprises Python and Flask for the backend, and React with Vite for the frontend – a perfect blend of technologies for robustness and efficiency. The database runs on PostgreSQL while Auth0 ensures secure access control. The dynamic hosting platform, Vercel [https://vercel.com/](https://vercel.com/), seamlessly hosts both the frontend and backend, resulting in a harmonious user experience.

## Backend

The `./backend` directory contains a completed application built using Python, Flask, SQLAlchemy, PostgreSQL, and Auth0 to provide a robust API for managing casting information, movies and actors. This project aims to demonstrate proficiency in backend development and security practices.

[View the README.md within ./backend for more details and setup instructions.](./backend/README.md)

## Frontend

The `./frontend` directory contains a complete React frontend to present users with an intuitive interface for seamless data consumption from the Flask server. This frontend project aims to showcase the skills acquired during the Udacity Full Stack Web Developer program.

[View the README.md within ./frontend for more details and setup instructions.](./frontend/README.md)

# Acknowledgements

I would like to express my sincere gratitude to all the individuals who have contributed to my journey through the Full Stack Web Developer Nanodegree program at Udacity. This learning experience has been incredibly enriching, and I am thankful for the support, guidance, and encouragement I have received along the way.

## Teachers and Instructors

I extend my heartfelt thanks to the dedicated teachers and instructors who have shared their expertise and knowledge with me throughout this program. Your well-structured lessons, real-world examples, and insightful explanations have been instrumental in shaping my understanding of full-stack web development concepts.

## Tutors and Mentors

I would like to acknowledge the tutors and mentors who have patiently answered my questions, provided valuable feedback on my projects, and helped me overcome challenges. Your willingness to assist and your commitment to my learning have been truly appreciated.

## Udacity Team

To the entire Udacity team, thank you for creating an outstanding learning environment. The well-designed curriculum, interactive projects, and hands-on exercises have been essential in helping me build practical skills and confidence as a full-stack web developer.

## Colleagues and Peers

I am grateful for the collaboration and camaraderie I've experienced with my fellow learners. Interacting with my peers, discussing ideas, and working on group projects have enhanced my learning journey and provided a sense of community.

## Family and Friends

Last but not least, I would like to thank my family and friends for their unwavering support, patience, and encouragement. Your belief in me has been a driving force behind my success in this program.

This Full Stack Web Developer Nanodegree program has been an incredible chapter in my learning journey, and I am excited to apply the skills and knowledge I've gained to real-world projects. Thank you, everyone, for being part of this amazing experience.

____

#### 🛠 by Eduardo O. Raider
**Software Engineer**