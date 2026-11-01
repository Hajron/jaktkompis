# Jaktkompis — forklaring av løsningen

Arbeidskrav 2, React Native med Expo og Supabase.
Bygget videre på appen fra arbeidskrav 1.

## Hva appen gjør

Jaktkompis er en app for jaktlag som er ute i terrenget samtidig — enten
noen står på post, eller flere går stykkjakt. Formålet er at laget skal
vite hvem som er ute, hvor de er og hva de gjør. Det er praktisk, men
først og fremst et sikkerhetsspørsmål: flere personer beveger seg i samme
terreng med våpen.

I arbeidskrav 1 lå dataene statisk i koden. Nå ligger de i en database,
og appen krever innlogging for å se dem.

## Hvordan kravene er løst

### Supabase med autentisering

Klienten settes opp i `lib/supabase.js`. URL og nøkkel leses fra
miljøvariabler med `EXPO_PUBLIC_`-prefiks, slik at de holdes utenfor
repoet via `.gitignore`.

`screens/LoggInnScreen.js` håndterer både registrering (`signUp`) og
innlogging (`signInWithPassword`).

I `App.js` ligger selve koblingen: `getSession()` henter en lagret økt,
og `onAuthStateChange` lytter på endringer. Finnes ingen økt, vises
innloggingsskjermen. Finnes en, vises appen.

Økten lagres i AsyncStorage, så man forblir innlogget mellom øktene.

### CRUD mot databasen

Tabellen `medlemmer` i Supabase.

- **Les:** `screens/JaktlagScreen.js` henter alle medlemmer med `select`
- **Opprett:** `screens/NyttMedlemScreen.js` lagrer nye med `insert`

Databasen bruker `snake_case` etter Postgres-konvensjon, appen bruker
`camelCase`. Funksjonen `tilAppFormat` i `JaktlagScreen.js` oversetter
mellom dem, slik at `MedlemKort` og `DetaljScreen` er uendret fra
arbeidskrav 1.

### Datahenting med useEffect

`JaktlagScreen.js` henter data i `useEffect` med tom avhengighetsliste —
altså én gang når skjermen åpnes.

En andre `useEffect` lytter på `navigation`-hendelsen `focus` og henter
på nytt når man kommer tilbake fra skjemaet. Begge returnerer en
opprydningsfunksjon som fjerner lytteren.

### Skjema med validering

To skjemaer validerer før noe sendes til serveren:

- `LoggInnScreen.js`: e-post må ha gyldig format, passord minst 6 tegn
- `NyttMedlemScreen.js`: navn, rolle og område er påkrevd; telefon er
  valgfritt, men må ha gyldig format hvis det er fylt ut

Valideringsfeil og serverfeil holdes i hver sin state, fordi de har ulik
årsak og vises ulike steder i grensesnittet.

### Navigasjon og styling fra arbeidskrav 1

Strukturen er uendret: bottom tabs med en stack i første fane. Stacken
har fått en tredje skjerm for nytt medlem.

Stilene kommer fortsatt fra `theme/theme.js` — felles farger, avstander
og typografi.

## Valg jeg har tatt

**Row Level Security.** Nøkkelen i appen gir adgang til å spørre
databasen, men policies i Supabase bestemmer hva man får svar på. Begge
policies krever `authenticated`, så en som ikke er innlogget får tom
liste. Det er derfor innlogging ikke bare er en skjerm, men det som gir
tilgang til dataene.

**Miljøvariabler.** `EXPO_PUBLIC_`-variabler bakes inn i app-bundelen og
er ikke egentlig hemmelige. Sikkerheten ligger i RLS. Miljøvariabler er
likevel riktig praksis: nøklene holdes ute av repoet, og prosjektet kan
byttes uten kodeendring.

**Tilstander utover den lykkelige stien.** Lasteindikator mens data
hentes, feilmelding hvis kallet feiler, og egen tekst når lista er tom.

**Løs kobling ved inn- og utlogging.** Verken innloggingsskjermen eller
logg ut-knappen navigerer selv. De endrer bare autentiseringstilstanden,
og `App.js` reagerer via `onAuthStateChange`.

## Gjennomgang på 2–3 minutter

1. **Appen** (30 sek) — logg inn, vis jaktlaget hentet fra databasen,
   åpne et medlem, gå til Min status og vis innlogget bruker.

2. **Innlogging** (30 sek) — `LoggInnScreen.js`: valideringen kjører før
   nettverkskallet. `App.js`: `onAuthStateChange` bytter skjerm.

3. **Datahenting** (30 sek) — `JaktlagScreen.js`: `useEffect` med tom
   avhengighetsliste, `tilAppFormat` som oversetter feltnavn.

4. **Skjema og lagring** (30 sek) — `NyttMedlemScreen.js`: send inn tomt
   skjema og vis feilmeldingene, fyll ut og lagre, vis at raden kommer i
   lista.

5. **Sikkerhet** (30 sek) — RLS i Supabase: uten innlogging, ingen data.

## Kjøre prosjektet

Se `README.md`. Supabase-nøklene følger med i innleveringen, ikke i
repoet.
