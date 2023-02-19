package com.mmt.mmc.model.service;

import java.util.List;

import com.mmt.mmc.model.dto.TradeDto;

public interface TradeService {
	// 입출금 내역 찾기
	public TradeDto findTrade(int tradeId);
	// 입출금 내역 삽입
	public void addTrade(TradeDto tradeDto);
	// 입출금 내역 수정
	public void modifyTrade(TradeDto tradeDto);
	// 입출금 내역 제거
	public void removeTrade(int tradeId);
	// 해당 유저의 전체 입출금 내역 찾기
	public List<TradeDto> findByUserIdTradeList(int userId);
	// 미처리 전체 입출금 내역 찾기
	public List<TradeDto> findNotProcessTradeList();
}
