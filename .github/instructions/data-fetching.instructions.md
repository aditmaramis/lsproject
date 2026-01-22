---
description: Read this file to understand how to fetch data in this project.
---

# Data Fetching Instructions

In this project, data fetching is primarily handled using server components and the Drizzle ORM for database interactions. Follow these guidelines to ensure consistency and maintainability:

## 1. Use Server Components for Data Fetching

In Next.js, ALWAYS using Server Components for data fetching. NEVER use Client Components for fetching data from the database.

## 2. Data Fetching Methods

ALWAYS use the helper functions in the /data directory to fetch data. NEVER fetch data directly in the component files.

ALL helper functions in the /data directory should use Drizzle ORM for database interactions.
