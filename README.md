# CTF Platform Frontend

A modern, high-performance CTF (Capture The Flag) platform frontend built with Next.js 14, React Query, and Zustand.

## 🚀 Features

- ✅ **Landing Page** - Beautiful hero section with organization info
- ✅ **Authentication** - Secure login with JWT/session support
- ✅ **Leaderboard** - Real-time rankings with auto-refresh
- ✅ **User Profile** - Comprehensive stats and achievements
- ✅ **Challenge System** - Category-based challenges with flag submission
- ✅ **Responsive Design** - Mobile-first, works on all devices
- ✅ **State Management** - Zustand for client state + React Query for server state
- ✅ **Type Safety** - Full TypeScript coverage
- ✅ **Performance** - Optimized with Next.js App Router

## 🛠 Tech Stack

### Core
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3

### State Management (Production-Grade)
- **Client State**: Zustand with persistence
- **Server State**: React Query (TanStack Query)
  - Automatic caching and background refetching
  - Optimistic updates
  - Request deduplication
  - Error handling and retries

### Data Fetching
- **HTTP Client**: Axios with interceptors
- **Form Handling**: React Hook Form
- **Validation**: Zod schemas

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Backend API running

### Steps

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**
   ```bash
   # Copy the example env file
   copy .env.example .env.local

   # Edit .env.local and set your backend API URL
   # NEXT_PUBLIC_API_URL=http://localhost:8000/api
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Landing page
│   ├── login/             # Login page
│   ├── profile/           # User profile
│   ├── leaderboard/       # Leaderboard
│   ├── challenges/        # Challenge browser
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
│
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── Badge.tsx
│   ├── Navbar.tsx        # Navigation
│   └── Footer.tsx        # Footer
│
├── store/                # Zustand stores
│   └── useAuthStore.ts   # Authentication state
│
├── lib/                  # Utilities and configs
│   ├── api.ts           # Axios instance + interceptors
│   ├── apiEndpoints.ts  # API helper functions
│   ├── queryClient.tsx  # React Query provider
│   └── config.ts        # App configuration
│
└── types/               # TypeScript types
    └── index.ts         # Shared types
```

## 🎯 Key Features Explained

### State Management Architecture

**Zustand (Client State)**
- ✅ User authentication state
- ✅ Persisted to localStorage
- ✅ Simple, lightweight (~1KB)
- ✅ No boilerplate, just works

**React Query (Server State)**
- ✅ Automatic caching (5min default)
- ✅ Background refetching
- ✅ Optimistic UI updates
- ✅ Request deduplication
- ✅ Automatic retries on failure
- ✅ DevTools for debugging

### API Layer

- Centralized axios instance
- Request/response interceptors
- Automatic token injection
- Global error handling
- Type-safe endpoints

### Authentication Flow

1. User submits login form
2. API call with credentials
3. Store user + token in Zustand
4. Token auto-attached to all requests
5. Protected routes check auth status
6. Auto-redirect on 401 errors

### Challenge Submission Flow

1. User selects genre
2. Load challenges for genre
3. Submit flag with optimistic update
4. Update cache on success
5. Refresh user stats
6. Show success/error feedback

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Linting
npm run lint         # Run ESLint
```

## 🌐 API Endpoints Expected

Your backend should implement these endpoints:

### Authentication
- `POST /auth/login` - Login with email/password
- `POST /auth/logout` - Logout user
- `GET /auth/profile` - Get current user

### Challenges
- `GET /genres` - List all challenge categories
- `GET /challenges/:genreId` - Get challenges by genre
- `POST /submit-flag` - Submit flag for validation

### Leaderboard
- `GET /leaderboard` - Get top players

### User
- `GET /users/:id` - Get user by ID
- `PATCH /users/profile` - Update user profile

## 🎨 UI Components

All components are built with:
- Accessibility in mind
- Mobile-first responsive design
- Consistent design tokens
- Loading states
- Error handling
- Keyboard navigation

### Component Examples

```tsx
// Button with loading state
<Button isLoading={isPending} onClick={handleClick}>
  Submit
</Button>

// Input with validation
<Input 
  label="Email" 
  error={errors.email?.message}
  {...register("email")}
/>

// Card layouts
<Card variant="elevated">
  <CardHeader>Title</CardHeader>
  <CardBody>Content</CardBody>
</Card>
```

## 🚦 Performance Optimizations

1. **Next.js App Router** - React Server Components
2. **Code Splitting** - Automatic route-based splitting
3. **Image Optimization** - Next.js Image component
4. **Query Caching** - React Query smart caching
5. **Lazy Loading** - Components loaded on demand
6. **Memoization** - Prevent unnecessary re-renders

## 📱 Responsive Design

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

All pages are fully responsive with mobile-first approach.

## 🔐 Security

- ✅ XSS protection via React
- ✅ CSRF tokens (if backend implements)
- ✅ HTTP-only cookies support
- ✅ Secure token storage
- ✅ Auto logout on 401
- ✅ Input validation

## 🧪 Testing Recommendations

```bash
# Install testing libraries (not included)
npm install --save-dev @testing-library/react @testing-library/jest-dom jest
```

## 📝 Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_NAME="CTF Platform"
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🤝 Contributing

1. Follow the existing code style
2. Use TypeScript types
3. Write clean, readable code
4. Test your changes
5. Keep components small and focused

## 📄 License

MIT License - feel free to use for your CTF events!

## 🆘 Support

For issues or questions:
1. Check the documentation
2. Review API responses
3. Check browser console
4. Verify environment variables

## 🎓 Learning Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Query Docs](https://tanstack.com/query/latest)
- [Zustand Docs](https://docs.pmnd.rs/zustand)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

Built with ❤️ for CTF enthusiasts

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
