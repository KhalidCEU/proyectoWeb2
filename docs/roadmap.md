## Roadmap

- [x] Start an OpenAPI document

- [x] The API offers a REST interface and allows CRUD operations on the DB
    - [x] The database is a MongoDB database.
    - [x] The database is **automatically seeded** on launch if it's empty.
    - [ ] At least one message is in XML format and has an associated schema.
    - [x] At least one response is in JSON format
    - [ ] There are at least 3 resources and they are related to each other.
    - [x] One of the collections has at least **1000 documents**
        - [x] There is a **dataset** to seed this collection in the repository ( -> this dataset is in **JSON format**)
        - [ ] At least one route allows pagination
        - [x] At least one route allows filtering data to search inside this collection

- [x] Uses an external API
    - [ ] At least one consumed message is in XML format
    - [x] At least one consumed message is in JSON format
    - [x] The consumed information is integrated with our API and data is saved in our DB.
    - [x] The API keeps working even if the external API is down.
