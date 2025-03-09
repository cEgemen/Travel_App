package com.gezerkengor.base.baseErrors;

public enum ErrorsEnum {
    
   USER_NOT_FOUND("User not found!!!",404),
   USER_ALREADY_EXIST("User alreadt exist.",409),
   FAVORITE_NOT_FOUND("Favorite not found!!!",404);

    private int statusCode;
    private String message;

    public String getMessage(){
          return this.message;
    }

    public int getStatusCode(){
        return this.statusCode;
                              }

    private ErrorsEnum(String message,int statusCode)
    {
         this.message = message;
         this.statusCode = statusCode;
    }
}
