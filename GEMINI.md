# Project Overview: Magic Code Share

Magic Code Share is a beautiful code sharing tool built with Next.js, React, and TypeScript. It allows users to edit code with syntax highlighting for over 20 languages, customize themes and window styles, and export code snippets as PNG, JPG, or PDF. A key feature is its short link sharing capability, powered by Supabase, which provides permanent storage for code snippets and tracks view counts.

## Key Technologies:

*   **Framework**: Next.js 15
*   **UI**: React 19 + TypeScript
*   **Styling**: Tailwind CSS 4, Radix UI, Shadcn/ui
*   **Animation**: Framer Motion, Magic UI
*   **Syntax Highlighting**: React Syntax Highlighter, Prism.js
*   **Export**: html-to-image, jsPDF
*   **Backend/Database**: Supabase (for short links and storage)

## Building and Running:

### Prerequisites:

*   Node.js 18+
*   Supabase account

### Setup:

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Configure Supabase:**
    *   Create a new project on [Supabase](https://supabase.com).
    *   Obtain your **Project URL** and **anon public key** from **Settings** > **API**.
    *   Execute the SQL schema from `supabase-schema.sql` in your Supabase project's **SQL Editor** to create the necessary tables and policies.
    *   Create a `.env.local` file in the project root with your Supabase credentials:
        ```env
        NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
        NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
        ```
        **Important**: Ensure `.env.local` is added to `.gitignore` to prevent committing sensitive information.

### Running the Application:

*   **Development Mode:**
    ```bash
    npm run dev
    ```
    Access the application at [http://localhost:3000](http://localhost:3000).

*   **Building for Production:**
    ```bash
    npm run build
    npm start
    ```

## Development Conventions:

*   The project uses TypeScript for type safety.
*   Styling is managed with Tailwind CSS, complemented by Radix UI and Shadcn/ui components.
*   ESLint is configured (see `eslint.config.mjs`) for code quality and consistency.
*   The project structure follows a typical Next.js application layout with `src/app` for pages and API routes, `src/components` for UI components, and `src/lib` for utility functions.
*   Supabase is used for backend services, specifically for managing short links and storing code snippets.
*   The `supabase-schema.sql` file defines the database schema and policies.

## License:

This project is open-sourced under the MIT License. See the `LICENSE` file for details.
