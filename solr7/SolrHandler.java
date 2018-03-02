package com.innovaee.hts.web.module.search.service;

import java.io.IOException;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrQuery.ORDER;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.client.solrj.response.UpdateResponse;
import org.apache.solr.common.SolrDocument;
import org.apache.solr.common.SolrDocumentList;
import org.apache.solr.common.SolrInputDocument;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

public class SolrHandler {
	protected Logger logger = LoggerFactory.getLogger(this.getClass());
	protected final String URL = "http://127.0.0.1/solr7";
	/**
	 * 查询条件
	 * 
	 * @param collectionName
	 *            设置查询的collection名称 例如 {"collectionName":"mycollection"}
	 * @param start
	 *            分页查询{"start" : "0"},{"rows","10"}表示从零行后的十行数据
	 * @param rows
	 * 			     每页的条数
	 * @param fl
	 *            只查询某些字段，{"fl","id,name"} 表示只查询id,name
	 * @param q
	 * 			  查询条件  {"q":"name:java简介"}
	 * @param hl 高亮 true or false
	 * 
	 * @param hl_field 高亮字段 逗号分割
	 * 
	 * @param hl_field_pre 高亮字段前缀 
	 * 
	 * @param hl_field_post 高亮字段后缀 
	 * 
	 * @param field 设置显示的Field的域集合，逗号分割 {"field":"id,name,descripation"}
	 * 
	 * @param sort_field 设置排序字段  for example "id"
	 * 
	 * @param sort asc or desc 正序或者是逆序
	 * 			 
	 * @return String
	 * 
	 */
	public String find(String param) {
		// 返回值
		JSONArray jsonArray = new JSONArray();
		// 消息返回对象
		JSONObject returnMessage = new JSONObject();
		
		//获取查询参数
		JSONObject json = JSONObject.parseObject(param);
		String collectionName = json.getString("collectionName");	//获得参数集合名称
		String q = json.getString("q");								//获得查询参数
		
		String hl = json.getString("hl");							//获得高亮信息 true or false
		String hl_field = json.getString("hl_field");				//获得高亮的字段
		String hl_field_pre = json.getString("hl_field_pre");		//获得高亮字段前缀
		String hl_field_post = json.getString("hl_field_post");		//获得高亮的后缀
		
		String start = json.getString("start");						//获取分页的起点
		String rows = json.getString("rows");						//获取每页的条数
		
		String field = json.getString("field");						//获取的域集合
		
		String sort_field = json.getString("sort_field");			//获取排序字段
		String sort = json.getString("sort");						//asc 或者desc 

		//判断查询core是否为null
		if (collectionName == null || collectionName.isEmpty()) {
			returnMessage.put("message", "collectionName cannot be null!");
			jsonArray.add(returnMessage);
			return jsonArray.toJSONString();
		}

		// 获取solr客户端
		final SolrClient client = getSolrClient(URL);

		//创建查询参数
		SolrQuery solrQuery = new SolrQuery();
		//设置查询条件
		solrQuery.setQuery(q);
		//设置高亮信息
		if("true".equals(hl)){
			solrQuery.setHighlight(true);
			if(hl_field!=null){
				solrQuery.addHighlightField(hl_field);
			}
			if(hl_field_pre!=null&&hl_field_post!=null){
				solrQuery.setHighlightSimplePre(hl_field_pre);
				solrQuery.setHighlightSimplePost(hl_field_post);
			}
		}
		//设置分页信息
		if( start != null && rows != null ){
			solrQuery.setStart(Integer.parseInt(start));
			solrQuery.setRows(Integer.parseInt(rows));
		}
		//设置获取的域集合
		if(field != null){
			solrQuery.setFields(field);
		}
		//排序
		if(sort != null && sort_field != null){
			if(sort.equals("asc"))
				solrQuery.setSort(sort_field, ORDER.asc);
			else
				solrQuery.setSort(sort_field, ORDER.desc);
		}
		
		//得到solr查询client
		try {
			QueryResponse response = client.query(collectionName, solrQuery);
			if("true".equals(hl)){
				//获取高亮部分
				Map<String, Map<String, List<String>>> map = response.getHighlighting();
				logger.debug(map.toString());
			}
			SolrDocumentList list = response.getResults();
			// 遍历结果集，转成jsonArray
			for (int i =0;i<list.size();i++) {
				SolrDocument solrDocument=list.get(i);
				JSONObject jsonObject = new JSONObject();
				Collection<String> collection = solrDocument.getFieldNames();
				for (String key : collection) {
					jsonObject.put(key, solrDocument.getFieldValue(key));
				}
				jsonArray.add(jsonObject);

			}
		} catch (SolrServerException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return jsonArray.toJSONString();
	}

	/**
	 * 新增集合数据方法
	 * 
	 * @param url
	 *            请先设置请求的solr的url 例如 ：
	 *            {"url":"http://111.230.230.228:8983/solr"}
	 * @param collectionName
	 *            设置查询的collection名称 例如 {"collectionName":"mycollection"}
	 * @param param
	 *            参数结构 {"url":"www.qingshixun.online","collectionName":
	 *            "mycollection", data : [{"":""},{"":""}]}
	 */
	public String add(String param) {
		// 返回值
		JSONArray jsonArray = new JSONArray();
		// 消息返回对象
		JSONObject returnMessage = new JSONObject();
		//将参数转换成json对象
		JSONObject json = JSONObject.parseObject(param);
		//得到collection中的数据对象
		JSONArray jsonData = json.getJSONArray("data");
		String url = json.getString("url");
		String collectionName = json.getString("collectionName");
		if (url == null || url.isEmpty()) {
			returnMessage.put("message", "url cannot be null!");
			jsonArray.add(returnMessage);
			return jsonArray.toJSONString();
		}
		if (collectionName == null || collectionName.isEmpty()) {
			returnMessage.put("message", "collectionName cannot be null!");
			jsonArray.add(returnMessage);
			return jsonArray.toJSONString();
		}
		// 获取solr客户端
		final SolrClient client = getSolrClient(URL);
		//循环获取到的文档数据
		for(int i=0;i<jsonData.size();i++){
			SolrInputDocument doc = new SolrInputDocument();
			Set<String> set = jsonData.getJSONObject(i).keySet();
			for( String keyset : set){
				doc.addField(keyset,jsonData.getJSONObject(i).get(keyset));
			}
			
			try {
				client.add(collectionName, doc);
				client.commit(collectionName);
			} catch (SolrServerException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		returnMessage.put("message", "success");
		jsonArray.add(returnMessage);
		return jsonArray.toJSONString();
	}
	
	/**
	 * 按照查询条件删除
	 * @param param 查询条件
	 * @throws IOException 
	 * @throws SolrServerException 
	 */
	public String delete(String collectionName,String param) throws SolrServerException, IOException{
		final SolrClient client = getSolrClient(URL);
		UpdateResponse response = client.deleteByQuery(collectionName,param);
		client.commit(collectionName);
		return response.toString();
	}
	/**
	 * 获取httpSolrClient
	 * 
	 * @param url
	 * @return
	 */
	public HttpSolrClient getSolrClient(String url) {
		HttpSolrClient httpSolrClient = new HttpSolrClient.Builder(url).build();
		return httpSolrClient;
	}
}
