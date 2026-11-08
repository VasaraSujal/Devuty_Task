# Tactyqal Labs Backend - Integration Test Plan

## Test Environment
- Test database: SQLite (in-memory) or separate PostgreSQL test instance
- Use `NODE_ENV=test` for test runs
- Prisma test client with separate schema

## Test Categories

### 1. Authentication Tests

#### 1.1 Valid Login
- POST `/api/v1/auth/login` with valid credentials
- Expect: 200 OK, access_token + refresh_token cookies set, user data returned
- Verify: cookies are HTTP-only, Secure (in prod), SameSite=Lax/None

#### 1.2 Invalid Login - Wrong Password
- POST `/api/v1/auth/login` with valid email, wrong password
- Expect: 401 UNAUTHORIZED, "Invalid credentials"

#### 1.3 Invalid Login - Non-existent User
- POST `/api/v1/auth/login` with non-existent email
- Expect: 401 UNAUTHORIZED, "Invalid credentials" (same message to prevent enumeration)

#### 1.4 Missing Credentials
- POST `/api/v1/auth/login` without email or password
- Expect: 400 VALIDATION_ERROR

#### 1.5 Refresh Token Rotation
- Login → get refresh_token
- POST `/api/v1/auth/refresh` with refresh_token
- Expect: 200 OK, new access_token + refresh_token cookies
- Verify: old refresh_token is revoked (cannot be used again)

#### 1.6 Refresh Token Reuse Detection
- Login → get refresh_token
- Refresh once → get new refresh_token
- Try to use OLD refresh_token again
- Expect: 401 UNAUTHORIZED, "possible token reuse detected"

#### 1.7 Logout Revokes Session
- Login → get refresh_token
- POST `/api/v1/auth/logout` with refresh_token
- Expect: 200 OK, cookies cleared
- Try to use refresh_token after logout
- Expect: 401 UNAUTHORIZED

#### 1.8 /me Without Authentication
- GET `/api/v1/auth/me` without cookies
- Expect: 401 UNAUTHORIZED

#### 1.9 /me With Valid Token
- Login → GET `/api/v1/auth/me`
- Expect: 200 OK, user data returned

#### 1.10 Expired Refresh Token
- Manually create expired session
- Try to refresh
- Expect: 401 UNAUTHORIZED, "Refresh token expired"

### 2. Authorization Tests

#### 2.1 Unauthenticated Request Rejection
- POST `/api/v1/posts` without auth
- Expect: 401 UNAUTHORIZED

#### 2.2 Admin Permissions
- Login as ADMIN
- POST `/api/v1/posts` → 201 CREATED
- POST `/api/v1/categories` → 201 CREATED
- POST `/api/v1/tags` → 201 CREATED
- DELETE `/api/v1/posts/:id` (any author's post) → 200 OK
- PATCH `/api/v1/posts/:id/status` (any author's post) → 200 OK

#### 2.3 Author Permissions
- Login as AUTHOR
- POST `/api/v1/posts` → 201 CREATED
- GET `/api/v1/admin/posts` → only own posts
- PUT `/api/v1/posts/:id` (own post) → 200 OK
- DELETE `/api/v1/posts/:id` (own post) → 200 OK
- PATCH `/api/v1/posts/:id/status` (own post) → 200 OK

#### 2.4 Author Cannot Modify Another Author's Post
- Create Author A, create post
- Login as Author B
- PUT `/api/v1/posts/:id` (Author A's post)
- Expect: 403 FORBIDDEN

#### 2.5 Author Cannot Delete Another Author's Post
- Create Author A, create post
- Login as Author B
- DELETE `/api/v1/posts/:id` (Author A's post)
- Expect: 403 FORBIDDEN

#### 2.6 Author Cannot Change Another Author's Post Status
- Create Author A, create post
- Login as Author B
- PATCH `/api/v1/posts/:id/status` (Author A's post)
- Expect: 403 FORBIDDEN

#### 2.7 Author Cannot Access Another Author's Private Post
- Create Author A, create DRAFT post
- Login as Author B
- GET `/api/v1/admin/posts/:id` (Author A's post)
- Expect: 403 FORBIDDEN

#### 2.8 Author Cannot Manage Categories/Tags
- Login as AUTHOR
- POST `/api/v1/categories` → 403 FORBIDDEN
- POST `/api/v1/tags` → 403 FORBIDDEN
- DELETE `/api/v1/categories/:id` → 403 FORBIDDEN

### 3. Blog Post Tests

#### 3.1 Create Post
- POST `/api/v1/posts` with valid data
- Expect: 201 CREATED, slug auto-generated if not provided

#### 3.2 Create Post - Slug Collision Handling
- Create post with title "Test Post" → slug "test-post"
- Create another post with title "Test Post" → slug "test-post-1"
- Expect: Both created with unique slugs

#### 3.3 Read Post
- GET `/api/v1/admin/posts/:id`
- Expect: 200 OK, full post with relations

#### 3.4 Update Post
- PUT `/api/v1/posts/:id` with partial data
- Expect: 200 OK, only provided fields updated

#### 3.5 Soft Delete Post
- DELETE `/api/v1/posts/:id`
- Expect: 200 OK, post.deletedAt set
- Verify: post not in public list

#### 3.6 Publish Post
- Create DRAFT post
- PATCH `/api/v1/posts/:id/status` with status=PUBLISHED
- Expect: 200 OK, publishedAt set, visible in public API

#### 3.7 Archive Post
- Create PUBLISHED post
- PATCH `/api/v1/posts/:id/status` with status=ARCHIVED
- Expect: 200 OK, not in public API

#### 3.8 Invalid Category/Tag References
- POST `/api/v1/posts` with non-existent categoryId
- Expect: 404 NOT_FOUND

#### 3.9 Unauthorized Post Access
- Author A creates post
- Author B tries to access via `/api/v1/admin/posts/:id`
- Expect: 403 FORBIDDEN

### 4. Public API Tests

#### 4.1 Published Posts Visible
- Create PUBLISHED post with publishedAt <= now
- GET `/api/v1/posts`
- Expect: Post in results

#### 4.2 Draft Posts Hidden
- Create DRAFT post
- GET `/api/v1/posts`
- Expect: Post NOT in results

#### 4.3 Archived Posts Hidden
- Create ARCHIVED post
- GET `/api/v1/posts`
- Expect: Post NOT in results

#### 4.4 Soft-Deleted Posts Hidden
- Create PUBLISHED post, soft delete
- GET `/api/v1/posts`
- Expect: Post NOT in results

#### 4.5 Future-Scheduled Posts Hidden
- Create PUBLISHED post with publishedAt = future
- GET `/api/v1/posts`
- Expect: Post NOT in results

#### 4.6 Pagination
- Create 25 posts
- GET `/api/v1/posts?page=1&limit=10`
- Expect: 10 items, pagination.totalPages = 3

#### 4.7 Category Filtering
- Create posts in different categories
- GET `/api/v1/posts?category=engineering`
- Expect: Only engineering posts

#### 4.8 Tag Filtering
- Create posts with different tags
- GET `/api/v1/posts?tag=react`
- Expect: Only posts with react tag

#### 4.9 Search
- Create posts with searchable content
- GET `/api/v1/posts?search=keyword`
- Expect: Matching posts returned

#### 4.10 Get Post by Slug
- GET `/api/v1/posts/:slug` for published post
- Expect: 200 OK, full post

#### 4.11 Get Post by Slug - Not Found
- GET `/api/v1/posts/non-existent-slug`
- Expect: 404 NOT_FOUND

#### 4.12 Get Post by Slug - Draft/Archived/Deleted
- Create DRAFT/ARCHIVED/DELETED post
- GET `/api/v1/posts/:slug`
- Expect: 404 NOT_FOUND

### 5. Category/Tag Tests

#### 5.1 Create Category (Admin)
- POST `/api/v1/categories` as ADMIN
- Expect: 201 CREATED, slug auto-generated

#### 5.2 Duplicate Category Name
- Create category, try create same name
- Expect: 409 CONFLICT

#### 5.3 Delete Category with Posts
- Create category, create post in it
- DELETE `/api/v1/categories/:id`
- Expect: 409 CONFLICT

#### 5.4 Create Tag (Admin)
- POST `/api/v1/tags` as ADMIN
- Expect: 201 CREATED

#### 5.5 Delete Tag with Posts
- Create tag, create post with it
- DELETE `/api/v1/tags/:id`
- Expect: 409 CONFLICT

### 6. Media Tests

#### 6.1 Valid Image Upload
- POST `/api/v1/media/upload` with JPEG/PNG/WebP/GIF
- Expect: 201 CREATED, URL returned

#### 6.2 Invalid File Type
- Upload PDF/EXE/SVG (disabled)
- Expect: 400 INVALID_FILE_TYPE

#### 6.3 File Too Large
- Upload > 5MB file
- Expect: 400 FILE_TOO_LARGE

#### 6.4 File Signature Mismatch
- Upload file with wrong magic bytes
- Expect: 400 FILE_SIGNATURE_MISMATCH

#### 6.5 Production Mock Storage Blocked
- In production without Supabase config
- POST `/api/v1/media/upload`
- Expect: 500 STORAGE_CONFIG_MISSING

#### 6.6 Media Deletion Path Validation
- DELETE `/api/v1/media/../../etc/passwd`
- Expect: 400 INVALID_PATH

## Test Setup

```bash
# Run with test environment
NODE_ENV=test npm test

# Or with Jest
npx jest --runInBand --detectOpenHandles
```

## Test Database
- Use SQLite in-memory for unit tests
- Use separate PostgreSQL for integration tests
- Clean up between test suites