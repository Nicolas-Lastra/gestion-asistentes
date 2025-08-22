# Student & Course Management (Angular 20)

> **Quick login (role-based):**
>
> - **Admin:** `admin` / `admin`
> - **User:** `user` / `user`

A lightweight training project built with **Angular 20** to manage **students**, **courses**, and **registrations**.  
It uses **MockAPI** as a fake backend for domain data, while **authentication users** are stored locally for demo purposes (see _Limitations_).

---

## Features

- **Authentication & Roles**
  - Email/password mock login
  - **Roles:** `admin` (full CRUD) and `user` (read-only + limited actions)
  - Route protection with `authGuard` and `isAdminGuard`

- **Entities**
  - **Students**: list, view, edit, delete
  - **Courses**: list, view, edit, delete
  - **Registrations**: student ↔ course creation

- **UI**
  - Angular Material / Bootstrap based layout
  - Navbar, Toolbar, Home and 404 page
  - Reusable `fullname` pipe

---

## Tech Stack & Dependencies

- **Framework:** Angular 20 (`@angular/core`, `@angular/router`, `@angular/forms`)
- **UI:** `@angular/material`, `@angular/cdk`, `bootstrap`, `@ng-bootstrap/ng-bootstrap`, `@popperjs/core`
- **State (auth demo):** `@ngrx/store`, `@ngrx/store-devtools` (scoped to auth store)
- **HTTP & Reactive:** `@angular/common/http`, `rxjs`
- **Tooling:** Angular CLI, TypeScript 5, Zone.js
- **Testing:** Karma, Jasmine

> Full list in `package.json`.

---

## Architecture Overview

- **Feature-first structure** under `src/app/features/`:
  - `students/`, `courses/`, `registrations/`, `login/`
- **Shared layer** under `src/shared/`:
  - `guards/` (`auth-guard.ts`, `is-admin-guard.ts`)
  - `pipes/` (`fullname-pipe.ts`)
  - `services/` (`auth-service.ts`)
  - `entities.ts` (domain models/interfaces)
  - `routes.ts` (route paths & **MockAPI base URL**)
- **App shell** under `src/app/`:
  - routing (`app.routes.ts`), bootstrap config, layout (`navbar/`, `toolbar/`), `home/`, `not-found-component/`
- **Store (demo)** under `src/app/store/auth/` for authentication state

**Data flow (simplified):** Components → Services/Store → HTTP (MockAPI) or LocalStorage → UI updates

---

## Backend / API

- **MockAPI Base URL:** configured in `src/shared/routes.ts` as `RoutePaths.DATABASE`  
  Example (current value):

  ```ts
  export enum RoutePaths {
    // ...
    DATABASE = 'https://689defdfce755fe6978a8fa7.mockapi.io/api/v1'
  }
  ```

- **Entities hosted on MockAPI:**
  - `students` and `courses`

---

## Limitations (by design for the course)

- **Single source of truth:** MockAPI free tier allows **only 2 tables**, so **users are not stored on MockAPI**.