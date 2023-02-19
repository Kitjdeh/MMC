package com.mmt.mmc.exception;

import lombok.Getter;

@Getter
public class InterceptorException extends RuntimeException{
    private InterceptorExceptionEnum error;

    public InterceptorException(InterceptorExceptionEnum e) {
        super(e.getMessage());
        this.error = e;
    }
}
