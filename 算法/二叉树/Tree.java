package com.innovaee.hts.batch.test;

import java.util.ArrayList;
import java.util.List;

public class Tree {
	
	private List<Long> list = new ArrayList<Long>();
	 
    /**
     * <p>userid Tree 节点</p>
     */
    class UserIdTree{
    	long data;
    	UserIdTree parent; // 前驱节点
    	UserIdTree left;   // 后驱左节点
    	UserIdTree right;  // 后驱右节点 
    }
    
    /**
     * <p>初始化T(R)</p>
     * @param root tree的根节点
     */
    private UserIdTree initTree(long root){
    	 // 初始化树
        UserIdTree userIdTree = new UserIdTree();
        userIdTree.data = root;
        userIdTree.parent = null;
        userIdTree.left = null;
        userIdTree.right = null;
        return userIdTree;
    }
    
    /**
     * <p>将list集合加入到树中</p>
     */
    private void addTree(List<Long> list,UserIdTree root){
        
        // 将 DiscussUserIdList 加入到树中
        for( int i = 1 ; i<list.size() ; i++){
		// 设置指针节点为root节点
        	UserIdTree currentNode = root ;
        	while( true ){
        		// 比较当前节点,如果比当前节点小就往左边走
            	if(list.get(i).longValue() < currentNode.data){
            		if(currentNode.left == null){
            			// 新建一个节点
            			UserIdTree newNode = new UserIdTree();
            			newNode.parent = currentNode;
            			newNode.data = list.get(i);
            			newNode.left = null;
            			newNode.right = null;
            			// 设置当前节点的左节点是新建的节点
            			currentNode.left = newNode;
            			break;
            		}else{
            			currentNode = currentNode.left;
            		}
            	}else if(list.get(i).longValue() > currentNode.data){
            		if(currentNode.right == null){
            			// 新建一个节点
            			UserIdTree newNode = new UserIdTree();
            			newNode.parent = currentNode;
            			newNode.data = list.get(i);
            			newNode.left = null;
            			newNode.right = null;
            			// 设置当前节点的右节点是新建的节点
            			currentNode.right = newNode;
            			break;
            		}else{
            			currentNode = currentNode.right;
            		}
            	}else{
            		// 去除相等的值
            		break;
            	}
        	}
        	
        }
    }
    
    /**
     * <p>遍历树 从小到大的顺序</p>
     * @param root
     */
    private List<Long> getNodes(UserIdTree root){
    	if(root!=null){
	    	getNodes(root.left);
	    	System.out.println(root.data);
	    	list.add(root.data);
	    	getNodes(root.right);
    	}
    	return list;
    }
    

}
