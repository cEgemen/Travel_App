package com.gezerkengor.base.baseResponse;

import lombok.Data;

@Data
public class BaseResponse<T> {
     
    private T ok_data;
    private boolean isSucces;
    private T error_data;

    private BaseResponse(T data,T errorData,boolean isSucces)
    {
          this.ok_data = data;
          this.error_data = errorData;
          this.isSucces = isSucces;
    }

    public boolean getIsSucces()
    {
        return this.isSucces;
    }

    public void setIsSucces(boolean isSucces)
    {
        this.isSucces = isSucces;
    }
    
    public static <T> BaseResponse<T> okResponse(T data){
           return new BaseResponse<T>(data,null, true);
    }

    public static <T> BaseResponse<T> badResponse(T errorData){
           return new BaseResponse<T>(null, errorData, false);
    }


}
