from controllers.index import init_routes

from controllers.actors.create_actor import route_create_actor
from controllers.actors.delete_actor import route_delete_actor
from controllers.actors.edit_actor import route_edit_actor
from controllers.actors.get_actor_by_id import route_get_actor
from controllers.actors.get_actors_by_gender import route_gets_actors_by_gender
from controllers.actors.get_all_actors import route_get_all_actors
from controllers.actors.search_actors import route_search_actor

from controllers.movies.create_movie import route_create_movie
from controllers.movies.delete_movie import route_delete_movie
from controllers.movies.edit_movie import route_edit_movie
from controllers.movies.get_all_movies import route_get_all_movies
from controllers.movies.get_movie_by_id import route_get_movie
from controllers.movies.search_movies import route_search_movie

from controllers.casting.create_casting import route_create_casting
from controllers.casting.delete_casting import route_delete_casting


def app_routes(app):

    init_routes(app)

    route_create_actor(app)
    route_delete_actor(app)
    route_edit_actor(app)
    route_get_actor(app)
    route_gets_actors_by_gender(app)
    route_get_all_actors(app)
    route_search_actor(app)

    route_create_movie(app)
    route_delete_movie(app)
    route_edit_movie(app)
    route_get_all_movies(app)
    route_get_movie(app)
    route_search_movie(app)

    route_create_casting(app)
    route_delete_casting(app)
