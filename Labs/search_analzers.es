


PUT /blog
{

  "mappings": {

    "article": {

      "properties": {

        

        "content": {

          "type": "text", "analyzer": "whitespace", "search_analyzer": "standard"

        }

      }

    }

  }

}


POST /blog/article
{

  

  "content": "Hi guys. My boss's job at the office was eliminated due to budget cuts."

}



get /blog/_mapping
// no results
GET /blog/_search
{

 "query": {

   "match": {

     "content": "guys"

   }

 } 

}




//the whitespace analyzer broke the space and did not remove the
//punctuation
get /blog/_analyze
{
  "field": "content", 
  "text": "Hi guys."
}



DELETE /blog

PUT /blog
{

  "mappings": {

    "article": {

      "properties": {

       

        "content": {

          "type": "text"

        }

      }

    }

  }

}

POST /blog/article
{

  

  "content": "Hi guys. My boss's job at the office was eliminated due to budget cuts."

}



get /blog/_mapping

GET /blog/_search
{
 "query": {
   "match": {
     "content": "guys"
   }
 } 