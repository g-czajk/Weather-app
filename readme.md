## "Weather app"

The app shows the current weather for the given location.

The app communicates with the OpenWeatherMap.org API through a backend server created for this purpose (Node.js on Heroku) - thanks to this, the API key is not visible on the frontend (it is stored on the server as an environment variable).

The first load of data may take a little longer - the Heroku server in the free version takes a while (5-10 seconds) to wake up after being inactive.

The app saves the data of the last searched location in the `localStorage` and when the application is rebooted it loads the weather for that location.

## Aplikacja "Weather app"

Aplikacja wyświetlająca aktualną pogodę dla podanej lokalizacji.

Aplikacja komunikuje się z API OpenWeatherMap.org za pośrednictwem stworzonego w tym celu serwera backendowego (Node.js na Heroku) - dzięki temu klucz API nie jest widoczny na frontendzie (jest przechowywany na serwerze jako zmienna środowiskowa).

Pierwsze ładowanie danych może trwać trochę dłużej - serwer Heroku w wersji darmowej potrzebuje chwili (5-10 sekund) na wybudzenie po czasie nieaktywności.

Aplikacja zapisuje dane ostatniej wyszukiwanej lokalizacji w `localStorage` i przy ponownym załadowaniu aplikacji wczytuje pogodę dla tej lokalizacji.
