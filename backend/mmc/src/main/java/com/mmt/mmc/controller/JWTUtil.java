package com.mmt.mmc.controller;

import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.InvalidParameterException;
import java.util.Date;
import java.util.Map;

@Component
@Slf4j
public class JWTUtil {
    @Value("${jwt.salt}")
    private String salt;

    @Value("${jwt.expmin}")
    private Long expireMin;//2시간

    //access 토큰 생성
    public String createAuthToken(int userId) {
        return create(userId, "authToken",expireMin * 60 * 1000);
    }

    //refresh 토큰 생성
    public String createRefreshToken() {
        return create(-1, "refreshToken", expireMin * 60 * 1000 * 5);
    }



    /**
     * 로그인 성공 시 사용자 정보를 기반으로 JWTToken을 생성해서 반환한다.
     * JWT Token = Header + Payload + Signagure
     *
     * @param userId
     * @param subject
     * @param expireMin
     * @return
     */
    private String create(int userId,String subject,long expireMin) {
        final JwtBuilder builder = Jwts.builder();
        //Header , Payload 설정
        builder.setSubject(subject)
                .setHeaderParam("alg", "HS256")
                .setHeaderParam("typ", "JWT")
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * expireMin));
        //담고 싶은 정보 설정
        builder.claim("userId", userId);

        //암호화
        builder.signWith(SignatureAlgorithm.HS256, salt.getBytes());

        //마지막 직렬화 처리
        final String jwt = builder.compact();
        log.debug("토큰 발행: {}", jwt);
        return jwt;
    }

    /**
     * jwt 토큰을 분석해서 필요한 정보를 반환한다.
     * 토큰에 문제가 있다면 Runtime 예외를 발생시킨다.
     * interceptor에서 토큰 유효성을 검증하기 위한 메서드
     * @param jwt
     * @return
     */
    public Map<String, Object> checkAndGetClaims(String jwt) {
        try{
            Jws<Claims> claims = Jwts.parser()
                    .setSigningKey(salt.getBytes())
                    .parseClaimsJws(jwt);
            log.trace("claims: {}", claims);

            //Claims는 Map의 구현체
            return claims.getBody();
        }
        catch (ExpiredJwtException e){
            e.printStackTrace();
            throw new InvalidParameterException("유효하지 않은 토큰입니다.");
        }

    }

}
