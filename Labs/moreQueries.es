delete /bookdb_index
PUT /bookdb_index
    { "settings": { "number_of_shards": 1 }}

#run query in kibana dev tools
POST /bookdb_index/book/_bulk
{ "index": { "_id": 1 }}
{ "title": "Elasticsearch: The Definitive Guide", "authors": ["clinton gormley", "zachary tong"], "summary" : "A distibuted real-time search and analytics engine", "publish_date" : "2015-02-07", "num_reviews": 20, "publisher": "oreilly" }
{ "index": { "_id": 2 }}
{ "title": "Taming Text: How to Find, Organize, and Manipulate It", "authors": ["grant ingersoll", "thomas morton", "drew farris"], "summary" : "organize text using approaches such as full-text search, proper name recognition, clustering, tagging, information extraction, and summarization", "publish_date" : "2013-01-24", "num_reviews": 12, "publisher": "manning" }
{ "index": { "_id": 3 }}
{ "title": "Elasticsearch in Action", "authors": ["radu gheorge", "matthew lee hinman", "roy russo"], "summary" : "build scalable search applications using Elasticsearch without having to do complex low-level programming or understand advanced data science algorithms", "publish_date" : "2015-12-03", "num_reviews": 18, "publisher": "manning" }
{ "index": { "_id": 4 }}
{ "title": "Solr in Action", "authors": ["trey grainger", "timothy potter"], "summary" : "Comprehensive guide to implementing a scalable search engine using Apache Solr", "publish_date" : "2014-04-05", "num_reviews": 23, "publisher": "manning" }

POST bookdb_index/book/5 
{
    "id":5,
    "authors" : ["clinton gormley", "zachary tong"],
    "title": "Elastic Complete reference action",
    "summary" : "Comprehensive guide to implementing a scalable search engine using Apache Solr", 
    "publish_date" : "2014-04-05", "num_reviews": 23, "publisher": "manning"
}

POST /bookdb_index/book/_search
{
    "query": {
        "match" : {
            "title" : "in action"
        }
    },
    "size": 10,
    "from": 0,
    "_source": [ "title", "summary", "publish_date" ],
    "highlight": {
        "fields" : {
            "title" : {}
        }
    }
}

POST /bookdb_index/book/_search?explain
{
    "query": {
        "match_phrase" : {
            "title" : "in action"
        }
    },
    "size": 10,
    "from": 0,
    "_source": [ "title", "summary", "publish_date" ],
    "highlight": {
        "fields" : {
            "title" : {}
        }
    }
}

POST /bookdb_index/book/_search?explain
{
    "query": {
        "match_phrase" : {
            "title" : "in action"
        }
    },
    "size": 10,
    "from": 0,
    "_source": [ "title", "summary", "publish_date" ],
    "highlight": {
        "fields" : {
            "title" : {}
        }
    }
}

POST /bookdb_index/book/_search
{
    "query": {
        "multi_match" : {
            "query" : "guide",
            "fields" : ["title", "summary"]
        }
    }
}

# to search for a book with the word “Elasticsearch” OR “Solr” in the title, 
#AND is authored by “clinton gormley” but NOT authored by “radu gheorge”:

POST /bookdb_index/book/_search
{
  "query": {
    "bool": {
      "must": {
        "bool" : { 
          "should": [
            { "match": { "title": "Elasticsearch" }},
            { "match": { "title": "Solr" }} 
          ],
          "must": { "match": { "authors": "clinton gormely" }} 
        }
      },
      "must_not": { "match": {"authors": "radu gheorge" }}
    }
  }
}

# to demonstrate match behave the same way with bool clauses too ...
#insert the following data and running the above query will also bring
# id 7 as match query will go thorough analysis phase
POST bookdb_index/book/7 
{
    "id":7,
    "authors" : ["clinton", "zachary tong"],
    "title": "Elastic Complete reference action clinton",
    "summary" : "Comprehensive guide to implementing a scalable search engine using Apache Solr", 
    "publish_date" : "2014-04-05", "num_reviews": 23, "publisher": "manning"
}


POST bookdb_index/book/6 
{
    "id":6,
    "authors" : ["radu", "zachary tong"],
    "title": "Elastic Complete reference action not radu",
    "summary" : "Comprehensive guide to implementing a scalable search engine using Apache Solr", 
    "publish_date" : "2014-04-05", "num_reviews": 23, "publisher": "manning"
}

get /bookdb_index/_search

POST /bookdb_index/book/_search
{
  "query": {
    "bool": {
      "must": {
        "bool" : { 
          "should": [
            { "match": { "title": "Elasticsearch" }},
            { "match": { "title": "Solr" }} 
          ],
          "must": { "match": { "authors": "clinton gormely" }} 
        }
      },
      "must_not": { "match": {"authors": "radu gheorge" }}
    }
  }
}



POST bookdb_index/book/8 
{
    "id":8,
    "authors" : ["clinton", "zachary tong"],
    "title": "action clinton",
    "summary" : "Comprehensive guide to implementing a scalable search engine using Apache Solr", 
    "publish_date" : "2014-04-05", "num_reviews": 23, "publisher": "manning"
}

# returns 1,4
POST /bookdb_index/book/_search
{
  "query": {
    "bool": {
      "must": {
        "bool" : { 
          "should": [
            { "match": { "title": "Elasticsearch" }},
            { "match": { "title": "Solr" }} 
          ]
          
        }
      },
      "must_not": { "match": {"authors": "radu gheorge" }}
    }
  }
}

#let us see why id 2 / 3 / 5 /6/7 is not match for the above query
# id 5 contains title elastic and not elasticsearch



POST /bookdb_index/book/5/_explain
{
  "query": {
    "bool": {
      "must": {
        "bool" : { 
          "should": [
            { "match": { "title": "Elasticsearch" }},
            { "match": { "title": "Solr" }} 
          ]
          
        }
      },
      "must_not": { "match": {"authors": "radu gheorge" }}
    }
  }
}


#to also match elastic (id #5) for the above query


POST /bookdb_index/book/5/_explain
{
  "query": {
    "bool": {
      "must": {
        "bool" : { 
          "should": [
            { 
                "match_phrase_prefix": {
                    "title":{
                        "query" : "Elastic",
                        "max_expansions" : 5
                    } 
                 
                 }
            },
            { "match": { "title": "Solr" }} 
          ]
          
        }
      },
      "must_not": { "match": {"authors": "radu gheorge" }}
    }
  }
}

// returns 1,4,5,7
POST /bookdb_index/book/_search
{
  "query": {
    "bool": {
      "must": {
        "bool" : { 
          "should": [
            { 
                "match_phrase_prefix": {
                    "title":{
                        "query" : "Elastic",
                        "max_expansions" : 5
                    } 
                 
                 }
            },
            { "match": { "title": "Solr" }} 
          ]
          
        }
      },
      "must_not": { "match": {"authors": "radu gheorge" }}
    }
  }
}



POST /bookdb_index/book/_search
{
    "query": {
        "bool": {
            "must" : {
                "multi_match": {
                    "query": "elasticsearch",
                    "fields": ["title","summary"]
                }
            },
            "filter": {
                "range" : {
                    "num_reviews": {
                        "gte": 20
                    }
                }
            }
        }
    },
    "_source" : ["title","summary","publisher", "num_reviews"]
}


POST /bookdb_index/book/_search
{
    "query": {
        "bool": {
            "must" : {
                "multi_match": {
                    "query": "elasticsearch",
                    "fields": ["title","summary"]
                }
            },
            "filter": {
                "bool": {
                    "must": {
                        "range" : { "num_reviews": { "gte": 20 } }
                    },
                    "must_not": {
                        "range" : { "publish_date": { "lte": "2014-12-31" } }
                    },
                    "should": {
                        "term": { "publisher": "oreilly" }
                    }
                }
            }
        }
    },
    "_source" : ["title","summary","publisher", "num_reviews", "publish_date"]
}