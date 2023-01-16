# Latt API
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

**Latt API** is a Nest.js application providing REST API for the corresponding web clients (customer UI, admin UI). It's hooked to PostgreSQL database for data persistence via TypeORM.

## Quick Start

1. Install dependencies with `npm install`
2. Run `docker compose up` to start Postgres DB instance<sup>1</sup>
3. `npm run start:dev`<sup>1</sup>

_<sup>1</sup> You will need to add `.env` file with necessary [environment variables](#obfuscated-environment-variables) to the root folder when working with the app locally_

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

Swagger API documentation is available under `https://.../api`

## Deployment

_- temporarily not exposed publicly -_

## Contributing

Thank you for your interest in contributing to Latt! There are many ways to contribute to this project. Get started [here](https://github.com/latt-dev/latt-api/blob/master/.github/CONTRIBUTING.md).
