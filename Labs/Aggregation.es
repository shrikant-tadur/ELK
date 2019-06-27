POST /cars/demo/_bulk
{ "index": {}}
{ "price" : 10000, "color" : "red", "make" : "honda", "sold" : "2014-10-28" }
{ "index": {}}
{ "price" : 20000, "color" : "red", "make" : "honda", "sold" : "2014-11-05" }
{ "index": {}}
{ "price" : 30000, "color" : "green", "make" : "ford", "sold" : "2014-05-18" }
{ "index": {}}
{ "price" : 15000, "color" : "blue", "make" : "toyota", "sold" : "2014-07-02" }
{ "index": {}}
{ "price" : 12000, "color" : "green", "make" : "toyota", "sold" : "2014-08-19" }
{ "index": {}}
{ "price" : 20000, "color" : "red", "make" : "honda", "sold" : "2014-11-05" }
{ "index": {}}
{ "price" : 80000, "color" : "red", "make" : "bmw", "sold" : "2014-01-01" }
{ "index": {}}
{ "price" : 25000, "color" : "blue", "make" : "ford", "sold" : "2014-02-12" }

/// size is 0 - not to show original documens along with aggregation
/// if we remove size, we can see the documents as well along with the aggregation
GET cars/_search
{
  "aggs": {
    "makeAgg": {
      "terms": {
        "field": "make.keyword"
       
      }
    }
  },
  "size": 0
}

GET cars/_search
{
  "query": {
    "range": {
      "price": {
        "gte": 10000,
        "lte": 20000
      }
    }
  }, 
  "aggs": {
    "makeAgg": {
      "terms": {
        "field": "make.keyword"
       
      }
    }
  },
  "size": 0
}
GET cars/_search
{
  "aggs": {
    "makeAgg": {
      "terms": {
        "field": "make.keyword"
       
      },
      "aggs": {
        "colourAgg": {
          "terms": {
            "field": "color.keyword"
          }
        }
      }
    }
    
  },
  "size": 0
}

GET cars/_search
{
  "aggs": {
    "makeAgg": {
      "terms": {
        "field": "make.keyword"
       
      },
      "aggs": {
        "colourAgg": {
          "terms": {
            "field": "color.keyword"
          },
          "aggs": {
            "priceAGG": {
              "extended_stats": {
                "field": "price"
              }
            }
          }
        }
      }
    }
    
  },
  "size": 0
}


GET cars/_search 
{
  "aggs": {
    "NAME": {
      "range": {
        "field": "price",
        "ranges": [
                    { "to" : 15000 },
                    { "from" : 15000, "to" : 25000 },
                    { "from" : 25000 }
                ]
      }
    }
  }
}

GET cars/_search
{
  "aggs": {
    "NAME": {
      "date_histogram": {
        "field": "sold",
        "interval": "month"
      }
    }
  }
}

GET cars/_search 
{
  "aggs": {
    "NAME": {
      "date_range": {
        "field": "sold",
        "ranges": [
          {
            "from": "now-10d/d",
            "to": "now"
          }
        ]
      }
    }
  }
}