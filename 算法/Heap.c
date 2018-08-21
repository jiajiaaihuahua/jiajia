/**
 * Heap Sorting Algorithm reference Introduction to algorithms
 * @author Brandy
 */
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

void maxHeapify(char* array[], int index, int heapSize);
void swap(char * array[], int i , int j);
void buildMaxHeap( char* array[], int heapSize);
bool compare(char* previous, char* last);
bool compareForInteger(char* previous, char* last);

int main()
{
    char* array[] = {"4","3","56","34","109","32","45","123","523"};
    int length = sizeof(array)/sizeof(array[0]);
    printf("the array length is: %d",length);
    printf("\n");
    buildMaxHeap(array, length);
    int i;
    for(i = 0; i < length ; i++){
        printf("%s ",array[i]);
    }

    heapSort( array , length );

    return 0;
}

  /**
   * maintain maximum heap properties
   */
   void maxHeapify(char* array[], int index, int heapSize){
       int iMax = index;            /* set index maximum */
       int iLeft = 2*index + 1;     /* get left child node value */
       int iRight = 2*( index + 1 ); /* get right child node value */

       /* If the value on the left is greater than the maximum value,swap the position. */
       if( iLeft < heapSize && compareForInteger(array[iLeft], array[iMax]) ){
            iMax = iLeft;
       }

       /* In same, if the value on the right is greater than the maximum value,swap the position.*/
       if( iRight < heapSize && compareForInteger(array[iRight], array[iMax]) ){
            iMax = iRight;
       }

       /* If iMax is not equal to index, swap the value.*/
       if( iMax != index ){
            swap( array, iMax, index );
            maxHeapify( array, iMax, heapSize );
       }
   }

   /**
    * swap array position.
    */
   void swap(char * array[], int i , int j){
       char* temp = array[i];
       array[i] = array[j];
       array[j] = temp;
   }

   /**
    * Transform an array into the largest heap.
    * From the parent node number of the last node to 0 , keep each element at the maximum heap property.
    */
   void buildMaxHeap( char* array[], int heapSize){
       /* get the parent node subscript of the last node. */
       int lastParentSubscript = (heapSize - 2)/2;
       /* maintain maximum heap property. */
       int i;
       for(i = lastParentSubscript; i >= 0; i--){
            maxHeapify(array, i, heapSize);
            /* print array for view element */
/**            printf("\n ");
           int j;
           for(j = 0; j < heapSize ; j++){
               printf("%s ",array[j]);
           }**/
       }


   }

   /**
    * compare size between strings
    */
   bool compare(char* previous, char* last){
       int i = 0;   /* a cursor */
        for( ; previous[i] != '\0' && last[i] != '\0' ; i++ ){
            if(previous[i] > last[i]){
                return true;
            }else if( previous[i] < last[i] ){
                return false;
            }else {
                continue;
            }
        }

        /* if end of cycle, determine if their length is consistent; */
        if( previous[i] == '\0' ){
            return false;
        }else{
            return true;
        }
   }

   /**
    * compare size between Integer.
    */
   bool compareForInteger(char* previous, char* last){
        int previousInteger = atoi(previous);
        int lastInteger = atoi(last);
        if(previousInteger > lastInteger)
            return true;
        else
            return false;
   }

   /**
    * Heap sort
    * @param array[] a string array.
    * @description By swapping the top and bottom elements of the stack, loop operation.
    */
    void heapSort(char* array[], int heapSize){
        /* declare a array store new string */
        char* orderString[heapSize] ;
        int i = 0;
        for(; i < heapSize; i++ ){
            /* swap the top and bottom elements of stack */
            swap( array, heapSize-i-1, 0);
            orderString[i] = array[heapSize-1-i];
            /* Remove the last element */
            array[heapSize-1-i] = '\0';
            /* renew maintain maximum property */
            maxHeapify(array, 0, heapSize-1-i);
        }

            printf("\n ");
            int j;
            for(j = 0; j < heapSize ; j++){
                printf("%s ",orderString[j]);
            }

    }
