package com.gezerkengor.base.baseResponse;

import lombok.Data;

@Data
public class BaseResponse<T> {
     
    private T data;
    private boolean isSucces;
    private T errorData;

    private BaseResponse(T data,T errorData,boolean isSucces)
    {
          this.data = data;
          this.errorData = errorData;
          this.isSucces = isSucces;
    }
    
    public static <T> BaseResponse<T> okResponse(T data){
           return new BaseResponse<T>(data,null, true);
    }

    public static <T> BaseResponse<T> badResponse(T errorData){
           return new BaseResponse<T>(null, errorData, false);
    }


}
