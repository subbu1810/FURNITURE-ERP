# Team Development & Git Rules

Welcome to the Furniture ERP project! To ensure our codebase remains stable and our Git history stays clean without merge conflicts, all developers **must** strictly adhere to the following rules.

---

## 1. Strict Technology Stack
- **Frontend Framework**: We exclusively use **Next.js (App Router)**. Do not use plain Vite or Create React App.
- **Language**: Use **TypeScript (`.tsx` and `.ts`)** for all new files. Avoid `.jsx` and `.js`.
- **Styling**: We strictly use **Tailwind CSS v4**. Do not create standard `.css` files (`import "./style.css"` is forbidden as it breaks global styling).
- **Icons**: Use `lucide-react` for all icons.

## 2. Project Structure
Our project is a Monorepo containing two folders:
- `/client`: The Next.js frontend
- `/server`: The NestJS backend

All frontend screen development must occur inside `client/src/app`. **Never** create a separate React project at the root level.

## 3. Mandatory Git Workflow
You are **NOT ALLOWED** to commit directly to the `main` branch.

1. **Sync Before Starting**: Always pull the latest changes from `main` before starting your work.
   ```bash
   git checkout main
   git pull origin main
   ```
2. **Create a Feature Branch**: Branch off of `main` for your specific task. Use a descriptive name (e.g., `feature/dashboard-ui` or `fix/sidebar-colors`).
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit Regularly**: Write clear, descriptive commit messages.
4. **Push and Create a Pull Request (PR)**: Once your screen is done, push your branch to GitHub and open a Pull Request against `main`.
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Code Review**: Your code will be reviewed by the admin. It will only be merged into `main` if it follows the exact Next.js structure and Tailwind CSS rules outlined above.

## 4. No Unrelated Histories
Do not initialize new Git repositories inside your local folders or copy-paste `.git` folders. If you face a "refusing to merge unrelated histories" error, it means you did not clone the repository properly. **Always start by cloning the main repository.**

---
*Failure to follow these rules will result in your Pull Request being rejected.*
