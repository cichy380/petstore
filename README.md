# Petstore

Projekt został wygenerowany przy użyciu [Angular CLI](https://github.com/angular/angular-cli) i bazuje na testowym [Swagger Petstore API](https://petstore.swagger.io/#/store). Jest to prosta, przykładowa aplikacja typu CRUD, która umożliwia tabelaryczną prezentację danych z funkcjami przeszukiwania, filtrowania, sortowania i stronicowania. Aplikacja pozwala również na dodawanie nowych elementów (pet), modyfikację oraz usuwanie istniejących rekordów. Dzięki wykorzystaniu reaktywnego zarządzania stanem widok aplikacji jest aktualizowany w czasie rzeczywistym.

## Instalacja i uruchomienie

#### Instalacja zależności

```bash
npm install
```

#### Uruchomienie aplikacji

```bash
npm start
```

#### Testy jednostkowe (Jasmine/Karma)
```bash
npm run test
```
Projekt zawiera dwa testy prostych funkcji oraz przykładowy test bardziej złożonej implementacji - metody `PetRepository.selectPetListItems()` do wyciągania danych z obsługą wyszukiwania, sortowania i stronicowania.

#### Testy e2e (Cypress)
```bash
npm run e2e
```
Projekt zawiera jeden prosty, przykładowy test, który sprawdza dodanie nowego elementu.

## Architektura

Aplikacja została zaprojektowana w oparciu o warstwową architekturę, z jasnym podziałem odpowiedzialności pomiędzy poszczególne warstwy:

* **`/ui`** – warstwa prezentacji, z komponentami Angulara odpowiedzialnymi za wyświetlenie danych oraz obsługę interakcji z użytownikiem. Warstwa zleżna wyłącznie od interfejsów (`/api`). 
* **`/api`** – warstwa będąca interfejsem dla aplikacji. Zawiera modele oraz abstrakcyjne serwisy.
* **`/domain`** – warstwa logiki biznesowej, w której znajdują się implementacje abstrakcyjnych serwisów z warstwy `/api`. W przypadku konieczności realizacji np. specyficznych kalkulacji, pobierania i łączenia danych z różnych części aplikacji lub ich obróbki - to odpowiednie miejsce.  
* **`/infrastructure`** – warstwa odpowiedzialna za szczegóły techniczne, takie jak komunikacja z serwerem (HTTP), magazynowanie danych w store NGRX oraz integracje z zewnętrznymi systemami.

Rozdzielenie warstw aplikacji w połączeniu z użyciem abstrakcyjnych serwisów pozwala na pełną niezależność poszczególnych elementów, zapewniając schludność kodu oraz zgodność z zasadami SOLID i wzorcami projektowymi. Dzięki temu kod aplikacji jest łatwy w utrzymaniu, testowaniu oraz rozszerzaniu – warstwy są od siebie odseparowane, przez co zmiany w jednej z nich nie wpływają bezpośrednio na pozostałe.

### Zarządzanie stanem

Do zarządzania stanem aplikacji wykorzystano NGRX, co umożliwia implementację wzorca CQRS, zapewniającego przejrzystość oraz oddzielenie operacji odczytu i zapisu danych. Zastosowanie [NGRX Entity](https://ngrx.io/guide/entity) upraszcza zarządzanie złożonymi kolekcjami danych, co czyni je idealnym rozwiązaniem w przypadku aplikacji typu CRUD.

### Routing

Aplikacja wykorzystuje standalone komponenty, co pozwala na uproszczenie konfiguracji i eliminację potrzeby stosowania `NgModules`. System routingu został skonfigurowany w taki sposób, że główny widok aplikacji (`PetRootComponent`) jest ładowany natychmiast, natomiast pozostałe widoki ładowane są leniwie (lazy loading). Podejście to optymalizuje wydajność aplikacji.

## Obsługa błędów

W aplikacji zaimplementowano kompleksowy mechanizm obsługi błędów:

- Z poziomu pliku *efektów* ([@ngrx/effects](https://ngrx.io/guide/effects)) przechwytywane są wszystkie możliwe błędy API zgodnie z dokumentacją [Swagger Petstore](https://petstore.swagger.io/#/pet/) (HTTP status codes: 400, 404, 405). Mechanizm ten pozwala na odpowiednią reakcję aplikacji w przypadku przewidzianych błędów po stronie serwera.

- Pozostałe, nieoczekiwane błędy serwera (statusy HTTP 500 i wyższe) oraz błędy spowodowane problemami z połączeniem internetowym są obsługiwane przez dedykowany interceptor `httpErrorInterceptor`. Interceptor ten zapewnia centralne zarządzanie krytycznymi błędami po stronie klienta.

- Aby poprawić obsługę błędów związanych z połączeniem internetowym, zaimplementowano również `retryInterceptor`, który automatycznie podejmuje próbę ponownego nawiązania połączenia w przypadku wykrycia problemu.

Warstwa `domain` w aplikacji wykonuje przykładową sanityzację danych wprowadzanych przez użytkownika, usuwając zbędne spacje oraz potencjalny kod HTML.

Dodatkowo aplikacja demonstruje mechanizm walidacji formularzy oparty o wbudowany `Validators` oraz [Reactive forms](https://angular.dev/guide/forms/reactive-forms) Angulara.

## Technologie

Aplikacja została zbudowana przy użyciu poniższych technologii:

- **Angular** 19.1.5 – framework frontendowy oparty o TypeScript, umożliwiający budowę dynamicznych i wydajnych aplikacji typu SPA (ang. Single Page Application) z czytelną strukturą i wsparciem dla najlepszych praktyk w branży.

- **NgRx** 19.0.1 – biblioteka do zarządzania stanem aplikacji oparta na wzorcu Redux, pozwalająca na przejrzyste zarządzanie skomplikowanym stanem aplikacji. Współpracuje z [@ngrx/entity](https://ngrx.io/guide/entity), co znacznie upraszcza operacje na kolekcjach danych w aplikacjach typu CRUD.

- **Angular Material** 19.1.3 – zestaw gotowych komponentów UI dostosowany do specyfikacji Material Design, m.in. [`mat-table`](https://material.angular.io/components/table), [`MatDialog`](https://material.angular.io/components/dialog), [`MatSnackBar`](https://material.angular.io/components/snack-bar) oraz komponentów formularzy. Umożliwia szybką budowę responsywnych i estetycznych interfejsów użytkownika.

- **Tailwind CSS** 3.4.17 – framework CSS oparty na klasach narzędziowych, umożliwiający szybkie i elastyczne stylowanie komponentów przy pełnej kontroli nad wyglądem aplikacji.

- **Cypress** 14.0.2 – nowoczesne narzędzie do testów end-to-end, które pozwala na tworzenie i wykonywanie testów automatycznych, jednocześnie zapewniając intuicyjny debugging i przejrzystość w diagnostyce aplikacji.
