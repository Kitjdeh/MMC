package com.mmt.mmc.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.mmt.mmc.model.dto.TradeDto;
import com.mmt.mmc.model.service.TradeService;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*")
public class TradeRestController {
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";

	@Autowired
	private TradeService tradeService;

	// 입출금 신청
	@PostMapping("/mypage/points")
	public ResponseEntity<String> TradeAdd(@RequestBody TradeDto tradeDto) {
		System.out.println("TRADEADD "+ tradeDto);
		tradeService.addTrade(tradeDto);
		return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
	}

	// 해당 유저 전체 입출금 정보 가져오기
	@GetMapping("/mypage/points/{user_id}")
	public ResponseEntity<List<TradeDto>> TradeByUserIdList(@PathVariable("user_id") int userId){
		List<TradeDto> trades = tradeService.findByUserIdTradeList(userId);
		return new ResponseEntity<>(trades, HttpStatus.OK);
	}

	// 미처리 입출금 정보 가져오기
	@GetMapping("/points")
	public ResponseEntity<List<TradeDto>> TradeNoTProcessList(){
		List<TradeDto> trades = tradeService.findNotProcessTradeList();
		return new ResponseEntity<>(trades, HttpStatus.OK);
	}

	// 입출금 정보 변경
	@PutMapping("/points/{trade_id}")
	public ResponseEntity<String> TradeModify(@PathVariable("trade_id") int tradeId, @RequestBody TradeDto tradeDto){
		System.out.println("TRADEDTO "+tradeDto);
		tradeService.modifyTrade(tradeDto);
		// 사용자 포인트 정보 수정 추가 필요

		return new ResponseEntity<>(SUCCESS,HttpStatus.OK);
	}

	// 입출금 내역 삭제
	@DeleteMapping("/points/{trade_id}")
	public ResponseEntity<String> TradeRemove(@PathVariable("trade_id") int tradeId){
		tradeService.removeTrade(tradeId);
		return new ResponseEntity<>(SUCCESS,HttpStatus.OK);
	}
}
