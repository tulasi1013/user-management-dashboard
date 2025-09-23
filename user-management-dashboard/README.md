# User Management Dashboard

A simple, responsive User Management Dashboard built with React + TypeScript + Vite. It demonstrates CRUD flows against JSONPlaceholder `/users` endpoint with client-side pagination, sorting, searching, and filtering.

- Fetch users from JSONPlaceholder
- Add, edit, delete users (simulated persistence via JSONPlaceholder responses)
- Client-side pagination with page size options (10, 25, 50, 100)
- Search (global) and filter (first name, last name, email, department)
- Sorting by any column
- Responsive UI
- Error handling and client-side validation with `react-hook-form` + `zod`

## Tech Stack
- React 18, TypeScript, Vite
- Axios for HTTP
- React Hook Form + Zod for forms and validation

## Getting Started

Requirements: Node.js 18+

```bash
# install dependencies
npm install

# start dev server
npm run dev

# build for production
npm run build
npm run preview
```

Open the printed local URL in your browser to view the app.

## Notes and Assumptions
- JSONPlaceholder does not persist changes. POST/PUT/DELETE return simulated responses; the UI performs optimistic updates to reflect changes.
- JSONPlaceholder returns 10 users; pagination works on the current dataset. You can change page size to see paging behavior or duplicate data locally if desired.
- `department` is derived from `company.name` in JSONPlaceholder; for create/edit we send `{ company: { name: department } }` and reconcile locally.

## Project Structure

```
user-management-dashboard/
  src/
    components/
      ConfirmDialog.tsx
      FilterModal.tsx
      SearchBar.tsx
      UserFormModal.tsx
      UserTable.tsx
    hooks/
      useUsers.ts
    pages/
      Dashboard.tsx
    services/
      api.ts
    types/
      user.ts
    App.tsx
    main.tsx
    styles.css
  index.html
  package.json
  tsconfig.json
  tsconfig.node.json
  vite.config.ts
```

## Improvements if Given More Time
- Add unit tests for hooks and components.
- Add ESLint and Prettier with CI checks.
- Extract a reusable `Table` component with virtualization for large datasets.
- Add router and detail page for a single user.
- Add toast notifications system instead of `alert`.
- Persist filters and sort in URL/query params.
- Improve accessibility (ARIA labels, keyboard navigation in modals).

## Submission
- Initialize a new Git repository, commit the code, and push to a public repository provider of your choice.

```bash
git init
git add -A
git commit -m "feat: user management dashboard (react+ts)"
# create a new repo on GitHub and replace the URL below
git branch -M main
git remote add origin https://github.com/<your-username>/user-management-dashboard.git
git push -u origin main
```

## Self Introduction Video
Record your self introduction at the provided link in your assignment brief if not already completed.
