## Snapi API routes

> Note: **All routes are prefixed with `/api/` (e.g., `/api/sneakers`).**

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
- `offset`: Number of items to skip before starting to collect the result set (useful for **pagination**)
    - Type: integer
    - Minimum: 0
    - Default: 0
- `currency`: Currency in which prices should be returned. See [currencies.md](/docs/currencies.md) for the list of **valid** currencies.
    - Type: string

    By default the prices are in USD.

Examples:
```
/sneakers?limit=10                         # Get only 10 sneakers
/sneakers?release_date_after=2022-05-01    # Get sneakers released after May 1st, 2022
/sneakers?currency=eur                     # Get sneakers with prices converted to EUR

# Get 2 sneakers released after October 22, 2021, priced in EUR
sneakers?currency=eur&limit=2&release_date_after=2021-10-22

 # Get 2 sneakers released after October 22, 2021, priced in EUR, skipping the first 5
/sneakers?currency=eur&limit=2&offset=5&release_date_after=2021-10-22
```

**GET**	/sneakers/{id} : Get a specific sneaker information

**POST** /sneakers : Create a new sneaker

**PUT**	/sneakers/{id} :  Update a specific sneaker information

**DELETE** /sneakers/{id} : Delete a specific review


### Reviews

**GET** /sneakers/{sneakerId}/reviews : Get all reviews for a specific sneaker

Query Parameters:
- `format`: Response format (optional, defaults to JSON)
    - Type: string
    Allowed values: **JSON, XML**

Examples:

```
# Get all reviews for sneaker with ID 682b89e24d2ea61f1a8ab86f (JSON format)
/sneakers/682b89e24d2ea61f1a8ab86f/reviews

# Get all reviews for sneaker with ID 682b89e24d2ea61f1a8ab86f (XML format)
/sneakers/682b89e24d2ea61f1a8ab86f/reviews?format=xml
```

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