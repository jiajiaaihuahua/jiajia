package com.jiajia.inter;

import java.util.List;
import java.util.Map;
/*
 * ���ݿ����������
 * @auth liusijia
 * 
 */
public interface BaseDatabaseService {
	public void queryForMap(  Map<String,Object> map  );
	public void updateAdmin( Object object );
	
	/**
	 * 
	 * ��ѯlist����
	 */
	public List queryForList();
	/**
	 * 
	 * ��������
	 */
	public void insertObject(Object object);
	/**
	 * 
	 * �޸Ķ���
	 */
	public void updateObject(Object object);
	/**
	 * 
	 * ɾ������
	 * ��������idɾ��
	 */
	public void deleteObect(String id);
}
