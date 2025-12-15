# 📊 Analytics Dashboard – React Application

This project is a **React.js analytics dashboard** with:

* JWT-based authentication
* Protected routes
* Global state management (Context + Reducer)
* API response caching with TTL
* Auto logout on 401 or 403 errors
* Pagination, charts, and date-based filtering

---

## 🚀 Project Setup & Usage

### Prerequisites

Make sure the following are installed on your system:

* **Node.js** (v18+ recommended)
* **npm** (comes with Node.js)
* **Git**

Verify installation:

```bash
node -v
npm -v
git --version
```

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Satellite-system/Kloudspot-Crowd-Management
cd Kloudspot-Crowd-Management
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Environment Configuration

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://hiring-dev.internal.kloudspot.com/api
```

> If not using Vite, replace `VITE_` with your framework-specific prefix.

---

### 4️⃣ Start Development Server

```bash
npm run dev
```

App will run at:

```
http://localhost:5173
```

(or port shown in terminal)

---

### 5️⃣ Authentication Flow

* Login saves **JWT token** in Auth Context
* Axios interceptor attaches token automatically
* **401 Unauthorized → auto logout**

---

## 🔐 Global State Management

### Auth Context

Stores:

* `token`

Used for:

* Protected routes
* API authorization

---

### Data Cache Context

Caches API responses to reduce unnecessary calls.

```js
setCache(key, { data, timestamp })
getCache(key)
clearCache()
```

✔ TTL based validation (15 minutes)

---

## 🌐 API Handling

### Axios Hook (`useApi`)

* Centralized API logic
* Auto adds Bearer token
* Handles 401 & 403 Error globally

```js
postApi('/analytics/overview', body)
```

---

## 📦 Caching Strategy

### Cache Key Pattern

```js
OVERVIEW_<siteId>_<date>_<page>
```

### Cache Flow

1. Check cache
2. Validate TTL
3. Use cache OR call API
4. Save response

---

## 📅 Date Utilities

### UTC Day Range

```js
getUtcDayRange(date)
```

Returns:

```js
{
  fromUtc,
  toUtc
}
```

---

## 📊 Data Utilities

### Gender Percentage Calculation

```js
calculateGenderPercentage(buckets)
```

Returns male & female percentages.

---

## 🧭 Routing

### Protected Routes

```jsx
<Route element={<ProtectedRoute />}>
  <Route path="/" element={<MainLayout />}>
    <Route index element={<Dashboard />} />
  </Route>
</Route>
```

---

## 📄 Pagination

* Server-side pagination
* Cached per page

```js
pageNumber
pageSize
```

---

## 🧹 Cache Clearing

Clear cache on:

* Logout
* Site change
* Date change

```js
clearCache();
```

---

## 🏗 Project Structure

```
src/
 ├── api/
 ├── context/
 ├── hooks/
 ├── layouts/
 ├── pages/
 ├── utils/
 └── AppRouter.jsx
```

---

## 🚀 Production Build

```bash
npm run build
```

Preview build:

```bash
npm run preview
```

---

## ✅ You're Ready

The project is fully set up and optimized with caching, global state, and secure routing.

Happy coding 🚀
