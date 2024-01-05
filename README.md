# Latt API
[![Generic badge](https://img.shields.io/badge/version-0.1.0-green.svg)](https://shields.io/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

**Latt API** is a Nest.js appl ication providing RESTful API for the corresponding web clients (customer UI, admin UI). It's hooked to PostgreSQL database for data persistence  via TypeORM.

## Quick Start

1. Install dependencies with `npm install` (requires Node v18+, see `.nvmrc` if you use NVM)
2. Add `.env` file with necessary [environment variables](#obfuscated-environment-variables) to the root folder when working with the app locally, or configure the corresponding parameters at you cloud provider's console
2. Run `docker  compose up` to start Postgres DB instance<sup>1</sup>
3. `npm run start:dev`

## Project Structure

## Obfuscated Environment Variables

Create a `.env` file with the main environment variables (you can copy and rename `./.env.example`) required to run this project before starting to work with it:

```
DB_TYPE=postgres
DB_VERSION=14.6
DB_NAME=DataBaseName
DB_USERNAME=DataBaseUserName
DB_PASSWORD=DataBasePassword
DB_VOLUME_PATH=/var/lib/postgresql/data
DB_HOST=localhost
DB_PORT=5432
LATT_JWT_SECRET_KEY=YourLattJwtSecretKeyString
LATT_JWT_EXP=24h
LATT_ADMIN_CODE=DopeLattAdminCode
```

## Documentation

Documentation following OpenAPI specification (Swagger) is available under `https://.../api`. The latest `*.json`/`*.yaml` files with it are available at `./resources` folder.

## Contributing

Thank you for your interest in contributing to Latt. Though there's no active open development process currently, there are some ways to contribute to this project if you really fancy to. Get started [here](https://github.com/latt-dev/latt-api/blob/master/.github/CONTRIBUTING.md).
