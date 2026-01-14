# REMI MIS Postman Collection - Quick Reference

## 📦 Collection Information

- **Name**: REMI MIS API - Complete Collection
- **Version**: 2.0
- **Total Endpoints**: 85+
- **File**: `REMI_MIS_API_Collection.json`
- **Format**: Postman Collection v2.1

## 🚀 Quick Start

### 1. Import Collection
1. Open Postman
2. Click **Import** (top left)
3. Select `REMI_MIS_API_Collection.json`
4. Collection imported! ✅

### 2. Configure Variables
The collection uses these variables (automatically configured):

| Variable | Default Value | Description |
|----------|--------------|-------------|
| `base_url` | `http://localhost:8009/api` | API base URL |
| `access_token` | (auto-set) | JWT access token |
| `refresh_token` | (auto-set) | JWT refresh token |
| `user_id` | (auto-set) | Current user ID |

**For Production**: Change `base_url` to `http://93.127.206.129:8009/api`

### 3. First Request - Login
1. Navigate to: **Authentication** → **Login**
2. Click **Send**
3. ✅ Access token automatically saved!
4. All other requests now authenticated

## 📂 Collection Structure

```
REMI MIS API - Complete Collection
├── 🔐 Authentication (5 requests)
│   ├── Login ⭐ (START HERE)
│   ├── Register User
│   ├── Token Refresh
│   ├── Logout
│   └── Get JWT Token
│
├── 👥 User Management (13 requests)
│   ├── List Users
│   ├── Create User
│   ├── Get User Details
│   ├── Update User
│   ├── Partial Update User
│   ├── Delete User
│   ├── Get Current User (Me) ⭐
│   ├── Update Current User
│   ├── Change Password
│   ├── Get User Statistics
│   ├── Get Users Dropdown
│   ├── Approve User
│   └── Reject User
│
├── 🎭 Role Management (6 requests)
│   ├── List Roles
│   ├── Get Role Details
│   ├── Create Role
│   ├── Update Role
│   ├── Delete Role
│   └── Get Roles Dropdown
│
├── 📍 Location Management (21 requests)
│   │
│   ├── Provinces (7 requests)
│   │   ├── List Provinces
│   │   ├── Get Province Details
│   │   ├── Create Province
│   │   ├── Update Province
│   │   ├── Delete Province
│   │   ├── Get Provinces Dropdown ⭐
│   │   └── Get Province Statistics
│   │
│   ├── Districts (7 requests)
│   │   ├── List Districts
│   │   ├── Get District Details
│   │   ├── Create District
│   │   ├── Update District
│   │   ├── Delete District
│   │   ├── Get Districts Dropdown ⭐
│   │   └── Get District Statistics
│   │
│   └── Municipalities (7 requests)
│       ├── List Municipalities
│       ├── Get Municipality Details
│       ├── Create Municipality
│       ├── Update Municipality
│       ├── Delete Municipality
│       ├── Get Municipalities Dropdown ⭐
│       └── Get Municipality Statistics
│
├── 📊 Master Data (10 requests)
│   ├── List Master Data (SuperAdmin)
│   ├── Get Master Data by Category ⭐ (FOR DROPDOWNS)
│   ├── Get Master Data Details
│   ├── Create Master Data
│   ├── Create Master Data with Sub-category
│   ├── Update Master Data
│   ├── Partial Update Master Data
│   ├── Delete Master Data
│   ├── Get Categories List
│   └── Bulk Import Master Data
│
└── ⚙️ System (2 requests)
    ├── API Root
    └── Health Check
```

⭐ = Most frequently used endpoints

## 🎯 Common Workflows

### Workflow 1: New User Setup
1. **Authentication** → **Login**
2. **User Management** → **Get Current User (Me)**
3. **User Management** → **Change Password** (if needed)

### Workflow 2: Create New User
1. **Role Management** → **Get Roles Dropdown** (get available roles)
2. **Location - Provinces** → **Get Provinces Dropdown** (select province)
3. **Location - Districts** → **Get Districts Dropdown** (select district)
4. **User Management** → **Create User** (use IDs from above)

### Workflow 3: Populate Dropdowns
1. **Location - Provinces** → **Get Provinces Dropdown**
2. **Location - Districts** → **Get Districts Dropdown** (with province filter)
3. **Location - Municipalities** → **Get Municipalities Dropdown** (with district filter)
4. **Master Data** → **Get Master Data by Category** (e.g., ethnicity, religion)

### Workflow 4: Get Statistics
1. **User Management** → **Get User Statistics**
2. **Location - Provinces** → **Get Province Statistics**
3. **Location - Districts** → **Get District Statistics**
4. **Location - Municipalities** → **Get Municipality Statistics**

## 🔑 Authentication Flow

```
1. Login
   POST /api/auth/login/
   Body: { "email": "...", "password": "..." }
   Response: { "access": "...", "refresh": "..." }
   
2. Tokens Auto-Saved
   ✅ access_token → {{access_token}}
   ✅ refresh_token → {{refresh_token}}
   
3. All Requests Authenticated
   Header: Authorization: Bearer {{access_token}}
   
4. Token Expires (8 hours)
   POST /api/auth/token/refresh/
   Body: { "refresh": "{{refresh_token}}" }
   
5. Logout
   POST /api/auth/logout/
   Body: { "refresh": "{{refresh_token}}" }
```

## 📝 Sample Requests

### Login
```json
POST {{base_url}}/auth/login/

Body:
{
  "email": "admin@remimis.gov.np",
  "password": "Admin@123"
}
```

### Get Current User
```
GET {{base_url}}/users/me/

Headers:
Authorization: Bearer {{access_token}}
```

### Create User
```json
POST {{base_url}}/users/

Body:
{
  "email": "newuser@example.com",
  "password": "SecurePass@123",
  "first_name": "John",
  "last_name": "Doe",
  "employee_id": "EMP001",
  "role": "role-uuid-here",
  "profile": {
    "office_level": "DISTRICT",
    "province": "province-uuid",
    "district": "district-uuid",
    "phone_number": "9841234567"
  }
}
```

### Get Master Data for Dropdown
```
GET {{base_url}}/master-data/by_category/?field_category=ethnicity&is_active=true

Headers:
Authorization: Bearer {{access_token}}
```

### Get Districts by Province
```
GET {{base_url}}/locations/districts/dropdown/?province=province-uuid-here

Headers:
Authorization: Bearer {{access_token}}
```

## 🔍 Query Parameters

### Pagination (List endpoints)
- `page=1` - Page number
- `page_size=10` - Items per page

### Filtering
- `role=uuid` - Filter by role (users)
- `province=uuid` - Filter by province (districts, municipalities)
- `district=uuid` - Filter by district (municipalities)
- `is_active=true` - Filter active records
- `type=MUNICIPALITY` - Filter by municipality type

### Search
- `search=keyword` - Search in name, email, etc.

### Ordering
- `ordering=name` - Order by field
- `ordering=-created_at` - Descending order

## 📊 Response Format

### Success Response
```json
{
  "id": "uuid",
  "field1": "value1",
  "field2": "value2",
  ...
}
```

### Paginated Response
```json
{
  "count": 100,
  "next": "http://...?page=2",
  "previous": null,
  "results": [
    { "id": "uuid", ... },
    { "id": "uuid", ... }
  ]
}
```

### Error Response
```json
{
  "detail": "Error message",
  "error": "Error details"
}
```

## 🎨 Postman Features Used

### Pre-request Scripts
- None (simple setup)

### Tests Scripts
- **Login request**: Auto-saves tokens to collection variables
- **Token Refresh**: Updates access_token automatically

### Collection Variables
- Used for base_url, tokens, and user_id
- Automatically updated after login

### Authorization
- Inherits from collection level
- Uses Bearer Token with {{access_token}}

## 🐛 Troubleshooting

### Issue: 401 Unauthorized
**Solution**: 
1. Run **Authentication** → **Login** again
2. Check if token expired (8 hours)
3. Use **Token Refresh** to get new token

### Issue: 404 Not Found
**Solution**:
1. Check `base_url` variable
2. Ensure server is running
3. Verify endpoint path

### Issue: 403 Forbidden
**Solution**:
1. Check user role/permissions
2. Verify geographic scope access
3. Some endpoints require Super Admin

### Issue: 400 Bad Request
**Solution**:
1. Check required fields in request body
2. Validate UUID format
3. Ensure field types match schema

## 💡 Tips & Best Practices

1. **Always Login First** - Run login before any other request
2. **Use Dropdown Endpoints** - For getting IDs to use in create/update
3. **Check Statistics** - Use statistics endpoints to verify data
4. **Filter by Scope** - Districts by province, municipalities by district
5. **Active Records** - Use `is_active=true` to filter deleted records
6. **Pagination** - Use pagination for large datasets
7. **Search** - Use search parameter for quick lookups
8. **Save Responses** - Save example responses in Postman for reference

## 📚 Additional Resources

- **OpenAPI Spec**: `openapi-specification.yaml`
- **Full Documentation**: `API-DOCUMENTATION-README.md`
- **User Management Guide**: `USER-MANAGEMENT-API-DOCUMENTATION.md`
- **Master Data Guide**: `MASTER_DATA_API.md`
- **Frontend Integration**: `FRONTEND-INTEGRATION-GUIDE.md`

## 🔄 Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.0 | Jan 14, 2026 | Complete rewrite with all modules |
| 1.0 | Earlier | Initial version (deprecated) |

---

**Need Help?**
- Check `API-DOCUMENTATION-README.md` for detailed documentation
- Contact: support@remimis.gov.np

**Happy Testing! 🚀**
