package com.jiajia.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jiajia.inter.BaseDatabaseService;

@org.springframework.stereotype.Controller
@RequestMapping("/")
public class handleRequest{
	@RequestMapping("/test")
	public String hello(){        
		ApplicationContext ac = new FileSystemXmlApplicationContext("classpath:jdbc.xml");
		BaseDatabaseService baseDatabaseService=(BaseDatabaseService) ac.getBean("dbService");
		Map<String,Object> map =new HashMap<String, Object>();
		map.put("id", "1");
		baseDatabaseService.queryForMap(map);
        return "hello";
    }

}
