#Sample Data

#Delete existing index if any
DELETE ecommercesite
 


#Index Documents
PUT ecommercesite/product/1
{
   "product_name": "Men High Performance Fleece Jacket",
   "description": "Best Value. All season fleece jacket",
   "unit_price": 79.99,
   "reviews": 250,
   "release_date": "2016-08-16"
 } 
 
PUT ecommercesite/product/2
{
   "product_name": "Men Water Resistant Jacket",
   "description": "Provides comfort during biking and hiking",
   "unit_price": 69.99,
   "reviews": 5,
   "release_date": "2017-03-02"
 } 
 
PUT ecommercesite/product/3
{
   "product_name": "Women wool Jacket",
   "description": "Helps you stay warm in winter",
   "unit_price": 59.99,
   "reviews": 10,
   "release_date": "2016-12-15"
 }

PUT ecommercesite/product/4
{
   "product_name": "Women wool ",
   "description": "Helps you stay warm in winter",
   "unit_price": 59.99,
   "reviews": 10,
   "release_date": "2016-12-15"
 }

#Querying Elasticsearch
POST ecommercesite/product/_search 
{
   "query": {
     "term": {
       "product_name" : "jeans"
     }
   }
 }



#Basic Query (Finding exact value)
# With Req URI
GET ecommercesite/product/_search?q=product_name:jacket

# with req body
POST ecommercesite/product/_search 
{
   "query": {
     "term": {
       "product_name" : "jacket"
     }
   }
 }

POST ecommercesite/_search 
{
   "query": {
     "terms": {
       "product_name" : ["jacket","fleece"]
     }
   }
 }
 
 

#match

POST ecommercesite/_search
 {
   "from" : 0,
   "size" : 10,
   "query" : {
     "match" : { 
       "product_name" : "wool jacket"
     }
   }
 }

 POST ecommercesite/_search
 {
   "from" : 0,
   "size" : 2,
   "query" : {
     "match" : { 
       "product_name" : "wool jacket"
     }
   }
 }

 #multi match

POST ecommercesite/_search
{
  "query": {
    "multi_match" : {
      "query":    "winter", 
      "fields": [ "product_name", "description" ] 
    }
  }
}

#queries vs filters



#Sort
POST ecommercesite/_search
 {
   "from": 0,
   "size": 10,
   "query": {
     "match": {
       "product_name": "jacket"
     }
   },
   "sort": {
     "unit_price": {
       "order": "desc"
     }
   }
 }

POST ecommercesite/_search
 {
   "from": 0,
   "size": 10,
   "query": {
     "match": {
       "product_name": "jacket"
     }
   },
   "sort": [
     {
       "unit_price": {
         "order": "desc"
       }
     },
     {
       "reviews": {
         "order": "desc"
       }
     }
   ]
 }

#Selecting  the fields in the response

POST ecommercesite/product/_search
 {
   "_source": [
     "product_name"
   ],
   "query": {
     "term": {
       "product_name": "jacket"
     }
   }
 }

POST ecommercesite/product/_search
 {
   "_source": [
     "pr*"
   ],
   "query": {
     "term": {
       "product_name": "jacket"
     }
   }
 }



#Querying Based On Range
POST ecommercesite/_search 
{
   "query": {
     "range": {
       "unit_price": {
         "gt": 50,
         "lte": 100
       }
     }
   }
 }

POST ecommercesite/_search
{
   "query": {
     "range": {
       "release_date": {
         "gt": "2017-01-01",
         "lte": "now"
       }
     }
   }
 }

#Handling dates
#to find all the documents that were modified within the last hour,
POST ecommercesite/_search
 {
   "query": {
     "range": {
       "release_date": {
         "gt": "now-1h"
       }
     }
   }
 }


 
 #Using more than one query

select * from Product where product_name like '%jacket%' and unit_price < 100

POST ecommercesite/_search
{
   "query": {
     "bool": {
       "must": [
         {
           "match": {
             "product_name": "jacket"
           }
         },
         {
           "range": {
             "unit_price": {
               "lt": "100"
             }
           }
         }
       ]
     }
   }
 }

 # Same as 
 select * from Product where 
product_name like '%Water Resistant Jacket%' 
or 
(product_name like '%Performance Fleece%' and unit_price < 100)
 
POST ecommercesite/_search
 {
   "query": {
     "bool": {
       "should": [ 
         {
           "match": {
             "product_name": {
               "query": "Water Resistant Jacket",
               "operator": "and"
             }
           }
         },
         {
           "bool": {
             "must": [ 
               {
                 "match": {
                   "product_name": {
                     "query": "Performance Fleece",
                     "operator": "and"
                   }
                 }
               },
               {
                 "range": {
                   "unit_price": {
                     "lte": "100"
                   }
                 }
               }
             ]
           }
         }
       ]
     }
   }
 }


#Analyzed versus Non-analyzed Fields
PUT ecommercesite2
# It will not work - keyword doesnt support analyzer, ,they will be stored as they are

 
PUT ecommercesite3/_mapping/fruit
 {
   
     "product_name": {
       "type": "keyword",
       "analyzer": "english"
     }
   }

PUT ecommercesite3/_mapping/fruit
 {
   "properties": {
     "product_id": {
       "type": "integer"
     },
     "product_name": {
       "type": "text",
       "analyzer": "english",
       "fields": {
         "keyword": {
           "type": "keyword"
         }
       }
     }
   }
 }

 PUT ecommercesite4/fruit/1  
{
   "product_id": 1,
   "product_name": "Red Gala Apple"
 }




DELETE ecommercesite4

get ecommercesite4/_mapping
 // full text query - will get results
 POST ecommercesite2/fruit/_search
 {
   "query": {
     "term": {
       "product_name": "apple"
     }
   }
 }
 / keyword query - no results
 POST ecommercesite2/fruit/_search
 {
   "query": {
     "term": {
       "product_name.keyword": "apple"
     }
   }
 }

GET _analyze?analyzer=standard&text=Red+Gala+Apple

POST ecommercesite2/fruit/_search
 {
   "query": {
     "term": {
       "product_name.keyword": "Red Gala Apple"
     }
   }
 }

#Term and Match Query

POST ecommercesite/product/_search
 {
   "query": {
     "term": {
       "product_name": "Women wool Jacket"
     }
   }
 }

POST ecommercesite/product/_search
 {
   "query": {
     "match": {
       "product_name": "Women wool Jacket"
     }
   }
 }

#If you want only the documents that contain all three terms, you can change the operator to
#and as shown here:
#
POST ecommercesite/product/_search
 {
   "query": {
     "match": {
       "product_name": {
         "query": "Women wool Jacket",
         "operator": "and"
       }
     }
   }
 }

#Match Phrase Query

#Match Phrase
 GET ecommercesite/_search
 {
   "query": {
     "match_phrase": {
       "description": "All season jacket"
     }
   }
 }

#Match Phrase
 GET ecommercesite/_search
 {
   "query": {
     "match_phrase": {
       "description": {
         "query": "All season jacket",
         "slop": 1
       }
     }
   }
 }


#Exists and Missing Queries

#Exists
 GET ecommercesite/product/_search
 {
   "query": {
     "exists" : {
       "field" : "reviews"
     }
   }
 }

#Missing
 GET ecommercesite/product/_search
 {
     "query": {
         "bool": {
             "must_not": {
                 "exists": {
                     "field": "reviews"
                 }
             }
         }
     }
 }




#Relevance

// the second document will have less score 
The reason why the second document has a lower score is that it has one
more term in the name feld compared to the frst document. 
Relevancy algorithm will give a higher score to the shorter documents.(as per length norm)

POST /scoring/doc/1
{
  "name":"first document"
}


POST /scoring/doc/2
{"name":"second example document"}

GET /scoring/_search?pretty
{

"query" : {

"match" : { "name" : "document" }

}

}

POST ecommercesite/_search
 {
   "query": {
     "term": {
       "product_name" : "jacket"
     }
   }
 }
 
 
 #How to boost relevance based on single field

POST ecommercesite/_search
 {
   "query": {
     "function_score": { 
       "query": { 
         "match": {
           "product_name" : "jacket"
         }
       },
       "field_value_factor": { 
         "field": "reviews" 
       }
     }
   }
 }

POST ecommercesite/_search
 {
   "query": {
     "function_score": {
       "query": {
         "match": {
           "product_name": {
             "query": "jacket"
           }
         }
       },
       "field_value_factor": {
         "field": "reviews",
         "factor": "0.25"
       }
     }
   }
 }

POST ecommercesite/_search
 {
   "query": {
     "function_score": {
       "query": {
         "match": {
           "product_name": {
             "query": "jacket"
           }
         }
       },
       "field_value_factor": {
         "field": "reviews",
         "modifier": "log1p"
       }
     }
   }
 }
 
#How to boost score based on queries 

POST ecommercesite/_search
 {
   "query": {
     "bool": {
       "must": [
         {
           "match": {
             "product_name": "jacket"
           }
         }
       ],
       "should": [
         {
           "range": {
             "unit_price": {
               "lt": 100
             }
           }
         },
         {
           "range": {
             "reviews": {
               "gte": 25
             }
           }
         }
       ]
     }
   }
 }

POST ecommercesite/_search
 {
   "query": {
     "bool": {
       "must": [
         {
           "match": {
             "product_name": "jacket"
           }
         }
       ],
       "should": [
         {
           "range": {
             "unit_price": {
               "lt": 100,
               "boost": 0.5
             }
           }
         },
         {
           "range": {
             "reviews": {
               "gte": 25,
               "boost": 2
             }
           }
         }
       ]
     }
   }
 }
 
 
 #How to boost relevance using decay functions

# this wont serve a purpose in scoring as the last year jan and dec falls into the same bucket 
POST ecommercesite/_search
 {
   "query" : {
     "bool": {
       "should": [
         {
           "range": {
             "release_date": {
               "gte": "now/y",
               "boost": 1
             }
           }
         },
         {
           "range": {
             "release_date": {
               "gte": "now-1y/y",
               "lte": "now/y", 
               "boost": "0.5"
             }
           }
         }
       ]
     }
   }
 }

POST ecommercesite/_search
 {
   "query": {
     "function_score": {
       "functions": [
         {
           "gauss": {
             "release_date": {
               "origin": "now",
               "scale": "180d"
             }
           }
         }
       ]
     }
   }
 } 

POST ecommercesite/_search
{
  "query": {
    "function_score": {
      "functions": [
        {
          "gauss": {
            "unit_price": {
              "origin": "50",
              "scale": "15"
            }
          }
        },
        {
          "gauss": {
            "release_date": {
              "origin": "now",
              "scale": "180d"
            }
          }
        }
      ]
    }
  }
}


POST ecommercesite/_search
 {
   "query": {
     "bool": {
       "must": [
         {
           "term": {
             "product_name": "jacket"
           }
         },
         {
           "constant_score": {
             "filter": {
               "range": {
                 "unit_price": {
                   "lt": "100"
                 }
               }
             }
           }
         }
       ]
     }
   }
 }