package com.jiajia.inter;

import java.util.List;
import java.util.Map;
/*
 * 数据库基础服务类
 * @auth liusijia
 * 
 */
public interface BaseDatabaseService {
	public void queryForMap(  Map<String,Object> map  );
	public void updateAdmin( Object object );
	
	/**
	 * 
	 * 查询list集合
	 */
	public List queryForList();
	/**
	 * 
	 * 新增对象
	 */
	public void insertObject(Object object);
	/**
	 * 
	 * 修改对象
	 */
	public void updateObject(Object object);
	/**
	 * 
	 * 删除对象
	 * 根据主键id删除
	 */
	public void deleteObect(String id);
}
