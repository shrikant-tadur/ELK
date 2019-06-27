PUT /sports/
{

   "mappings": {

      "athlete": {

         "properties": {

            "birthdate": {

               "type": "date",

               "format": "dateOptionalTime"

            },

            "location": {

               "type": "geo_point"

            },

            "name": {

               "type": "keyword"

            },

            "rating": {

               "type": "integer"

            },

            "sport": {

               "type": "keyword"

            },

             "age": {

                 "type":"integer"

             },

             "goals": {

                 "type": "integer"

             },

             "role": {

                 "type":"keyword"

             },

             "score_weight": {

                 "type": "float"

             }

         }

      }

   }

}

POST /sports/_bulk
{"index":{"_index":"sports","_type":"athlete"}}
{"name":"Michael", "birthdate":"1989-10-1", "sport":"Football", "rating": ["5", "4"],  "location":"46.22,-68.45", "age":"23","goals": "43","score_weight":"3","role":"midfielder"}
{"index":{"_index":"sports","_type":"athlete"}}
{"name":"Bob", "birthdate":"1989-11-2", "sport":"Football", "rating": ["3", "4"],  "location":"45.21,-68.35", "age":"33", "goals": "54","score_weight":"2", "role":"forward"}
{"index":{"_index":"sports","_type":"athlete"}}
{"name":"Jim", "birthdate":"1988-10-3", "sport":"Football", "rating": ["3", "2"],  "location":"45.16,-63.58", "age":"28", "goals": "73", "score_weight":"2", "role":"forward" }
{"index":{"_index":"sports","_type":"athlete"}}
{"name":"Joe", "birthdate":"1992-5-20", "sport":"Basketball", "rating": ["4", "3"],  "location":"45.22,-68.53", "age":"18", "goals": "848", "score_weight":"3", "role":"midfielder"}
{"index":{"_index":"sports","_type":"athlete"}}
{"name":"Tim", "birthdate":"1992-2-28", "sport":"Basketball", "rating": ["3", "3"],  "location":"46.22,-68.85", "age":"28","goals": "942", "score_weight":"2","role":"forward"}
{"index":{"_index":"sports","_type":"athlete"}}
{"name":"Alfred", "birthdate":"1990-9-9", "sport":"Football", "rating": ["2", "2"],  "location":"45.12,-68.35", "age":"25", "goals": "53", "score_weight":"4", "role":"defender"}
{"index":{"_index":"sports","_type":"athlete"}}
{"name":"Jeff", "birthdate":"1990-4-1", "sport":"Hockey", "rating": ["2", "3"], "location":"46.12,-68.55", "age":"26","goals": "93","score_weight":"3","role":"midfielder"}
{"index":{"_index":"sports","_type":"athlete"}}
{"name":"Will", "birthdate":"1988-3-1", "sport":"Hockey", "rating": ["4", "4"], "location":"46.25,-84.25", "age":"27", "goals": "124", "score_weight":"2", "role":"forward" }
{"index":{"_index":"sports","_type":"athlete"}}
{"name":"Mick", "birthdate":"1989-10-1", "sport":"Football", "rating": ["3", "4"],  "location":"46.22,-68.45", "age":"35","goals": "56","score_weight":"3", "role":"midfielder"}
{"index":{"_index":"sports","_type":"athlete"}}
{"name":"Pong", "birthdate":"1989-11-2", "sport":"Basketball", "rating": ["1", "3"],  "location":"45.21,-68.35", "age":"34","goals": "1483","score_weight":"2", "role":"forward"}
{"index":{"_index":"sports","_type":"athlete"}}
{"name":"Ray", "birthdate":"1988-10-3", "sport":"Football", "rating": ["2", "2"],  "location":"45.16,-63.58", "age":"31","goals": "84", "score_weight":"3", "role":"midfielder" }
{"index":{"_index":"sports","_type":"athlete"}}
{"name":"Ping", "birthdate":"1992-5-20", "sport":"Basketball", "rating": ["4", "3"],  "location":"45.22,-68.53", "age":"27","goals": "1328", "score_weight":"2", "role":"forward"}
{"index":{"_index":"sports","_type":"athlete"}}
{"name":"Duke", "birthdate":"1992-2-28", "sport":"Hockey", "rating": ["5", "2"],  "location":"46.22,-68.85", "age":"41","goals": "218", "score_weight":"2", "role":"forward"}
{"index":{"_index":"sports","_type":"athlete"}}
{"name":"Hal", "birthdate":"1990-9-9", "sport":"Hockey", "rating": ["4", "2"],  "location":"45.12,-68.35", "age":"18","goals": "148", "score_weight":"3", "role":"midfielder"}
{"index":{"_index":"sports","_type":"athlete"}}
{"name":"Charge", "birthdate":"1990-4-1", "sport":"Football", "rating": ["3", "2"], "location":"44.19,-82.55", "age":"19","goals": "34", "score_weight":"4", "role":"defender"}
{"index":{"_index":"sports","_type":"athlete"}}
{"name":"Barry", "birthdate":"1988-3-1", "sport":"Football", "rating": ["5", "2"], "location":"36.45,-79.15", "age":"20", "goals": "48", "score_weight":"4", "role":"defender" }
{"index":{"_index":"sports","_type":"athlete"}}
{"name":"Bank", "birthdate":"1988-3-1", "sport":"Handball", "rating": ["6", "4"], "location":"46.25,-54.53", "age":"25", "goals": "150", "score_weight":"4", "role":"defender" }
{"index":{"_index":"sports","_type":"athlete"}}
{"name":"Bingo", "birthdate":"1988-3-1", "sport":"Handball", "rating": ["10", "7"], "location":"46.25,-68.55", "age":"29", "goals": "143", "score_weight":"3", "role":"midfielder" }
{"index":{"_index":"sports","_type":"athlete"}}
{"name":"James", "birthdate":"1988-3-1", "sport":"Basketball", "rating": ["10", "8"], "location":"41.25,-69.55", "age":"36", "goals": "1284", "score_weight":"2", "role":"forward" }
{"index":{"_index":"sports","_type":"athlete"}}
{"name":"Wayne", "birthdate":"1988-3-1", "sport":"Hockey", "rating": ["10", "10"], "location":"46.21,-68.55", "age":"25", "goals": "113", "score_weight":"3", "role":"midfielder" }
{"index":{"_index":"sports","_type":"athlete"}}
{"name":"Brady", "birthdate":"1988-3-1", "sport":"Handball", "rating": ["10", "10"], "location":"63.24,-84.55", "age":"29", "goals": "443", "score_weight":"2", "role":"forward" }
{"index":{"_index":"sports","_type":"athlete"}}
{"name":"Lewis", "birthdate":"1988-3-1", "sport":"Football", "rating": ["10", "10"], "location":"56.25,-74.55", "age":"24", "goals": "49", "score_weight":"3", "role":"midfielder" }











#  single-filter aggregation to find all athletes with the role "defender" and calculate #the average goals for each filtered bucket.

#A single-filter aggregation constructs a single bucket from all documents that match a query or field value specified in the filter definition. A single-filter aggregation is useful when you want to identify a set of documents that match certain criteria.


POST /sports/athlete/_search?size=0&pretty
{

    "aggs" : {

        "defender_filter" : {

            "filter" : { "term": { "role": "defender" } },

            "aggs" : {

                "avg_goals" : { "avg" : { "field" : "goals" } }

            }

        }

    }

}




get sports/athlete/_search


# multi-value aggregation where each bucket corresponds to a specific filter


GET /sports/athlete/_search?size=0&pretty
{

  "aggs" : {

    "athletes" : {

      "filters" : {

        "filters" : {

          "defenders" :   { "term" : { "role" : "defender"   }},

          "forwards" : { "term" : { "role" : "forward" }}

        }

      },

      "aggs" : {

            "avg_goals" : { "avg" : { "field" : "goals" } }

      }

    }

  }
}
  
  
#Terms Aggregation
#A terms aggregation searches for unique values in the specified field of your documents and builds buckets for each unique value found. Unlike the filter(s) aggregation, the task of the terms aggregation is not to limit the results to certain value but to find all unique values for a given field in your documents.


POST /sports/athlete/_search?size=0&pretty
{

    "aggs": {

        "sports":{

            "terms" : { "field" : "sport" },

            "aggs": {

                "avg_scoring":{

                    "avg": {"field":"goals"}

                }

            }

        }

    }

}

#Histogram Aggregation

#The Histogram aggregation allows us to construct buckets based on the specified intervals. The values that fall into each interval will form an interval bucket


POST /sports/athlete/_search?size=0&pretty
{

    "aggs" : {

        "basketball_filter":{

            "filter":{"term":{"sport":"Basketball"}},

            "aggs": {

                "goals_histogram": {

                    "histogram": {

                        "field": "goals",

                        "interval": "200"

                    }

                }

            }

        }

    }

}


# Range Aggregation


#This bucket aggregation makes it easy to construct buckets based on the user-defined #ranges. 


GET /sports/athlete/_search?size=0&pretty
{

    "aggs" : {

        "goal_ranges" : {

            "range" : {

                "field" : "age",

                "ranges" : [

                    { "to" : 20.0 },

                    { "from" : 20.0, "to" : 30.0 },

                    { "from" : 30.0 }

                ]

            }

        }

    }

}



# To make the ranges more human-readable, we can customize the key name 


GET /sports/athlete/_search?size=0&pretty
{

    "aggs" : {

        "goal_ranges" : {

            "range" : {

                "field" : "age",

                "ranges" : [

                    { "key":"start-of-career","to" : 20.0 },

                    { "key":"mid-of-career", "from": 20.0, "to" : 30.0 },

                    { "key":"end-of-cereer","from" : 30.0 }

                ]

            }

        }

    }

}






