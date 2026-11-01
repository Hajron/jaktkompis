# Jaktkompis

App for jaktlag som er ute samtidig. Viser hvem som er i terrenget,
hvor de er og hva de gjør.

Arbeidskrav 2 — React Native med Expo og Supabase.

## Kjøre prosjektet

1. `npm install`
2. Kopier `.env.example` til `.env` og fyll inn Supabase-nøkler
3. `npx expo start`
4. Skann QR-koden med Expo Go

## Teknisk

- Navigasjon: bottom tabs med en stack i første fane
- Backend: Supabase (autentisering og database)
- Data hentes med `useEffect` i `screens/JaktlagScreen.js`
- Validering i `screens/LoggInnScreen.js` og `screens/NyttMedlemScreen.js`
- Row Level Security gjør at kun innloggede brukere ser data