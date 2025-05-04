

## Snapi API routes

### Sneakers

**GET**	/sneakers : List all sneakers

Query Parameters:
- `release_date_after`: Filter by release date (e.g., 2024-05-01)
    - Type: string (date)
- `limit`: Maximum number of items to return
    - Type: integer
    - Minimum: 1
    - Maximum: 100
    - Default: 20

Examples:
```
/sneakers?limit=10                         # Show only 10 sneakers
/sneakers?release_date_after=2022-05-01    # Show sneakers released after May 5th, 2022
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

