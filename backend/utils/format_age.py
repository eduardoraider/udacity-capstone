# Python3 code to  calculate age in years
from datetime import date
from dateutil.parser import parse


def calculateAge(born):

    today = date.today()

    try:

        dt = parse(born)

        born = date(dt.year, dt.month, dt.day)

        birthday = born.replace(year=today.year)

    # raised when birth date is February 29
    # and the current year is not a leap year
    except ValueError:

        birthday = born.replace(year=today.year,
                                month=born.month + 1, day=1)

    if birthday > today:

        return today.year - born.year - 1

    else:

        return today.year - born.year
