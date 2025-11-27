# Authentication System - Personal Wings Dashboard

## Overview

Complete authentication system with login and registration pages, fully integrated with backend API, form validation, and enhanced toaster notifications.

## 🎨 Design Theme

- **Primary Color**: `#6366F1` (Indigo)
- **Accent Color**: `#10B981` (Green)
- **Background**: `#F5F6FA` (Light Gray)
- **Destructive**: `#EF4444` (Red)
- **Card Style**: White cards with rounded corners and shadow
- **Typography**: Inter font family

## 📁 Files Created/Updated

### 1. **Hooks**

- `hooks/useFormValidation.ts` - Advanced form validation hook with real-time validation

### 2. **Pages**

- `app/login/page.tsx` - Login page with email/password authentication
- `app/register/page.tsx` - Registration page with full validation

### 3. **Components**

- `components/Toaster.tsx` - Enhanced toast notifications with icons and animations

## 🔧 Features

### Form Validation (`useFormValidation.ts`)

Comprehensive validation with:

- **Required fields**: Ensures mandatory fields are filled
- **Email validation**: Validates proper email format
- **Min/Max length**: Character length constraints
- **Pattern matching**: Regex validation for complex rules
- **Password matching**: Confirms passwords match
- **Custom validation**: Allows custom validation functions
- **Real-time feedback**: Validates on blur and on change (after touched)

### Login Page Features

- Email and password fields with validation
- Password visibility toggle (Eye icon)
- "Forgot Password" link
- Form validation with error messages
- Loading state during authentication
- Automatic redirect to dashboard on success
- Backend integration with JWT tokens
- Toast notifications for success/error

### Register Page Features

- First name and last name fields
- Email validation
- Strong password requirements (uppercase, lowercase, number)
- Password confirmation with matching validation
- Password visibility toggles
- Terms & Privacy Policy links
- Form validation with helpful error messages
- Loading state during registration
- Automatic redirect to login on success
- Backend integration

### Enhanced Toaster

- Success and error toast types
- Icon indicators (CheckCircle for success, XCircle for error)
- Close button on each toast
- Auto-dismiss after 4 seconds
- Smooth slide-in animation
- Backdrop blur effect
- Accessible with ARIA labels

## 🔐 Backend Integration

### Auth Context (`context/AuthContext.tsx`)

Provides:

- `login(payload)` - Authenticates user and stores tokens
- `register(payload)` - Creates new user account
- `logout()` - Clears authentication tokens
- `refreshProfile()` - Refreshes user profile data
- `user` - Current authenticated user
- `loading` - Loading state

### Auth Service (`services/auth.service.ts`)

API endpoints:

- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /auth/profile` - Get user profile
- `POST /auth/refresh-token` - Refresh JWT token
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/reset-password` - Reset password with token
- `GET /auth/verify-email` - Verify email address

### Token Management (`lib/cookies.ts`)

- Stores JWT access and refresh tokens in cookies
- Automatic token refresh on 401 responses
- Secure token storage with SameSite configuration

## 🎯 Validation Rules

### Login Form

```typescript
{
  email: {
    required: 'Email is required',
    email: 'Please enter a valid email address'
  },
  password: {
    required: 'Password is required',
    minLength: { value: 6, message: 'Password must be at least 6 characters' }
  }
}
```

### Register Form

```typescript
{
  firstName: {
    required: 'First name is required',
    minLength: { value: 2, message: 'First name must be at least 2 characters' },
    pattern: {
      value: /^[a-zA-Z\s]+$/,
      message: 'First name can only contain letters'
    }
  },
  lastName: {
    required: 'Last name is required',
    minLength: { value: 2, message: 'Last name must be at least 2 characters' },
    pattern: {
      value: /^[a-zA-Z\s]+$/,
      message: 'Last name can only contain letters'
    }
  },
  email: {
    required: 'Email is required',
    email: 'Please enter a valid email address'
  },
  password: {
    required: 'Password is required',
    minLength: { value: 6, message: 'Password must be at least 6 characters' },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      message: 'Password must contain uppercase, lowercase, and number'
    }
  },
  confirmPassword: {
    required: 'Please confirm your password',
    match: { field: 'password', message: 'Passwords do not match' }
  }
}
```

## 🎨 UI Components Used

### Shadcn/UI Components

- `Button` - Primary action buttons with loading states
- `Input` - Form input fields with validation states
- `Label` - Accessible form labels
- `Card` - Container for auth forms
- `CardHeader`, `CardTitle`, `CardDescription` - Card structure

### Lucide Icons

- `LogIn` - Login page icon
- `UserPlus` - Register page icon
- `Eye`, `EyeOff` - Password visibility toggle
- `Loader2` - Loading spinner
- `CheckCircle2` - Success toast icon
- `XCircle` - Error toast icon
- `X` - Close button icon

## 📱 Responsive Design

- Mobile-first approach
- Responsive grid layout for name fields
- Proper padding and spacing for all screen sizes
- Maximum width constraints on auth cards
- Background decorative elements

## 🔄 User Flow

### Registration Flow

1. User fills out registration form
2. Client-side validation checks all fields
3. On submit, data sent to `POST /auth/register`
4. Success: Toast shows success message → Redirect to `/login`
5. Error: Toast shows exact error message from backend

### Login Flow

1. User enters email and password
2. Client-side validation checks credentials
3. On submit, data sent to `POST /auth/login`
4. Success: JWT tokens stored → Profile fetched → Redirect to `/`
5. Error: Toast shows exact error message from backend

## 🚀 Usage

### Login

```bash
Navigate to: http://localhost:3000/login
```

### Register

```bash
Navigate to: http://localhost:3000/register
```

## 🔧 Environment Variables

Ensure `.env.local` has:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## ✅ Error Handling

### Client-Side Errors

- Form validation errors (shown below each field)
- Network errors (shown in toast)
- Missing required fields (shown in toast)

### Backend Errors

- Invalid credentials → "Invalid credentials"
- Email already exists → "User already exists"
- Validation errors → Exact field error from backend
- Network timeout → "Network error"

## 🎯 Testing Checklist

- ✅ Form validation works in real-time
- ✅ Password visibility toggle functions
- ✅ Error messages display correctly
- ✅ Success messages display correctly
- ✅ Loading states show during API calls
- ✅ Redirect works after successful auth
- ✅ Tokens stored properly in cookies
- ✅ Backend integration working
- ✅ Responsive design on mobile
- ✅ Accessibility (ARIA labels, keyboard navigation)

## 🔐 Security Features

- Password strength requirements enforced
- JWT token-based authentication
- Automatic token refresh
- Secure cookie storage
- CSRF protection with SameSite cookies
- Input sanitization via validation

## 📚 Dependencies

All required packages are already installed:

- `js-cookie` - Cookie management
- `lucide-react` - Icons
- `@radix-ui/*` - UI primitives
- `class-variance-authority` - Component variants
- `tailwindcss` - Styling

## 🎨 Theme Customization

Colors defined in `app/globals.css`:

```css
:root {
  --primary: #6366f1;
  --accent: #10b981;
  --destructive: #ef4444;
  --background: #f5f6fa;
  --foreground: #0f172a;
}
```

## 📝 Notes

- All forms use controlled components for better state management
- Validation runs on blur (first time) and onChange (after touched)
- Toast auto-dismisses after 4 seconds
- Password must contain uppercase, lowercase, and number
- All API responses follow consistent format: `{ success, data, message, error }`
