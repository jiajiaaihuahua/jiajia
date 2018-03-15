/********************************************
 * Copyright (c) 2017, www.qingshixun.com
 *
 * All rights reserved
 *
*********************************************/
package online.shixun.demo.robot.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;

import online.shixun.demo.robot.common.HttpRequest;
import online.shixun.demo.robot.dao.MessageDao;
import online.shixun.demo.robot.dao.UserDao;
import online.shixun.demo.robot.dto.Message;
import online.shixun.demo.robot.dto.TulingConfig;
import online.shixun.demo.robot.dto.User;

/**
 * <p>发送和接收用户消息</p>
 *
 */
@Service
public class UserMessageService {
	
	private final int PAGE_SIZE = 1;
	
	@Autowired
	private TulingConfig tulingConfig;
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private MessageDao messageDao;
	
	public String sendUserMessage(String content,Long userid){
		String generateContent = generate(content, userid);
		String result = HttpRequest.sendPost(tulingConfig.getUrl(),generateContent );
		String text = "";
		JSONObject object = JSONObject.parseObject(result);
		// 如果是文本，取出values中的text
		text = object.getJSONArray("results").getJSONObject(0).getJSONObject("values").getString("text");
		Message message = new Message();
		Long id = Long.parseLong(new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()).substring(11, 14)+new Double(Math.floor(Math.random()*100)).longValue());
		message.setId(id);
		message.setSendContent(content);
		message.setReplyContent(text);
		User u = new User();
		u.setId(userid);
		message.setUser(u);
		message.setCreateTime(new Date());
		messageDao.saveMessage(message);
		return text;
	}
	
	/**
	 * <p>得到所有用户列表</p>
	 */
	public List<User> getUser(){
		return userDao.getUser();
	}
	
	/**
	 * <p>根据id获取用户数据</p>
	 * @param id
	 * @return
	 */
	public User getUserById(Long id){
		return userDao.getUserById(id);
	}
	
	/**
	 * <p>根据用户名称获取类似的用户</p>
	 * @param name
	 * @return
	 */
	public List<User> getUserByName(String name){
		return userDao.getUserByName(name);
	}
	
	private String generate(String content,Long userid){
			//	userInfo
			JSONObject userInfo = new JSONObject();
			userInfo.put("apiKey", "da772444a62343e1ad1f2df4f6255b93");
			userInfo.put("userId", userid);
			
			//	inputText 输入的文本
			JSONObject inputText = new JSONObject();
			inputText.put("text", content);
			
			//	location 
			JSONObject location = new JSONObject();
			location.put("city", "湖北");
			location.put("province", "武汉");
			location.put("street", "光谷三路");
			
			//	selfInfo 
			JSONObject selfInfo = new JSONObject();
			selfInfo.put("location", location);
			
			//	perception 
			JSONObject perception = new JSONObject();
			perception.put("selfInfo", selfInfo);
			perception.put("inputText", inputText);
			
			JSONObject json = new JSONObject();
			json.put("reqType", 0);
			json.put("perception", perception);
			json.put("userInfo",userInfo);
			return json.toJSONString();
	}
	
	/**
	 * 
	 * @param userid 用户id
	 * @param pageNo 第几页
	 * @param pageNum 每页多少条
	 * @return
	 */
	public List<Message> getMessage(Long userid, int pageNo){
		int start = countStartRowNumber(pageNo,PAGE_SIZE);
		return messageDao.getMessage(userid, start, PAGE_SIZE);
	}
	
    public int countStartRowNumber(int pageNo, int pageSize) {
        return pageSize * (pageNo - 1);
    }

    protected int countTotalPage(int totalCount, int pageSize) {
        int count = totalCount / pageSize;
        if (totalCount % pageSize > 0) {
            count++;
        }
        return count;
    }
}
