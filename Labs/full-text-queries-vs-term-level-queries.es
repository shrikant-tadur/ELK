PUT my_index
{
  "mappings": {
    "my_type": {
      "properties": {
        //The full_text field is of type text and will be analyzed.
        "full_text": {
          "type":  "text" 
        },
        //The exact_value field is of type keyword and will NOT be analyzed.
        "exact_value": {
          "type":  "keyword" 
        }
      }
    }
  }
}

PUT my_index/my_type/1
{
  //The full_text inverted index will contain the terms: [quick, foxes].
  "full_text":   "Quick Foxes!",
  //The exact_value inverted index will contain the exact term: [Quick Foxes!]. 
  "exact_value": "Quick Foxes!"  
}

post my_index/_analyze 
{
  "text" : "Quick Foxes!"
}

// This query matches because the exact_value field contains the exact term Quick Foxes!.
GET my_index/my_type/_search
{
  "query": {
    "term": {
      "exact_value": "Quick Foxes!" 
    }
  }
}
//This query does not match, because the full_text field only contains the terms quick and foxes. It does not contain the exact term Quick Foxes!.
GET my_index/my_type/_search
{
  "query": {
    "term": {
      "full_text": "Quick Foxes!" 
    }
  }
}
//A term query for the term foxes matches the full_text field.
GET my_index/my_type/_search
{
  "query": {
    "term": {
      "full_text": "foxes" 
    }
  }
}
//This match query on the full_text field first analyzes the query string, then looks for documents containing quick or foxes or both.
GET my_index/my_type/_search
{
  "query": {
    "match": {
      "full_text": "Quick Foxes!" 
    }
  }


GET my_index/my_type/_search
{
  "query": {
    "match": {
      "exact_value": "Quick Foxes!" 
    }
  }
}