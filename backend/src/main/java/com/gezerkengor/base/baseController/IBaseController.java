package com.gezerkengor.base.baseController;

import org.springframework.http.ResponseEntity;
import com.gezerkengor.base.baseResponse.BaseResponse;

public interface IBaseController<T> {
      
     public ResponseEntity<BaseResponse<T>> okResponse(T data);

     public ResponseEntity<BaseResponse<T>> badResponse(T errorData);

}
