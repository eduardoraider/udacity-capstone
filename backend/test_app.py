import os
import unittest
import json
from flask_sqlalchemy import SQLAlchemy
from app import create_app
from server import setup_db
from models.actor import Actor
from models.movie import Movie
from models.casting import Casting
from dotenv import load_dotenv
load_dotenv()

database_path = os.getenv('DATABASE_TEST_URL')
if database_path.startswith("postgres://"):
    database_path = database_path.replace("postgres://", "postgresql://", 1)

class CapstoneTestcase(unittest.TestCase):
    """This class represents the Capstone test case"""

    def setUp(self):
        """Define test variables and initialize app."""
        self.app = create_app()
        self.client = self.app.test_client
        self.database_path = database_path
        setup_db(self.app, self.database_path)

        # binds the app to the current context
        with self.app.app_context():
            self.db = SQLAlchemy()
            self.db.init_app(self.app)
            # create all tables
            self.db.create_all()

        # Auth0 conf. for testing
        with open('auth_config_test.json', 'r') as f:
            self.auth_test = json.loads(f.read())

        jwt_role_assistant = self.auth_test['roles']
        ['CastingAssistant']['jwt_token']
        jwt_role_director = self.auth_test['roles'][
            'CastingDirector']['jwt_token']
        jwt_role_producer = self.auth_test['roles']
        ['ExecutiveProducer']['jwt_token']
        self.auth_headers = {
            'CastingAssistant': f'Bearer {jwt_role_assistant}',
            'CastingDirector': f'Bearer {jwt_role_director}',
            'ExecutiveProducer': f'Bearer {jwt_role_producer}'
        }

    def tearDown(self):
        """Executed after reach test"""
        pass

    """ ACTORS """

    def test_get_actors(self):
        header_obj = {
            'Authorization': self.auth_headers['CastingAssistant']
        }
        res = self.client().get('/actors', headers=header_obj)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertTrue(data['success'])
        self.assertIn('actors', data)

    def test_get_actor_by_id(self):
        header_obj = {
            'Authorization': self.auth_headers['CastingAssistant']
        }
        res = self.client().get('/actors/19', headers=header_obj)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertTrue(data['success'])
        self.assertIn('actor', data)

    def test_404_get_actor_by_id(self):
        header_obj = {
            'Authorization': self.auth_headers['CastingAssistant']
        }
        res = self.client().get('/actors/190', headers=header_obj)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 404)
        self.assertEqual(data['success'], False)
        self.assertEqual(data['message'], 'Error 404 / Not Found')

    def test_get_actors_by_gender(self):
        header_obj = {
            'Authorization': self.auth_headers['CastingAssistant']
        }
        res = self.client().get('/gender/1', headers=header_obj)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertTrue(data['success'])
        self.assertIn('actors', data)

    def test_search_movies(self):
        header_obj = {
            'Authorization': self.auth_headers['CastingAssistant']
        }

        search_term = {'search_term': 'anne hathaway'}

        res = self.client().post('/actors/search', headers=header_obj,
                                 json=search_term)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertTrue(data['success'])
        self.assertIn('actors', data)

    def test_400_search_movies(self):
        header_obj = {
            'Authorization': self.auth_headers['CastingAssistant']
        }

        search_term = {'search_term': ''}

        res = self.client().post('/actors/search', headers=header_obj,
                                 json=search_term)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 400)
        self.assertEqual(data['success'], False)
        self.assertEqual(data['message'], 'Error 400 / Bad Request')

    def test_create_actor(self):
        header_obj = {
            'Authorization': self.auth_headers['CastingDirector']
        }
        actor = {
            'name': 'Jason Statham',
            'birthdate': '1967-07-26 00:00:00',
            'gender': 1,
            'image': 'https://m.media-amazon.com/images/M/MV5BMTkxMzk2MDkwOV5BMl5BanBnXkFtZTcwMDAxODQwMg@@._V1_QL75_UX280_CR0,6,280,414_.jpg'
        }
        res = self.client().post('/actors/create', headers=header_obj,
                                 json=actor)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data["success"], True)
        self.assertTrue(data["name"], actor['name'])
        self.assertTrue(data["age"], actor['birthdate'])
        self.assertTrue(data["gender"], actor['gender'])
        self.assertTrue(data["image"], actor['image'])

    def test_422_create_actor(self):
        header_obj = {
            'Authorization': self.auth_headers['CastingDirector']
        }
        actor = {
            'name': 'Jason Statham',
            'birthdate': '',
            'gender': 1,
            'image': ''
        }
        res = self.client().post('/actors/create', headers=header_obj,
                                 json=actor)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 422)
        self.assertEqual(data['success'], False)
        self.assertEqual(data['message'], 'Error 422 / Unprocessable Entity')

    def test_edit_actor(self):
        header_obj = {
            'Authorization': self.auth_headers['CastingDirector']
        }
        actor = {
            'name': 'Jose Aldo Statham',
            'birthdate': '1986-09-09 00:00:00',
            'gender': 1,
            'image': 'https://www.sherdog.com/image_crop/200/300/_images/fighter/20220401042107_Jose_Aldo_ff.JPG'
        }
        res = self.client().patch('/actors/7/edit', headers=header_obj,
                                  json=actor)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data["success"], True)
        self.assertTrue(data["name"], actor['name'])
        self.assertTrue(data["age"], actor['birthdate'])
        self.assertTrue(data["gender"], actor['gender'])
        self.assertTrue(data["image"], actor['image'])

    def test_404_edit_actor(self):
        header_obj = {
            'Authorization': self.auth_headers['CastingDirector']
        }
        actor = {
            'name': 'Jose Aldo Statham',
            'birthdate': '1986-09-09 00:00:00',
            'gender': 1,
            'image': 'https://www.sherdog.com/image_crop/200/300/_images/fighter/20220401042107_Jose_Aldo_ff.JPG'
        }
        res = self.client().patch('/actors/80/edit', headers=header_obj,
                                  json=actor)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 404)
        self.assertEqual(data['success'], False)
        self.assertEqual(data['message'], 'Error 404 / Not Found')

    def test_delete_actor(self):
        header_obj = {
            'Authorization': self.auth_headers['ExecutiveProducer']
        }

        res = self.client().delete('/actors/11/delete', headers=header_obj)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertTrue(data['success'])

    def test_404_delete_actor(self):
        header_obj = {
            'Authorization': self.auth_headers['ExecutiveProducer']
        }

        res = self.client().delete('/actors/120/delete', headers=header_obj)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 404)
        self.assertEqual(data['success'], False)
        self.assertEqual(data['message'], 'Error 404 / Not Found')

    """ MOVIES """

    def test_get_movies(self):
        header_obj = {
            'Authorization': self.auth_headers['CastingAssistant']
        }
        res = self.client().get('/movies', headers=header_obj)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertTrue(data['success'])
        self.assertIn('movies', data)

    def test_get_movie_by_id(self):
        header_obj = {
            'Authorization': self.auth_headers['CastingAssistant']
        }
        res = self.client().get('/movies/14', headers=header_obj)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertTrue(data['success'])
        self.assertIn('movie', data)

    def test_404_get_movie_by_id(self):
        header_obj = {
            'Authorization': self.auth_headers['CastingAssistant']
        }
        res = self.client().get('/movies/300', headers=header_obj)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 404)
        self.assertEqual(data['success'], False)
        self.assertEqual(data['message'], 'Error 404 / Not Found')

    def test_search_movies(self):
        header_obj = {
            'Authorization': self.auth_headers['CastingAssistant']
        }

        search_term = {'search_term': 'rocky'}

        res = self.client().post('/movies/search', headers=header_obj,
                                 json=search_term)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertTrue(data['success'])
        self.assertIn('movies', data)

    def test_400_search_movies(self):
        header_obj = {
            'Authorization': self.auth_headers['CastingAssistant']
        }

        search_term = {'search_term': ''}

        res = self.client().post('/movies/search', headers=header_obj,
                                 json=search_term)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 400)
        self.assertEqual(data['success'], False)
        self.assertEqual(data['message'], 'Error 400 / Bad Request')

    def test_create_movies(self):
        header_obj = {
            'Authorization': self.auth_headers['ExecutiveProducer']
        }
        movie = {
            'title': 'Meg 2: The Trench',
            'image': 'https://m.media-amazon.com/images/M/MV5BMTM2NTU1ZTktNjc4YS00NjNhLWE4NmYtOTM2YjFjOGUzNmYzXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_QL75_UX380_CR0,0,380,562_.jpg',
            'date': '2023-05-19 00:00:00',
        }
        res = self.client().post('/movies/create', headers=header_obj,
                                 json=movie)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertTrue(data['success'])
        self.assertEqual(data['title'], movie['title'])
        self.assertEqual(data['image'], movie['image'])
        self.assertEqual(data['date'], movie['date'])

    def test_422_create_movies(self):
        header_obj = {
            'Authorization': self.auth_headers['ExecutiveProducer']
        }
        movie = {
            'title': 'Meg 2: The Trench',
            'image': '',
            'date': '2023-05-19 00:00:00',
        }
        res = self.client().post('/movies/create', headers=header_obj,
                                 json=movie)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 422)
        self.assertEqual(data['success'], False)
        self.assertEqual(data['message'], 'Error 422 / Unprocessable Entity')

    def test_edit_movie(self):
        header_obj = {
            'Authorization': self.auth_headers['CastingAssistant']
        }
        movie = {
            'title': 'Super Big Strong Meg 2: The Trench',
            'image': 'https://m.media-amazon.com/images/M/MV5BMTM2NTU1ZTktNjc4YS00NjNhLWE4NmYtOTM2YjFjOGUzNmYzXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_QL75_UX380_CR0,0,380,562_.jpg',
            'date': '2023-05-19 00:00:00',
        }
        res = self.client().patch('/movies/17/edit', headers=header_obj,
                                  json=movie)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertTrue(data['success'])
        self.assertEqual(data['title'], movie['title'])
        self.assertEqual(data['image'], movie['image'])
        self.assertEqual(data['date'], movie['date'])

    def test_404_edit_movie(self):
        header_obj = {
            'Authorization': self.auth_headers['CastingDirector']
        }
        movie = {
            'title': 'Big Strong Meg 2: The Trench',
            'image': 'https://m.media-amazon.com/images/M/MV5BMTM2NTU1ZTktNjc4YS00NjNhLWE4NmYtOTM2YjFjOGUzNmYzXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_QL75_UX380_CR0,0,380,562_.jpg',
            'date': '2023-05-19 00:00:00',
        }
        res = self.client().patch('/movies/60/edit', headers=header_obj,
                                  json=movie)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 404)
        self.assertEqual(data['success'], False)
        self.assertEqual(data['message'], 'Error 404 / Not Found')

    def test_delete_movie(self):
        header_obj = {
            'Authorization': self.auth_headers['ExecutiveProducer']
        }

        res = self.client().delete('/movies/6/delete', headers=header_obj)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertTrue(data['success'])

    def test_404_delete_movie(self):
        header_obj = {
            'Authorization': self.auth_headers['ExecutiveProducer']
        }

        res = self.client().delete('/movies/300/delete', headers=header_obj)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 404)
        self.assertEqual(data['success'], False)
        self.assertEqual(data['message'], 'Error 404 / Not Found')

    """ CASTING """

    def test_create_casting(self):
        header_obj = {
            'Authorization': self.auth_headers['CastingDirector']
        }
        casting = {
            'movie_id': '25',
            'casting_ids': '[26]',
        }

        res = self.client().post('/casting', headers=header_obj,
                                 json=casting)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertTrue(data['success'])

    def test_401_unauthorized_create_casting(self):
        header_obj = {
            'Authorization': self.auth_headers['CastingAssistant']
        }
        casting = {
            'movie_id': '',
            'casting_ids': '',
        }

        res = self.client().post('/casting', headers=header_obj,
                                 json=casting)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 401)
        self.assertEqual(data['success'], False)
        self.assertEqual(data['message'], 'Error 401 / Unauthorized')

    def test_delete_casting(self):
        header_obj = {
            'Authorization': self.auth_headers['CastingDirector']
        }
        res = self.client().delete('/casting/24/delete', headers=header_obj)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertTrue(data['success'])

    def test_404_delete_non_existing_casting(self):
        header_obj = {
            'Authorization': self.auth_headers['CastingDirector']
        }
        res = self.client().delete('/casting/120/delete', headers=header_obj)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 404)
        self.assertEqual(data['success'], False)
        self.assertEqual(data['message'], 'Error 404 / Not Found')


# Make the tests conveniently executable
if __name__ == "__main__":
    unittest.main()
