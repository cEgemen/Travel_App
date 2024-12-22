package com.gezerkengor.base.baseController;

import com.gezerkengor.base.baseResponse.BaseResponse;

public interface IBaseController<T> {
      
     public BaseResponse<T> okResponse(T data);

     public BaseResponse<T> badResponse(T errorData);

}
