**Purpose**
- This file tells AI coding agents how this Ionic + Angular project is structured and which workflows and files are important to be productive quickly.

**Quick Start (reproducible steps)**
- Change into the app folder: `cd mobile_ionic`
- Install deps: `npm install` (or `npm ci` in CI)
- Run dev server: `npm run start` (runs `ng serve`) or `ionic serve` if Ionic CLI is available
- Build for production: `npm run build`
- Run tests: `npm run test`; lint: `npm run lint`

**Big-picture architecture**
- This is an Ionic (v8) app built with Angular (v20) using standalone components and the Angular Router's `loadComponent` lazy-loading. See `src/app/app.routes.ts` for routes and lazy-loaded pages.
- UI pages live inside `src/app/` as standalone components (e.g. `home/home.page`, `list-movies/list-movies.page`, `movie-details/movie-details.page`). Each page follows the `*.page.ts` / `*.page.html` / `*.page.scss` pattern.
- Network logic is encapsulated in services under `src/app/services/`. The main example is `src/app/services/movie.service.ts` which wraps TMDB API calls and returns RxJS `Observable`s.
- App-level configuration (API endpoints & keys) is in `src/app/config/tmdb.config.ts` — this is where the TMDB API key must be provided.
- Capacitor is used for native integration; check `capacitor.config.ts` at project root for appId, appName and `webDir`.

**Project-specific conventions & patterns**
- Standalone components: components import framework pieces directly (see `src/app/app.component.ts` which imports `IonApp` and `IonRouterOutlet`). Prefer `loadComponent` lazy-loading in routes.
- Services are provided in root via `@Injectable({ providedIn: 'root' })`. Use them by injecting in page constructors and subscribe or use `async` pipes.
- API calls include `language=pt-BR` query parameter by default. Expect Portuguese responses/formats in UI.
- Image URLs use `TMDB_CONFIG.imageBase` (see `tmdb.config.ts`).

**Concrete examples agents will use**
- To add a new API call: update `src/app/services/movie.service.ts` and follow the existing pattern (use `TMDB_CONFIG.baseUrl` and `TMDB_CONFIG.apiKey`).
- To change a route: edit `src/app/app.routes.ts` and use the `loadComponent` pattern for the new page component.
- To add a UI page: create `src/app/<page>/<page>.page.ts`, `.html`, `.scss` and export the standalone component; then register it in `app.routes.ts`.

**Secrets & config**
- Replace `SUA_API_KEY_AQUI` in `src/app/config/tmdb.config.ts` with a valid TMDB key. The project expects the API key in that file (no environment variable wiring present). Do not hardcode other secrets without checking with the repo owner.

**Build, debug and device notes**
- For browser debugging: `npm run start` then open devtools and watch network calls from `movie.service.ts` to TMDB endpoints.
- Capacitor workflow (if testing on device/emulator): after building web assets run `npx cap sync` and then `npx cap open android` / `npx cap open ios`.

**Tests & linting**
- Unit tests use Karma/Jasmine. Run `npm run test` from `mobile_ionic`.
- Lint with `npm run lint` (configured in `mobile_ionic/package.json`).

**When editing, follow these minimal rules**
- Preserve standalone component patterns and `loadComponent` usage.
- Keep API calls in services (do not move network calls into pages directly).
- Update `tmdb.config.ts` if changing endpoints or image base paths.

**Where to look for more context**
- Routing: `src/app/app.routes.ts`
- API client: `src/app/services/movie.service.ts`
- TMDB config / API key: `src/app/config/tmdb.config.ts`
- Root project config: `mobile_ionic/package.json`, `ionic.config.json`, `capacitor.config.ts`

If anything here is unclear or you want a different level of detail (for example, example PR templates, preferred commit messages, or CI commands), tell me what to expand and I will iterate.
