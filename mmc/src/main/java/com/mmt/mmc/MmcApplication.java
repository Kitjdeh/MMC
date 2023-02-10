package com.mmt.mmc;

import com.mmt.mmc.interceptor.JWTInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class MmcApplication implements WebMvcConfigurer {

	public static void main(String[] args) {
		SpringApplication.run(MmcApplication.class, args);
	}

	@Autowired
	private JWTInterceptor jwtInterceptor;

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		// 적용 제외 경로 중 중복 url은 front 단에서 auth-token으로 intercept
		registry.addInterceptor(jwtInterceptor).addPathPatterns("/api/v1/**") // 기본 적용 경로
				.excludePathPatterns("/api/v1/")
				.excludePathPatterns("/api/v1/login")
				.excludePathPatterns("/api/v1/logout")
				.excludePathPatterns("/api/v1/users")
				.excludePathPatterns("/api/v1/users/id")
				.excludePathPatterns("/api/v1/users/password")
				.excludePathPatterns("/api/v1/users/count")
				.excludePathPatterns("/api/v1/users/refresh")
				.excludePathPatterns("/api/v1/questions")
				.excludePathPatterns("/api/v1/questions/{question_id}")
				.excludePathPatterns("/api/v1/boards")
				.excludePathPatterns("/api/v1/boards/{board_id}");
	}
}
