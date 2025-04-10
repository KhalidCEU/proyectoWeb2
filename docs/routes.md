

## Snapi API routes

### Sneakers

**GET**	/sneakers : List all sneakers

Query Parameters:
- `stock`: Filter by stock level
    - `low`: Less than 50 items
    - `high`: 50 items or more
- `release_date_after`: Filter by release date (Format: YYYY-MM-DD)
- `limit`: Maximum number of results to return (default: 20, max: 100)

Examples:
```
/sneakers?stock=low                      # Show sneakers with low stock
/sneakers?release_date_after=2024-05-01  # Show upcoming releases
```

**GET**	/sneakers/{id} : Get a specific sneaker information

**POST** /sneakers : Create a new sneaker

**PUT**	/sneakers/{id} :  Update a specific sneaker information

**DELETE** /sneakers/{id} : Delete a specific review


### Reviews

**GET** /sneakers/{sneakerId}/reviews : Get all reviews for a specific sneaker

**POST** /sneakers/{sneakerId}/reviews : Create review for a sneaker

**GET**	/reviews/{reviewId} : Get a specific review

**PUT**	/reviews/{reviewId} : Update a specific review

**DELETE** /reviews/{reviewId} : Delete a specific review


### Users

**POST** /users : Create a new user

**GET** /users/{id} : Get a specific user information

**PUT** /users/{id} : Update a specific user information

**DELETE** /users/{id} : Delete a specific user

**GET**	/users/{id}/favorites : Get all favorite items of a specific user

**POST** /users/{id}/favorites : Add an item to favorites (needs the item id in the body)

**DELETE** /users/{id}/favorites/{sneakerId} : Delete an item from favorites


### Providers

**GET**	/providers : List all providers

**GET**	/providers/{id} : Get a specific provider information

**POST** /providers : Create a new provider

**PUT**	/providers/{id} : Update a specific provider information

**DELETE**	/providers/{id} : Delete a specific provider


### Stores

**GET**	/stores : List all stores

**GET**	/stores/{id} : Get a specific store information

**POST** /stores : Create a new store

**PUT**	/stores/{id} :  Update a specific store information

**DELETE**	/stores/{id} :  Delete a specific store

