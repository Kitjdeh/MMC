package com.mmt.mmc.exception;

public class PwIncorrectException extends Exception{
    public PwIncorrectException(){
        super("비밀번호가 일치하지 않습니다.");
    }
}
