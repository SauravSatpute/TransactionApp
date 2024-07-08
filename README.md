
# Transaction app

## API Reference

### How to run project 
## 1. install libraries
## 2. start backend server : node index.js - PORT 8080
## 3. start react app : npm start - PORT 3000


## Demo

Insert gif or link to demo
![](https://github.com/SauravSatpute/TransactionApp/blob/main/project.gif)



## API Reference

#### POST

```http
  POST api/initialize
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `None`    | `None`   |  Create API to initialize the Database fetch the JSON from the third party API .                    |

#### Get item

```http
  GET /api//transactions?month=3

  eg. http://localhost:8080/transactions?month=3
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `month`      | `Integer` | Return Search Query |


#### Get item

```http
  GET /api//statistics?month=07

  eg. http://localhost:8080/statistics?month=07
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `month`      | `Integer` | Total sale amount of selected month Total number of sold items of selected month and Total number of not sold items of selected month |

#### Get item

```http
  GET /api//barchart?month=9

  eg. http://localhost:8080/barchart?month=9
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `month`      | `Integer` | the response contain price range and the number of items in that range for the selected month regardless of the year |


#### Get item

```http
  GET /api//piechart?month=05

  eg. http://localhost:8080/piechart?month=05
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `month`      | `Integer` | pie chart Find unique categories and number of items from that category for the selected month regardless of the year. |

#### Get item

```http
  GET /api//piechart?month=07

  eg. http://localhost:8080/combined-data?month=07
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `month`      | `Integer` | API which fetches the data from all the 3 APIs mentioned above, combines the response and sends a final response of the combined JSON |










## Authors

- [@SauravSatpute](https://github.com/SauravSatpute)


## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.



