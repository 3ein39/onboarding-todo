# Project

### Environments

- Dev: https://vue.project-template.development.appwi.se
- Test: REPLACE_ME
- Staging: REPLACE_ME
- Production: REPLACE_ME

### Links
- Docs: https://vue.project-template.development.appwi.se/api/docs
- Linear: REPLACE_ME

# Startup sequence

## Prep week

- Designs grondig bekijken
  - Custom components oplijsten
  - Design tokens exporteren
  - Feedback geven
  - Kijken of er onlogische flows / componenten zijn
  - Check of success én error flow er zijn voor formulieren
  - Check of custom SVG elements klaar staan
  - Check voor mobile designs, tablet en 4K schermen waar nodig
- Tickets bekijken in Linear
  - Is de informatie duidelijk
  - Missen er zaken?
  - E2E-test tickets toevoegen
- Ticket aanmaken voor sysops voor repo / pipelines
- Project template updaten/forken
- Nodige aanpassingen maken in de vue-core
- Component architecture tekenen
- Meet the team
  - wie is lead BE
  - wie is PM, Designer

## First day

- ENV variabelen instellen
  - Sysops’s contacteren
- Design tokens uit figma overnemen
  - Export maken
- Readme aanpassen
  - Link naar Linear, API documentatie, omgevingen
- Authentication
  - Login implementeren (Zitadel, …)
  - 1Password instellen
  - Login credentials
  - ENV variabelen
- Navigation stack
  - Sidebar/topbar menu items
  - Work in progress views toevoegen
- Eerste deploy naar development

## First week
- Sentry config
- Weblate config (optioneel)
- Types generen a.d.h.v. OpenAPI spec

## Permanent tasks
- Write Playwright tests
- Accessibility checks
