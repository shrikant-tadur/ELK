#Sample Data

PUT ecommercesite1/product/1
{ "product_name": "Apple iPhone 7"}

PUT ecommercesite1/product/2
{ "product_name": "Apple iPhone Lightning Cable" }

PUT ecommercesite1/product/3
{ "product_name": "Apple iPhone 6"}

PUT ecommercesite1/product/4
{ "product_name": "Samsung Galaxy S7" }

PUT ecommercesite1/product/5
{ "product_name": "Samsung Galaxy S6" }
As we progress through 



#Term Suggester 
POST ecommercesite1/_search 
{
   "suggest" : {
     "term_suggester" : {
       "text" : "samsund",
       "term" : {
         "field" : "product_name"
       }
     }
   }
 }

#Term Suggester 
POST ecommercesite1/_search
 {
   "suggest" : {
     "term_suggester" : {
       "text" : "samsundcd",
       "term" : {
         "field" : "product_name"
       }
     }
   }
 }

#Term Suggester with match query
POST ecommercesite1/_search 
{
   "query" : {
     "match" : {
       "product_name" : "iphone"
     }
   },
   "suggest" : {
     "term_suggester" : {
       "text" : "samsundd",
       "term" : {
         "field" : "product_name"
       }
     }
   }
 }

#More than one suggester
POST ecommercesite1/_search
 {
   "suggest" : {
     "suggester1" : {
       "text" : "samsund",
       "term" : {
         "field" : "_all"
       }
     },
     "suggester2" : {
       "text" : "iphon",
       "term" : {
         "field" : "_all"
       }
     }
   }
 }

#Phrase Suggester 
POST ecommercesite1/_search 
 {
   "suggest" : {
     "term_suggester" : {
       "text" : "samsund galaxy",
       "phrase" : {
         "field" : "title"
       }
     }
   }
 }

 

#Implementing Auto-Complete Feature

#Delete existing index
DELETE ecommercesite1

#Mapping for Completion 
PUT ecommercesite1
 {
   "settings": {},
   "mappings": {
     "product": {
       "properties": {
         "product_name": {
           "type": "text",
           "copy_to": "product_suggest"
         },
         "product_suggest": {
           "type": "completion"
         }
       }
     }
   }
 }

#Sample data
POST ecommercesite1/product/_bulk 
{ "index": {}} 
{ "product_name": "Apple iPhone 7"} 
{ "index": {}}
{ "product_name": "Apple iPhone Lightning Cable" }
{ "index": {}} 
{ "product_name": "Apple iPhone 6"} 
{ "index": {}} 
{ "product_name": "Samsung Galaxy S7" }
{ "index": {}} 
{ "product_name": "Samsung Galaxy S6" }
Now that we have set mapping and indexed 

#Completion
POST ecommercesite1/_search
 {
   "suggest": {
     "my_suggestion": {
       "prefix": "i",
       "completion": {
         "field": "product_suggest"
       }
     }
   }
 }
 
 POST ecommercesite1/_search
 {
   "suggest": {
     "my_suggestion": {
       "prefix": "a", 
       "completion": {
         "field": "product_suggest"
       }
     }
   }
 }

