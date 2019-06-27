GET _cat/indices
PUT /myindex
{
    "settings" : {

        "index" : {

            "number_of_shards" : 2,

            "number_of_replicas" : 1

        }

    }

}

DELETE /myindex

POST /myindex/_close
POST /myindex/_open


POST /myindex/_refresh

PUT /myindex/order/_mapping
{

    "order" : {

        "properties" : {

           
            "name" : {"type" : "text"},

            "quantity" : {"type" : "integer"},

            "vat" : {"type" : "double"}

        }

    }

}

PUT myindex/order/1
{
   "name": "Men's High Performance Fleece Jacket",
   "vat": 79.99,
   "quantity": 250
 } 