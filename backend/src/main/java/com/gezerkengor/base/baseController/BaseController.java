package com.gezerkengor.base.baseController;

import com.gezerkengor.base.baseResponse.BaseResponse;

public class BaseController<T> implements IBaseController<T>{

    @Override
    public  BaseResponse<T> okResponse(T data) {
        return BaseResponse.okResponse(data);
    }

    @Override
    public BaseResponse<T> badResponse(T errorData) {
        return BaseResponse.badResponse(errorData);
    }
      
       

}
