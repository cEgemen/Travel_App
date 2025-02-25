package com.gezerkengor.base.baseController;

import org.springframework.http.ResponseEntity;

import com.gezerkengor.base.baseResponse.BaseResponse;


public class BaseController<T> implements IBaseController<T>{

    @Override
    public  ResponseEntity<BaseResponse<T>> okResponse(T data) {
        return  ResponseEntity.ok().body(BaseResponse.okResponse(data));
    }

    @Override
    public ResponseEntity<BaseResponse<T>> badResponse(T errorData) {
        return ResponseEntity.badRequest().body(BaseResponse.badResponse(errorData));
    }
      
       

}
