# Vue Project Template - Todo Application

### Environments

- Dev: https://vue.project-template.development.appwi.se
- Test: TBD (waiting for Sysops)
- Staging: TBD (waiting for Sysops)
- Production: TBD (waiting for Sysops)

### Links
- API Docs: https://onboarding-todo.internal.appwi.se/api/docs
- Figma: https://www.figma.com/design/hebgv4Qx8VanMAQkO1NFpa/Onboarding-to-do?node-id=467-4945&t=ZQdFuBpxYroJec67-0
- Linear: TBD (waiting for access)

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
