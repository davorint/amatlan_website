# Magic Amatlán API Documentation

## Overview

The Magic Amatlán API provides comprehensive endpoints for managing a spiritual wellness directory platform. It includes authentication, content management, booking system, community features, and more.

**Base URL**: `http://localhost:3000/api` (development)

**Authentication**: JWT tokens via `Authorization: Bearer <token>` header

## Authentication

### Register User
- **POST** `/auth/register`
- **Body**: `{ name, email, password }`
- **Response**: `{ success, user, message }`

### Login
- **POST** `/auth/login`
- **Body**: `{ email, password }`
- **Response**: `{ success, user, token, message }`

### Get Current User
- **GET** `/auth/me`
- **Auth Required**: Yes
- **Response**: `{ success, user }`

## Experiences

### List Experiences
- **GET** `/experiences`
- **Query Params**: `category`, `featured`, `active`, `page`, `limit`
- **Response**: `{ success, experiences, pagination }`

### Get Experience
- **GET** `/experiences/{id}`
- **Response**: `{ success, experience }`

### Create Experience
- **POST** `/experiences`
- **Auth Required**: Yes (Facilitator/Admin)
- **Body**: `{ title, slug, description, category, price, etc. }`
- **Response**: `{ success, experience, message }`

### Update Experience
- **PUT** `/experiences/{id}`
- **Auth Required**: Yes (Owner/Admin)
- **Response**: `{ success, experience, message }`

### Delete Experience
- **DELETE** `/experiences/{id}`
- **Auth Required**: Yes (Owner/Admin)
- **Response**: `{ success, message }`

## Experience Sessions

### List Sessions for Experience
- **GET** `/experiences/{id}/sessions`
- **Query Params**: `active`, `upcoming`, `available`
- **Response**: `{ success, sessions }`

### Create Session
- **POST** `/experiences/{id}/sessions`
- **Auth Required**: Yes (Facilitator/Admin)
- **Body**: `{ startTime, endTime, maxCapacity, price }`
- **Response**: `{ success, session, message }`

### Update Session
- **PUT** `/sessions/{id}`
- **Auth Required**: Yes (Facilitator/Admin)
- **Response**: `{ success, session, message }`

### Delete Session
- **DELETE** `/sessions/{id}`
- **Auth Required**: Yes (Facilitator/Admin)
- **Response**: `{ success, message }`

## Reviews

### List Reviews
- **GET** `/reviews`
- **Query Params**: `experienceId`, `userId`, `verified`, `page`, `limit`
- **Response**: `{ success, reviews, pagination }`

### Create Review
- **POST** `/reviews`
- **Auth Required**: Yes
- **Body**: `{ experienceId, rating, title, content, images }`
- **Response**: `{ success, review, message }`

### Update Review
- **PUT** `/reviews/{id}`
- **Auth Required**: Yes (Owner/Admin)
- **Response**: `{ success, review, message }`

### Delete Review
- **DELETE** `/reviews/{id}`
- **Auth Required**: Yes (Owner/Admin)
- **Response**: `{ success, message }`

## Bookings

### List Bookings
- **GET** `/bookings`
- **Query Params**: `userId`, `experienceId`, `status`, `page`, `limit`
- **Response**: `{ success, bookings, pagination }`

### Create Booking
- **POST** `/bookings`
- **Auth Required**: Yes
- **Body**: `{ experienceId, sessionId, participants, contactInfo }`
- **Response**: `{ success, booking, message }`

### Update Booking
- **PUT** `/bookings/{id}`
- **Auth Required**: Yes (Owner/Facilitator/Admin)
- **Body**: `{ status, participants, specialRequests }`
- **Response**: `{ success, booking, message }`

### Cancel Booking
- **DELETE** `/bookings/{id}`
- **Auth Required**: Yes (Owner/Facilitator/Admin)
- **Response**: `{ success, message }`

## Events

### List Events
- **GET** `/events`
- **Query Params**: `featured`, `upcoming`, `tags`, `page`, `limit`
- **Response**: `{ success, events, pagination }`

### Get Event
- **GET** `/events/{id}`
- **Response**: `{ success, event }`

### Create Event
- **POST** `/events`
- **Auth Required**: Yes (Facilitator/Admin)
- **Body**: `{ title, slug, description, startDate, endDate, location, etc. }`
- **Response**: `{ success, event, message }`

### Update Event
- **PUT** `/events/{id}`
- **Auth Required**: Yes (Admin)
- **Response**: `{ success, event, message }`

### Delete Event
- **DELETE** `/events/{id}`
- **Auth Required**: Yes (Admin)
- **Response**: `{ success, message }`

### Register for Event
- **POST** `/events/{id}/register`
- **Auth Required**: Yes
- **Response**: `{ success, registration, message }`

### Unregister from Event
- **DELETE** `/events/{id}/register`
- **Auth Required**: Yes
- **Response**: `{ success, message }`

## Community

### List Community Posts
- **GET** `/community`
- **Query Params**: `type`, `featured`, `tags`, `userId`, `page`, `limit`
- **Response**: `{ success, posts, pagination }`

### Get Community Post
- **GET** `/community/{id}`
- **Response**: `{ success, post }`

### Create Community Post
- **POST** `/community`
- **Auth Required**: Yes
- **Body**: `{ title, content, images, tags, type }`
- **Response**: `{ success, post, message }`

### Update Community Post
- **PUT** `/community/{id}`
- **Auth Required**: Yes (Owner/Admin)
- **Response**: `{ success, post, message }`

### Delete Community Post
- **DELETE** `/community/{id}`
- **Auth Required**: Yes (Owner/Admin)
- **Response**: `{ success, message }`

### List Comments for Post
- **GET** `/community/{id}/comments`
- **Query Params**: `page`, `limit`
- **Response**: `{ success, comments, pagination }`

### Add Comment to Post
- **POST** `/community/{id}/comments`
- **Auth Required**: Yes
- **Body**: `{ content, parentId? }`
- **Response**: `{ success, comment, message }`

### Update Comment
- **PUT** `/comments/{id}`
- **Auth Required**: Yes (Owner/Admin)
- **Body**: `{ content }`
- **Response**: `{ success, comment, message }`

### Delete Comment
- **DELETE** `/comments/{id}`
- **Auth Required**: Yes (Owner/Admin)
- **Response**: `{ success, message }`

## Users

### List Users (Admin Only)
- **GET** `/users`
- **Auth Required**: Yes (Admin)
- **Query Params**: `role`, `verified`, `page`, `limit`
- **Response**: `{ success, users, pagination }`

### Get User Profile
- **GET** `/users/{id}`
- **Response**: `{ success, user }`

### Update User Profile
- **PUT** `/users/{id}`
- **Auth Required**: Yes (Owner/Admin)
- **Body**: `{ name, avatar, role? }`
- **Response**: `{ success, user, message }`

### Delete User Account
- **DELETE** `/users/{id}`
- **Auth Required**: Yes (Owner/Admin)
- **Response**: `{ success, message }`

## Facilitators

### List Facilitators
- **GET** `/facilitators`
- **Query Params**: `verified`, `subscriptionPlan`, `page`, `limit`
- **Response**: `{ success, facilitators, pagination }`

### Register as Facilitator
- **POST** `/facilitators`
- **Auth Required**: Yes
- **Body**: `{ bio, phone, website, socialMedia }`
- **Response**: `{ success, facilitator, message }`

### Get Facilitator Profile
- **GET** `/facilitators/{id}`
- **Response**: `{ success, facilitator }`

### Update Facilitator Profile
- **PUT** `/facilitators/{id}`
- **Auth Required**: Yes (Owner/Admin)
- **Response**: `{ success, facilitator, message }`

### Delete Facilitator Profile
- **DELETE** `/facilitators/{id}`
- **Auth Required**: Yes (Owner/Admin)
- **Response**: `{ success, message }`

## Guides

### List Guides
- **GET** `/guides`
- **Query Params**: `category`, `difficulty`, `featured`, `published`, `tags`, `search`, `page`, `limit`
- **Response**: `{ success, guides, pagination }`

### Get Guide
- **GET** `/guides/{id}`
- **Response**: `{ success, guide }`

### Create Guide
- **POST** `/guides`
- **Auth Required**: Yes (Facilitator/Admin)
- **Body**: `{ title, slug, description, content, category, difficulty, etc. }`
- **Response**: `{ success, guide, message }`

### Update Guide
- **PUT** `/guides/{id}`
- **Auth Required**: Yes (Facilitator/Admin)
- **Response**: `{ success, guide, message }`

### Delete Guide
- **DELETE** `/guides/{id}`
- **Auth Required**: Yes (Admin)
- **Response**: `{ success, message }`

## Blog

### List Blog Posts
- **GET** `/blog`
- **Query Params**: `category`, `featured`, `published`, `tags`, `search`, `page`, `limit`
- **Response**: `{ success, posts, pagination }`

### Get Blog Post
- **GET** `/blog/{slug}`
- **Response**: `{ success, post }`

### Create Blog Post
- **POST** `/blog`
- **Auth Required**: Yes (Facilitator/Admin)
- **Body**: `{ title, slug, excerpt, content, coverImage, category, etc. }`
- **Response**: `{ success, post, message }`

### Update Blog Post
- **PUT** `/blog/{slug}`
- **Auth Required**: Yes (Admin)
- **Response**: `{ success, post, message }`

### Delete Blog Post
- **DELETE** `/blog/{slug}`
- **Auth Required**: Yes (Admin)
- **Response**: `{ success, message }`

## Weather

### Get Current Weather
- **GET** `/weather`
- **Response**: `{ success, weather }`

## Error Responses

All endpoints return consistent error responses:

```json
{
  "error": "Error message",
  "details": [...] // Optional validation details
}
```

**HTTP Status Codes**:
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `409`: Conflict
- `500`: Internal Server Error

## Rate Limiting

API endpoints are rate-limited to prevent abuse. Limits vary by endpoint type:
- Authentication: 10 requests/minute
- Read operations: 100 requests/minute
- Write operations: 30 requests/minute

## Pagination

List endpoints support pagination with query parameters:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)

**Response format**:
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
```