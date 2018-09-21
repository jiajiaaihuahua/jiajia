/**
 * 归并算法
 * @author Brandy
 */
package demo;

import java.util.ArrayList;
import java.util.List;

public class Demo1 {
	public static void main(String[] args) {
		List<NumberDto> list = new ArrayList<NumberDto>();
		list.add(new NumberDto(3.0));
		list.add(new NumberDto(3.4));
		list.add(new NumberDto(2.0));
		list.add(new NumberDto(3.6));
		list.add(new NumberDto(1.6));
		
		mergeSort(list, 0, list.size()-1);
		
		for(NumberDto numberDto : list) {
			System.out.print(numberDto.getNum()+"-->");
		}
	}
	
	/**
	 * 排序
	 * @param list
	 * @param first
	 * @param last
	 */
	public static void mergeSort(List<NumberDto> list, int first, int last) {
		if( first < last ) {
			int middle = ( first + last )/2;
			mergeSort(list, first, middle);
			mergeSort(list, middle+1, last);
			mergearray(list, first, middle, last);
		}
	}
	
	/**
	 * 合并
	 * @param list
	 * @param first
	 * @param mid
	 * @param last
	 */
	public static void mergearray(List<NumberDto> list, int first, int mid, int last) {  
		List<NumberDto> temp = new ArrayList<>();
	    int i = first, j = mid + 1;  
	    int m = mid,   n = last;  
	    int k = 0;
	    
	    while (i <= m && j <= n)  
	    {  
	        if (list.get(i).getNum() <= list.get(j).getNum())  {
	        	temp.add(list.get(i++));
	        	k++;
	        } else {
	        	temp.add(list.get(j++));
	        	k++;
	        }
	        	
	    }  
	  
	    while (i <= m) {
	    	temp.add(list.get(i++));
	    	k++;
	    }
	    	
	    while (j <= n) {
	    	temp.add(list.get(j++));
	    	k++;
	    }
	    
	    for (i = 0; i < k; i++)  
	        list.set(first+i, temp.get(i));  
	}

}
