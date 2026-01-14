# Frontend Integration Quick Reference

## 🚀 Quick Start

### 1. Install Axios
```bash
npm install axios
```

### 2. Create API Client

```javascript
// src/services/api.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8009/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await axios.post(`${API_BASE_URL}/auth/token/refresh/`, {
          refresh: refreshToken
        });
        
        localStorage.setItem('access_token', response.data.access);
        originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
        
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed - redirect to login
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
```

### 3. Create Auth Context

```javascript
// src/contexts/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [permissions, setPermissions] = useState({});
  const [geographicScope, setGeographicScope] = useState({});
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Load user from localStorage on mount
    const storedUser = localStorage.getItem('user');
    const storedPermissions = localStorage.getItem('permissions');
    const storedScope = localStorage.getItem('geographic_scope');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setPermissions(JSON.parse(storedPermissions || '{}'));
      setGeographicScope(JSON.parse(storedScope || '{}'));
    }
    setLoading(false);
  }, []);
  
  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login/', { email, password });
      const { access, refresh, user, permissions, geographic_scope } = response.data;
      
      // Store in localStorage
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('permissions', JSON.stringify(permissions));
      localStorage.setItem('geographic_scope', JSON.stringify(geographic_scope));
      
      // Update state
      setUser(user);
      setPermissions(permissions);
      setGeographicScope(geographic_scope);
      
      return { success: true, user };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Login failed'
      };
    }
  };
  
  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      await api.post('/auth/logout/', { refresh: refreshToken });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear state and storage
      setUser(null);
      setPermissions({});
      setGeographicScope({});
      localStorage.clear();
    }
  };
  
  const hasPermission = (permission) => {
    return permissions[permission] === true;
  };
  
  const isSuperAdmin = () => {
    return permissions.role_code === 'SUPER_ADMIN' || user?.is_superuser;
  };
  
  const canAccessLevel = (level) => {
    const userLevel = geographicScope.level;
    const hierarchy = ['MOLES', 'PROVINCE', 'DISTRICT', 'MUNICIPALITY'];
    return hierarchy.indexOf(userLevel) <= hierarchy.indexOf(level);
  };
  
  const value = {
    user,
    permissions,
    geographicScope,
    loading,
    login,
    logout,
    hasPermission,
    isSuperAdmin,
    canAccessLevel,
    isAuthenticated: !!user,
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

### 4. Create Protected Route

```javascript
// src/components/ProtectedRoute.js
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const ProtectedRoute = ({ children, requiredPermission, fallback = '/login' }) => {
  const { isAuthenticated, hasPermission, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to={fallback} replace />;
  }
  
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return children;
};
```

### 5. Login Component

```javascript
// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const result = await login(email, password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };
  
  return (
    <div className="login-page">
      <form onSubmit={handleSubmit}>
        <h2>REMI MIS Login</h2>
        
        {error && <div className="error">{error}</div>}
        
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="admin@remimis.gov.np"
          />
        </div>
        
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};
```

### 6. User List Component

```javascript
// src/pages/UserList.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { hasPermission } = useAuth();
  
  useEffect(() => {
    fetchUsers();
  }, []);
  
  const fetchUsers = async () => {
    try {
      const response = await api.get('/users/');
      setUsers(response.data.results);
    } catch (err) {
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };
  
  const handleApprove = async (userId) => {
    try {
      await api.post(`/users/${userId}/approve/`);
      fetchUsers(); // Refresh list
    } catch (err) {
      alert('Failed to approve user');
    }
  };
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      <h2>Users</h2>
      
      {hasPermission('can_create_users') && (
        <button onClick={() => navigate('/users/create')}>
          Create New User
        </button>
      )}
      
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Role</th>
            <th>Office Level</th>
            <th>Location</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.full_name}</td>
              <td>{user.role_name}</td>
              <td>{user.office_level}</td>
              <td>{user.location}</td>
              <td>
                {user.is_approved ? '✅ Approved' : '⏳ Pending'}
              </td>
              <td>
                {hasPermission('can_create_users') && !user.is_approved && (
                  <button onClick={() => handleApprove(user.id)}>
                    Approve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
```

### 7. Cascading Location Dropdowns

```javascript
// src/components/LocationSelector.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';

export const LocationSelector = ({ onChange, initialValues = {} }) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);
  
  const [selectedProvince, setSelectedProvince] = useState(initialValues.province || '');
  const [selectedDistrict, setSelectedDistrict] = useState(initialValues.district || '');
  const [selectedMunicipality, setSelectedMunicipality] = useState(initialValues.municipality || '');
  
  // Load provinces
  useEffect(() => {
    api.get('/locations/provinces/dropdown/')
      .then(res => setProvinces(res.data))
      .catch(err => console.error('Failed to load provinces', err));
  }, []);
  
  // Load districts when province changes
  useEffect(() => {
    if (selectedProvince) {
      api.get(`/locations/districts/by_province/${selectedProvince}/`)
        .then(res => setDistricts(res.data))
        .catch(err => console.error('Failed to load districts', err));
    } else {
      setDistricts([]);
      setSelectedDistrict('');
    }
  }, [selectedProvince]);
  
  // Load municipalities when district changes
  useEffect(() => {
    if (selectedDistrict) {
      api.get(`/locations/municipalities/by_district/${selectedDistrict}/`)
        .then(res => setMunicipalities(res.data))
        .catch(err => console.error('Failed to load municipalities', err));
    } else {
      setMunicipalities([]);
      setSelectedMunicipality('');
    }
  }, [selectedDistrict]);
  
  // Notify parent of changes
  useEffect(() => {
    onChange({
      province: selectedProvince,
      district: selectedDistrict,
      municipality: selectedMunicipality
    });
  }, [selectedProvince, selectedDistrict, selectedMunicipality]);
  
  return (
    <div className="location-selector">
      <div>
        <label>Province:</label>
        <select
          value={selectedProvince}
          onChange={(e) => setSelectedProvince(e.target.value)}
        >
          <option value="">Select Province</option>
          {provinces.map(p => (
            <option key={p.id} value={p.id}>{p.title_en}</option>
          ))}
        </select>
      </div>
      
      <div>
        <label>District:</label>
        <select
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          disabled={!selectedProvince}
        >
          <option value="">Select District</option>
          {districts.map(d => (
            <option key={d.id} value={d.id}>{d.title_en}</option>
          ))}
        </select>
      </div>
      
      <div>
        <label>Municipality:</label>
        <select
          value={selectedMunicipality}
          onChange={(e) => setSelectedMunicipality(e.target.value)}
          disabled={!selectedDistrict}
        >
          <option value="">Select Municipality</option>
          {municipalities.map(m => (
            <option key={m.id} value={m.id}>{m.title_en}</option>
          ))}
        </select>
      </div>
    </div>
  );
};
```

### 8. User Permission Component

```javascript
// src/components/PermissionGate.js
import { useAuth } from '../contexts/AuthContext';

export const PermissionGate = ({ permission, children, fallback = null }) => {
  const { hasPermission } = useAuth();
  
  if (!hasPermission(permission)) {
    return fallback;
  }
  
  return children;
};

// Usage:
<PermissionGate permission="can_create_users">
  <button>Create User</button>
</PermissionGate>
```

### 9. App Setup

```javascript
// src/App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { UserList } from './pages/UserList';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/users"
            element={
              <ProtectedRoute requiredPermission="can_create_users">
                <UserList />
              </ProtectedRoute>
            }
          />
          
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
```

### 10. Environment Variables

```bash
# .env
REACT_APP_API_URL=http://localhost:8009/api
```

---

## 🎯 Common Use Cases

### Check if User Can Access Province Data
```javascript
const { geographicScope } = useAuth();

if (geographicScope.level === 'MOLES' || geographicScope.level === 'PROVINCE') {
  // Can access province-level data
}
```

### Show Content Based on Role
```javascript
const { user } = useAuth();

{user.role_details.code === 'SUPER_ADMIN' && (
  <AdminPanel />
)}
```

### Filter Data by Geographic Scope
```javascript
const fetchCases = async () => {
  const { geographicScope } = useAuth();
  
  let url = '/cases/';
  
  if (geographicScope.level === 'PROVINCE') {
    url += `?province=${geographicScope.province_id}`;
  } else if (geographicScope.level === 'DISTRICT') {
    url += `?district=${geographicScope.district_id}`;
  } else if (geographicScope.level === 'MUNICIPALITY') {
    url += `?municipality=${geographicScope.municipality_id}`;
  }
  
  const response = await api.get(url);
  return response.data;
};
```

---

## 🔑 Default Login Credentials

**Email:** `admin@remimis.gov.np`  
**Password:** `Admin@123`

⚠️ **Change password after first login!**

---

## 📚 API Endpoints Reference

| Endpoint | Method | Description | Permission |
|----------|--------|-------------|------------|
| `/api/auth/login/` | POST | User login | Public |
| `/api/auth/register/` | POST | Self-registration | Public |
| `/api/auth/logout/` | POST | Logout | Authenticated |
| `/api/users/` | GET | List users | Authenticated |
| `/api/users/` | POST | Create user | can_create_users |
| `/api/users/me/` | GET | Current user | Authenticated |
| `/api/users/{id}/approve/` | POST | Approve user | can_create_users |
| `/api/users/roles/` | GET | List roles | Authenticated |
| `/api/locations/provinces/` | GET | List provinces | Authenticated |

---

## 🛠️ Testing

### Test Login Flow
```javascript
// In browser console
fetch('http://localhost:8009/api/auth/login/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@remimis.gov.np',
    password: 'Admin@123'
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

---

## ✅ Checklist for Frontend Implementation

- [ ] Install axios
- [ ] Create API client with interceptors
- [ ] Create AuthContext
- [ ] Create ProtectedRoute component
- [ ] Implement Login page
- [ ] Implement user list with permissions
- [ ] Create LocationSelector for cascading dropdowns
- [ ] Add permission-based UI rendering
- [ ] Test token refresh flow
- [ ] Test geographic scope filtering
- [ ] Handle logout properly
- [ ] Add loading states
- [ ] Add error handling
- [ ] Test with different roles

---

**Quick Start Time:** ~30 minutes  
**Full Integration:** ~2-3 hours

Ready to integrate with REMI MIS backend!
