package org.elasticsearch.elasticsearch;

import java.io.IOException;
import java.net.InetAddress;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.elasticsearch.action.delete.DeleteResponse;
import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.action.search.SearchType;
import org.elasticsearch.client.Client;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.common.settings.Settings;
import org.elasticsearch.common.transport.TransportAddress;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.transport.client.PreBuiltTransportClient;


public class JavaTest {

    public static void main(String args[]) throws IOException {

        // Node node = nodeBuilder().node();
        // Client client = node.client();
        // Settings settings = Settings.settingsBuilder()
        // .put("cluster.name", "elasticsearch").build();
        Settings settings = Settings.builder().put("cluster.name", "elasticsearch").build();
                //.put("xpack.security.user", "elastic:changeme").build();
        TransportClient client = new PreBuiltTransportClient(settings)
       // client.addTransportAddress(new TransportAddress(InetAddress.getByName("localhost"), 9300));
        
        //TransportClient client = new PreBuiltTransportClient(Settings.EMPTY)
        .addTransportAddress(new TransportAddress(InetAddress.getByName("localhost"), 9300));
        //.addTransportAddress(new TransportAddress(InetAddress.getByName("host2"), 9300));
        
       // client.addTransportAddress(new InetSocketTransportAddress(InetAddress.getByName("localhost1"), 9300));

        // TransportClient client = TransportClient.builder().settings(settings).build()
        // .addTransportAddress(new InetSocketTransportAddress(InetAddress.getByName("localhost"), 9300));
        // .addTransportAddress(new InetSocketTransportAddress(InetAddress.getByName("host2"), 9300));

        client.prepareIndex("java-example", "_doc", "1")
                .setSource(putJsonDocument("ElasticSearch: Java",
                        "ElasticSeach provides Java API, thus it executes all operations "
                                + "asynchronously by using client object..",
                        new Date(), new String[] { "elasticsearch" }, "Hüseyin Akdoğan"))
                .execute().actionGet();
        //
        // client.prepareIndex("kodcucom", "article", "2")
        // .setSource(putJsonDocument("Java Web Application and ElasticSearch (Video)",
        // "Today, here I am for exemplifying the usage of ElasticSearch which is an open source, distributed " +
        // "and scalable full text search engine and a data analysis tool in a Java web application.",
        // new Date(),
        // new String[]{"elasticsearch"},
        // "Hüseyin Akdoğan")).execute().actionGet();

       getDocument(client, "java-example", "_doc", "1");

       // updateDocument(client, "java-example", "article", "1", "title", "ElasticSearch: Java API");
        //getDocument(client, "java-example", "_doc", "1");
       // updateDocument(client, "kodcucom", "article", "1", "tags", new String[]{"bigdata"});

        // getDocument(client, "kodcucom", "article", "1");

        //searchDocument(client, "cars", "_doc", "title", "honda is a korean company");

        // deleteDocument(client, "kodcucom", "article", "1");

        client.close();
    }

    public static Map<String, Object> putJsonDocument(String title, String content, Date postDate, String[] tags,
            String author) {

        Map<String, Object> jsonDocument = new HashMap<String, Object>();

        jsonDocument.put("title", title);
        jsonDocument.put("content", content);
        jsonDocument.put("postDate", postDate);
        jsonDocument.put("tags", tags);
        jsonDocument.put("author", author);
        
        Map<String, Object> innerjsonDocument = new HashMap<String, Object>();
        innerjsonDocument.put("no_of_trainig","200");
        
        jsonDocument.put("details",innerjsonDocument);

        return jsonDocument;
    }

    public static void getDocument(Client client, String index, String type, String id) {

        // GetResponse getResponse = client.prepareGet(index, type, id)
        // .execute()
        // .actionGet();

        GetResponse getResponse = client.prepareGet(index, type, id).get();
        Map<String, Object> source = getResponse.getSource();

        System.out.println("------------------------------");
        System.out.println("Index: " + getResponse.getIndex());
        System.out.println("Type: " + getResponse.getType());
        System.out.println("Id: " + getResponse.getId());
        System.out.println("Version: " + getResponse.getVersion());
        System.out.println(source);
        System.out.println("------------------------------");

    }

    public static void updateDocument(Client client, String index, String type, String id, String field,
            String newValue) {

//        Map<String, Object> updateObject = new HashMap<String, Object>();
//        updateObject.put(field, newValue);
//
//         client.prepareUpdate(index, type, id)
//         .setScript(new Script("ctx._source.gender = \"male\""  , ScriptService.ScriptType.INLINE, null, null))
//         //.setScript("ctx._source." + field + "=" + field)
//         .get();

    }

    public static void updateDocument(Client client, String index, String type, String id, String field,
            String[] newValue) {

//        String tags = "";
//        for (String tag : newValue)
//            tags += tag + ", ";
//
//        tags = tags.substring(0, tags.length() - 2);
//
//        Map<String, Object> updateObject = new HashMap<String, Object>();
//        updateObject.put(field, tags);

//         client.prepareUpdate(index, type, id)
//         .setScript("ctx._source." + field + "+=" + field,null)
//         .setScriptParams(updateObject).execute().actionGet();
    }

    public static void searchDocument(Client client, String index, String type, String field, String value) {

        // SearchResponse response = client.prepareSearch(index)
        // .setTypes(type)
        // .setSearchType(SearchType.QUERY_AND_FETCH)
        // .setQuery(fieldQuery(field, value))
        // .setFrom(0).setSize(60).setExplain(true)
        // .execute()
        // .actionGet();

        // SearchHit[] results = response.getHits().getHits();
        //
        // System.out.println("Current results: " + results.length);
        // for (SearchHit hit : results) {
        // System.out.println("------------------------------");
        // Map<String,Object> result = hit.getSource();
        // System.out.println(result);
        // }

        SearchResponse response = client.prepareSearch(index).setTypes(type).setPreference("_replica_first")
                .setSearchType(SearchType.DFS_QUERY_THEN_FETCH)//.setQuery(QueryBuilders.existsQuery("title"))
                .setQuery(QueryBuilders.matchQuery("make", value))
                //.setQuery(QueryBuilders.termQuery("make", value)) // Query
                //.setPostFilter(QueryBuilders.rangeQuery("price").from(20000).to(80000)) // Filter
                .setFrom(0).setSize(60).setExplain(true).execute().actionGet();
        System.out.println("Information on the searchDocument document:" + response.getHits().getTotalHits());
//         System.out.println("Index: " + response.getIndex());
//         System.out.println("Type: " + response.getType());
//         System.out.println("Id: " + response.getId());
//         System.out.println("Version: " + response.getVersion());
        
         SearchHit[] results = response.getHits().getHits();
        
         System.out.println("Current results: " + results.length);
         for (SearchHit hit : results) {
         System.out.println("------------------------------");
         Map<String,Object> result = hit.getSourceAsMap();
         System.out.println(result);
         }

    }

    public static void deleteDocument(Client client, String index, String type, String id) {

        DeleteResponse response = client.prepareDelete(index, type, id).execute().actionGet();
        System.out.println("Information on the deleted document:");
        System.out.println("Index: " + response.getIndex());
        System.out.println("Type: " + response.getType());
        System.out.println("Id: " + response.getId());
        System.out.println("Version: " + response.getVersion());
    }
}