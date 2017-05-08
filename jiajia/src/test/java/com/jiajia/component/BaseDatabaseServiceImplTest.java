package com.jiajia.component;


import java.util.HashMap;
import java.util.Map;

import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;
import com.jiajia.inter.BaseDatabaseService;

public class BaseDatabaseServiceImplTest  {
	@Test
	public void test() {
		ApplicationContext ac = new FileSystemXmlApplicationContext("classpath:jdbc.xml");
		BaseDatabaseService baseDatabaseService=(BaseDatabaseService) ac.getBean("dbService");
		Map<String,Object> map =new HashMap<String, Object>();
		map.put("id", "1");
		baseDatabaseService.queryForMap( map );
	}
	@Test
	public void test2() {
		ApplicationContext ac = new FileSystemXmlApplicationContext("classpath:jdbc.xml");
		BaseDatabaseServiceImpl baseDatabaseServiceImpl=(BaseDatabaseServiceImpl) ac.getBean("dbService");
		Map<String,Object> map =new HashMap<String, Object>();
		map.put("id", "1");
		baseDatabaseServiceImpl.queryForMap( map );
	}

}
