# REMI MIS API Documentation

Complete API documentation for the Returnee Management Information System (REMI MIS).

**Version:** 2.0  
**Last Updated:** January 14, 2026

## 📚 Available Documentation

### 1. Postman Collection
**File:** `REMI_MIS_API_Collection.json`

A comprehensive Postman collection with all API endpoints, organized by modules.

#### Features:
- ✅ **85+ API endpoints** across all modules
- ✅ **Automatic token management** (tokens saved to collection variables)
- ✅ **Pre-configured requests** with sample data
- ✅ **Organized folders** by functionality
- ✅ **Environment variables** for easy configuration

#### Modules Included:
1. **Authentication** (5 endpoints)
   - Login, Register, Token Refresh, Logout, Get Token

2. **User Management** (13 endpoints)
   - List, Create, Update, Delete Users
   - Profile Management (Me endpoint)
   - Change Password
   - User Statistics
   - Approve/Reject Users
   - User Dropdown

3. **Role Management** (6 endpoints)
   - List, Create, Update, Delete Roles
   - Role Details
   - Role Dropdown

4. **Location Management**
   - **Provinces** (7 endpoints): List, Create, Update, Delete, Dropdown, Statistics, Details
   - **Districts** (7 endpoints): List, Create, Update, Delete, Dropdown, Statistics, Details
   - **Municipalities** (7 endpoints): List, Create, Update, Delete, Dropdown, Statistics, Details

5. **Master Data** (10 endpoints)
   - List, Create, Update, Delete Master Data
   - Get by Category (for dropdowns)
   - Bulk Import
   - Categories List

6. **System** (2 endpoints)
   - API Root
   - Health Check

#### How to Import:

**In Postman:**
1. Open Postman
2. Click **Import** button (top left)
3. Select **File** → Choose `REMI_MIS_API_Collection.json`
4. Click **Import**

**Configure Base URL:**
- The collection uses a variable `{{base_url}}`
- Default: `http://localhost:8009/api`
- For production: Change to `http://93.127.206.129:8009/api`

**How to Use:**
1. **Login First**: Run the "Login" request in the Authentication folder
   - Access token will be automatically saved to `{{access_token}}` variable
   - All subsequent requests will use this token automatically
2. **Explore APIs**: Browse folders and run requests
3. **Token Refresh**: When token expires (after 8 hours), run "Token Refresh" request

### 2. OpenAPI Specification
**File:** `openapi-specification.yaml`

A complete OpenAPI 3.0 specification file in YAML format.

#### Features:
- ✅ Full API schema with request/response models
- ✅ Authentication flow documentation
- ✅ Comprehensive descriptions for all endpoints
- ✅ Parameter definitions with examples
- ✅ Response schemas with data types
- ✅ Error response formats

#### How to Use:

**Option 1: Swagger UI (Online)**
1. Go to [Swagger Editor](https://editor.swagger.io/)
2. File → Import File → Select `openapi-specification.yaml`
3. View interactive documentation

**Option 2: Swagger UI (Local - via Docker)**
```bash
docker run -p 8080:8080 \
  -e SWAGGER_JSON=/openapi/openapi-specification.yaml \
  -v $(pwd)/openapi-specification.yaml:/openapi/openapi-specification.yaml \
  swaggerapi/swagger-ui
```
Then open: http://localhost:8080

**Option 3: Redoc (Online)**
1. Go to [Redoc](https://redocly.github.io/redoc/)
2. Paste the raw URL or file content

**Option 3: VS Code Extension**
1. Install "Swagger Viewer" or "OpenAPI (Swagger) Editor" extension
2. Open `openapi-specification.yaml`
3. Right-click → "Preview Swagger"

### 3. API Documentation Files

Additional documentation files in the repository:

- **USER-MANAGEMENT-API-DOCUMENTATION.md** - Detailed user management API guide
- **MASTER_DATA_API.md** - Master data API reference
- **FRONTEND-INTEGRATION-GUIDE.md** - React integration examples
- **USER-MANAGEMENT-IMPLEMENTATION-COMPLETE.md** - Implementation details

## 🚀 Quick Start

### 1. Using Postman

```bash
# 1. Import the collection
# 2. Set variables (if needed):
#    - base_url: http://localhost:8009/api (or your server)
#
# 3. Login:
POST {{base_url}}/auth/login/
Body:
{
  "email": "admin@remimis.gov.np",
  "password": "Admin@123"
}

# 4. Access token is now saved automatically
# 5. Call any protected endpoint
GET {{base_url}}/users/me/
```

### 2. Using cURL

```bash
# Login
curl -X POST http://localhost:8009/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@remimis.gov.np",
    "password": "Admin@123"
  }'

# Save the access token from response
export TOKEN="your_access_token_here"

# Call protected endpoint
curl -X GET http://localhost:8009/api/users/me/ \
  -H "Authorization: Bearer $TOKEN"
```

### 3. Using Python Requests

```python
import requests

# Base URL
BASE_URL = "http://localhost:8009/api"

# Login
response = requests.post(f"{BASE_URL}/auth/login/", json={
    "email": "admin@remimis.gov.np",
    "password": "Admin@123"
})

data = response.json()
access_token = data['access']

# Headers for authenticated requests
headers = {
    "Authorization": f"Bearer {access_token}"
}

# Get current user
response = requests.get(f"{BASE_URL}/users/me/", headers=headers)
user = response.json()
print(user)
```

### 4. Using JavaScript (Axios)

```javascript
import axios from 'axios';

const BASE_URL = 'http://localhost:8009/api';

// Login
const loginResponse = await axios.post(`${BASE_URL}/auth/login/`, {
  email: 'admin@remimis.gov.np',
  password: 'Admin@123'
});

const { access } = loginResponse.data;

// Create axios instance with auth header
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${access}`
  }
});

// Get current user
const userResponse = await api.get('/users/me/');
console.log(userResponse.data);
```

## 🔐 Authentication

All endpoints (except auth endpoints) require JWT authentication.

**Add token to requests:**
```
Authorization: Bearer <your_access_token>
```

**Token Lifetimes:**
- **Access Token**: 8 hours
- **Refresh Token**: 7 days

**Refresh Token:**
```bash
POST /api/auth/token/refresh/
Body: { "refresh": "your_refresh_token" }
```

## 📊 API Statistics

- **Total Endpoints**: 85+
- **GET Endpoints**: 40+
- **POST Endpoints**: 20+
- **PUT/PATCH Endpoints**: 15+
- **DELETE Endpoints**: 10+

## 🌍 Geographic Scope

Users can only access data within their geographic scope:

| Office Level | Access Scope |
|-------------|--------------|
| **MOLES** | Full system access to all locations |
| **PROVINCE** | Assigned province + all districts/municipalities within |
| **DISTRICT** | Assigned district + all municipalities within |
| **MUNICIPALITY** | Only assigned municipality |

## 👥 System Roles

| Role | Code | Permissions |
|------|------|-------------|
| Super Admin | `SUPER_ADMIN` | Full system administration |
| Project Manager | `PROJECT_MANAGER` | Project oversight, reporting, user stats |
| Trainer | `TRAINER` | Training management |
| Social Mobilizer | `SOCIAL_MOBILIZER` | Community engagement |
| Family Counselor | `FAMILY_COUNSELOR` | Family counseling |
| Economic Counselor | `ECONOMIC_COUNSELOR` | Economic counseling |
| Employment Coordinator | `EMPLOYMENT_COORDINATOR` | Employment coordination |
| Data Viewer | `DATA_VIEWER` | Read-only access |

## 📝 Master Data Categories

Available master data categories for dropdowns:

- `ethnicity` - Ethnicities (Brahmin, Chhetri, Newar, etc.)
- `religion` - Religions (Hindu, Buddhist, Muslim, etc.)
- `marital_status` - Marital statuses (Single, Married, Divorced, etc.)
- `education_level` - Education levels (Primary, Secondary, Bachelor, etc.)
- `occupation` - Occupations
- `skills` - Skills with sub-categories (e.g., Manufacturing/Welding)
- `health_issue` - Health issues with sub-categories (Physical/Mental)
- `migration_destination` - Migration destination countries
- `migration_purpose` - Purpose of migration
- `return_reason` - Reason for return
- `financial_support_source` - Financial support sources

**Usage Example:**
```bash
GET /api/master-data/by_category/?field_category=ethnicity&is_active=true
```

## 🛠️ Development Tools

### Swagger UI (Built-in)
Access interactive API documentation at:
```
http://localhost:8009/swagger/
```

### Redoc (Built-in)
Alternative documentation UI:
```
http://localhost:8009/redoc/
```

### Django Admin
Manage data via admin panel:
```
http://localhost:8009/admin/
Login: admin@remimis.gov.np / Admin@123
```

## 🔄 API Versioning

Current API version: **v1.0**

Base URL includes API path: `/api/`

## 📧 Support

For API support and questions:
- **Email**: support@remimis.gov.np
- **Documentation**: Check the `*.md` files in the repository

## ⚠️ Important Notes

1. **Change Default Password**: After first login, change the default admin password
2. **Token Security**: Store tokens securely, never commit them to version control
3. **HTTPS**: Use HTTPS in production (currently HTTP for development)
4. **Rate Limiting**: Consider implementing rate limiting in production
5. **Geographic Scope**: All data queries are automatically filtered by user's geographic scope

## 📦 Files Overview

```
REMI-MIS/
├── REMI_MIS_API_Collection.json       # Postman Collection (v2.1)
├── openapi-specification.yaml          # OpenAPI 3.0 Specification
├── API-DOCUMENTATION-README.md         # This file
├── USER-MANAGEMENT-API-DOCUMENTATION.md
├── MASTER_DATA_API.md
├── FRONTEND-INTEGRATION-GUIDE.md
└── backend/
    └── MASTER_DATA_API.md
```

## 🎯 Next Steps

1. **Import Postman Collection** and start exploring APIs
2. **Review OpenAPI Specification** for detailed schemas
3. **Check Additional Documentation** for implementation details
4. **Integrate with Frontend** using the integration guide
5. **Test in Production** with your VPS server

---

**Last Updated:** January 14, 2026  
**Version:** 2.0  
**Maintained by:** REMI MIS Development Team
