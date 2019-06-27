
## Adding document with auto generated ID:

POST /product/default
{
  "name": "Processing Events with Logstash",
  "instructor": {
    "firstName": "Bo",
    "lastName": "Andersen"
  }
}

GET /product
GET /product/default/_search

## Adding document by ID:

PUT /product/default/1
{
  "name": "Complete Guide to Elasticsearch",
  "instructor": {
    "firstName": "Bo",
    "lastName": "Andersen"
  }
}

GET /product/default/1

get /product/default/1?_source=name

## To check exists or not

HEAD /product/default/1  - is same as curl -i -XHEAD http://localhost:9200/chapter1/product/1

## Replacing an existing document

```
PUT /product/default/1
{
  "name": "Complete Guide to Elasticsearch",
  "price": 195,
  "instructor": {
    "firstName": "Bo",
    "lastName": "Andersen"
  }
}
```

## Retrieving the replaced document

```
GET /product/default/1


 
 
DELETE product  - deletes the index
DELETE /product/default/1/ - deletes the document




GET /product/default/1

## Deleting the existing document

DELETE /product/default/1


--- partial update
POST /product/default/1/_update    --- POST http://localhost:9200/chapter1/product/1/_update
 {
   "doc": {
     "category": "technical books updated"
   }
 }
 
 GET /product/default/1/
 {
   "doc": {
     "category": "technical books"
   }
 }

 -- UPSERT

POST /product/default/1/_update
{
    "script" : "ctx._source.price += 5",
    "upsert" : {
        "price" : 100
    }
}