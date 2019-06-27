#Dynamic Mapping

PUT ecommerce/person/1
 {
   "name": "john",
   "age": 100,
   "date_of_birth": "1970/01/01"
 }

GET ecommerce/person/_mapping



//Newly detected fields are ignored.These fields will not be indexed so will not be searchable but 
//will still appear in the _source field of returned hits. These 
//fields will not be added to the mapping
put ecommerce1
 {
   "mappings":
   {
     "news":
     {
       "dynamic":false,
       "properties":{
         "desc":
         {
           "type":"text"
       }
     }
   }
 }
 }
 
 PUT ecommerce1/news/1
 {
   "name1": "john",
   "age": 100,
   "date_of_birth": "1970/01/01",
   "desc":"news"
 }
 
get ecommerce1/news/1
get ecommerce1/_mapping

put ecommerce2
 {
   "mappings":
   {
     "news":
     {
       "dynamic" : "strict",
       "properties":{
         "desc":
         {
           "type":"text"
       }
     }
   }
 }
 }
 //throws an error
 PUT ecommerce2/news/1
 {
   "name1": "john",
   "age": 100,
   "date_of_birth": "1970/01/01",
   "desc":"news"
 }

PUT ecommerce/_mapping/news
 {
   "date_detection": false,
   "properties": {
     "source": {
       "type": "text"
     }
   }
 }


GET /product/default/_mapping



PUT chapter3/person/1
 {
   "name": "john",
   "age": 100,
   "date_of_birth": "1970/01/01"
 }
 
 
 GET chapter3/person/_mapping

#Create index with mapping

#Delete existing index if any
DELETE ecommerce

PUT ecommerce
 {
   "mappings": {
     "user": {
       "properties": {
         "age": {
           "type": "integer"
         },
         "email": {
           "type": "keyword"
         },
         "gender": {
           "type": "keyword"
         },
         "id": {
           "type": "integer"
         },
         "last_modified_date": {
           "type": "date",
           "format": "yyyy-MM-dd"
         },
         "name": {
           "type": "keyword"
         }
       }
     }
   }
 }



#Get existing mapping

GET ecommerce/_mapping

GET ecommerce/user/_mapping

// new fields can be added and mapping will be updated 
// with the new fields
put ecommerce/user/1 
{
  "age":60,
  "age1":61
}

GET ecommerce/user/_mapping

#Analyzers

select * from news where desc like '%yosemite%'

GET _analyze?analyzer=english&text=It+will+be+raining+in+yosemite+this+weekend

GET _analyze?analyzer=english&text=rain+in+yosemite

PUT ecommerce/_mapping/wea
 {
   "properties": {
     "desc": {
       "type": "text",
       "analyzer": "english"
     }
   }
 }

#Core Data Types

#Text


PUT ecommerce/_mapping/news
 {
   "properties": {
     "description": {
       "type": "text",
       "analyzer": "english"
     }
   }
 }

#Keyword

PUT ecommerce/_mapping/user
 {
   "properties": {
     "email": {
       "type": "keyword"
     }
   }
 }


#Date

PUT ecommerce/_mapping/news
 {
   "properties": {
     "creation_date": {
       "type": "date",
       "format": "yyyy-MM-dd"
     }
   }
 }

PUT ecommerce/_mapping/news
 {
   "properties": {
     "creation_date": {
       "type": "date",
       "format": "YYYY-mm-dd||YYYY-mm-dd HH:mm:ss"
     }
   }
 }

#Numeric

PUT ecommerce/_mapping/wea
 {
   "properties": {
     "temperature": {
       "type": "scaled_float",
       "scaling_factor": "100"
     }
   }
 }

#Boolean 


PUT ecommerce/_mapping/boolean
{
   "properties": {
     "boolean_field": {
       "type": "boolean"
     }
   }
 }

#Binary

PUT ecommerce/_mapping/binary
{
   "properties": {
     "binary_field": {
       "type": "binary"
     }
   }
 }

#Geo Data Type

PUT ecommerce/_mapping/address
 {
   "properties": {
     "geo_location": {
       "type": "geo_point"
     }
   }
 }

 PUT ecommerce/address/1
 {
   "street": "123 High Lane",
   "city": "Big City",
   "geo_location": {
     "lat": 37.3,
     "lon": 121.8
   }
 }


#Specialized Data Type

 PUT ecommerce/_mapping/history
 {
   "properties": {
     "ip_address": {
       "type": "ip"
     }
   }
 }



#Routing

 PUT ecommerce/_mapping/order
 {
   "_routing": {
     "required": true
   },
   "properties": {
     "order_id": {
       "type": "text"
     },
     "user_id": {
       "type": "keyword"
     },
     "order_total": {
       "type": "integer"
     }
   }
 }


PUT ecommerce/order/1?routing=user1 
 {
   "order_id": "23y86",
   "user_id": "user1",
   "order_total": 15
 }


GET ecommerce/order/1?routing=user1


#Managing an index

GET ecommerce/_settings

DELETE ecommerce

PUT ecommerce 
{
 "settings": {
   "index": {
     "number_of_shards": "3",
     "number_of_replicas": "1"
    }
  }
}

GET ecommerce/_settings

PUT ecommerce/_settings 
{
 "index": {
   "number_of_replicas": 2
  }
}

By default, the refresh interval is 60 second, due to which the documents indexed are only
available for search after 60 second. If you need a document to be searchable immediately
after you index, you can set refresh to true

PUT ecommerce/person/3?refresh=true
 {
   "id": 3,
   "name": "User3",
   "age": "55",
   "gender": "M",
   "email": "user3@gmail.com",
   "last_modified_date": "2017-02-15"
 }


POST ecommerce/_refresh

POST /_refresh

 PUT ecommerce/_settings
 {
   "index": {
     "refresh_interval": "30s"
   }
 }