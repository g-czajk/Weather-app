## Aplikacja "Weather app"

Aplikacja wyświetlająca aktualną pogodę dla podanej lokalizacji.

Aplikacja komunikuje się z API OpenWeatherMap.org za pośrednictwem stworzonego w tym celu serwera backendowego (Node.js na Heroku) - dzięki temu klucz API nie jest widoczny na frontendzie (jest przechowywany na serwerze jako zmienna środowiskowa).

Pierwsze ładowanie danych może trwać trochę dłużej - serwer Heroku w wersji darmowej potrzebuje chwili (5-10 sekund) na wybudzenie po czasie nieaktywności.

Aplikacja zapisuje dane ostatniej wyszukiwanej lokalizacji w `localStorage` i przy ponownym załadowaniu aplikacji wczytuje pogodę dla tej lokalizacji.
