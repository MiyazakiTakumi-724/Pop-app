package com.pop.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ProblemDetail;
import org.springframework.validation.BindException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

/**
 * エラー応答を docs/api.md の形（ProblemDetail）にそろえる。
 * detail は画面にそのまま出せる日本語の文章にする。
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    /** 画像が大きすぎる → 413 */
    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ProblemDetail handleMaxUploadSize(MaxUploadSizeExceededException e) {
        return ProblemDetail.forStatusAndDetail(
                HttpStatusCode.valueOf(413),
                "画像が大きすぎます。1枚5MB以内にしてください");
    }

    /** 入力が制限に反する（@Valid の検査に失敗） → 400 */
    @ExceptionHandler(BindException.class)
    public ProblemDetail handleBind(BindException e) {
        String detail = e.getBindingResult().getFieldErrors().stream()
                .findFirst()
                .map(error -> error.getDefaultMessage())
                .orElse("入力内容に誤りがあります");
        return ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, detail);
    }
}
