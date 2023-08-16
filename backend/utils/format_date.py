import dateutil.parser
import babel
from babel.dates import format_date, format_datetime, format_time


def format_datetime(value, format='short'):
    date = ''
    if isinstance(value, str):
        date = dateutil.parser.parse(value)
    else:
        date = value

    if format == 'full':
        format = "EEEE MMMM, d, y 'at' h:mma"
    elif format == 'medium':
        format = "EE MM, dd, y h:mma"
    elif format == 'short':
        format = "MMMM dd, y"
    return babel.dates.format_datetime(date, format, locale='en')
