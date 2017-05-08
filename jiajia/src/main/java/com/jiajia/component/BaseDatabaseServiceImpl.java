package com.jiajia.component;

import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcDaoSupport;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

import com.jiajia.inter.BaseDatabaseService;

public class BaseDatabaseServiceImpl extends NamedParameterJdbcDaoSupport  implements BaseDatabaseService{
	protected Logger logger = null;
    
    public Logger getLogger() 
    {
        if (logger == null) this.logger = Logger.getLogger(this.getClass().getName());
        return this.logger;
    }
	public void queryForMap( Map<String,Object> map ) {
		NamedParameterJdbcTemplate namedParameterJdbcTemplate=this.getNamedParameterJdbcTemplate();
		map=namedParameterJdbcTemplate.queryForMap("select * from admin", map);
		System.out.println(map);
	}
	public void updateAdmin(Object object) {
		// TODO Auto-generated method stub
		
	}
	
}
