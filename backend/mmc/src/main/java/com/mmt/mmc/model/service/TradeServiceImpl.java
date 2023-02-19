package com.mmt.mmc.model.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mmt.mmc.entity.Trade;
import com.mmt.mmc.model.dto.TradeDto;
import com.mmt.mmc.repository.TradeRepository;

@Service
public class TradeServiceImpl implements TradeService {
	@Autowired
	private TradeRepository tradeRepository;

	// 입출금 내역 찾기
	@Override
	public TradeDto findTrade(int tradeId) {
		Optional<Trade> tradeWrapper = tradeRepository.findById(tradeId);
		if (tradeWrapper.isPresent()) {
			Trade trade = tradeWrapper.get();
			TradeDto dto = TradeDto.builder()
				.tradeId(tradeId)
				.userId(trade.getUserId())
				.depositAndWithdrawl(trade.getDepositAndWithdrawl())
				.amount(trade.getAmount())
				.date(trade.getDate())
				.bank(trade.getBank())
				.account(trade.getAccount())
				.process(trade.getProcess())
				.build();
			return dto;
		}
		return null;
	}

	// 입출금 내역 등록
	@Override
	public void addTrade(TradeDto tradeDto) {
		tradeRepository.save(tradeDto.toEntity()).getTradeId();
	}

	// 입출금 내역 수정
	@Override
	@Transactional
	public void modifyTrade(TradeDto tradeDto) {
		Optional<Trade> tradeWrapper=tradeRepository.findById(tradeDto.getTradeId());
		if(tradeWrapper.isPresent()){
			Trade trade = tradeWrapper.get();
			trade.changeProcess(tradeDto.getProcess());
			tradeRepository.save(trade).getTradeId();
		}
	}

	// 입출금 내역 제거
	@Override
	public void removeTrade(int tradeId) {
		Optional<Trade> tradeWrapper = tradeRepository.findById(tradeId);
		if (tradeWrapper.isPresent()) {
			Trade trade = tradeWrapper.get();
			tradeRepository.deleteById(trade.getTradeId());
		}
	}

	// 해당 유저의 전체 입출금 내역 찾기
	@Override
	public List<TradeDto> findByUserIdTradeList(int userId) {
		List<Trade> trades = tradeRepository.findAll();
		List<TradeDto> tradeDtoList = new ArrayList<>();

		for (Trade trade : trades) {
			if (trade.getUserId() == userId) {
				TradeDto dto = TradeDto.builder()
					.tradeId(trade.getTradeId())
					.userId(trade.getUserId())
					.depositAndWithdrawl(trade.getDepositAndWithdrawl())
					.amount(trade.getAmount())
					.date(trade.getDate())
					.bank(trade.getBank())
					.account(trade.getAccount())
					.process(trade.getProcess())
					.build();
				tradeDtoList.add(dto);
			}
		}
		return tradeDtoList;
	}

	// 미처리 전체 입출금 내역 찾기
	@Override
	public List<TradeDto> findNotProcessTradeList() {
		List<Trade> trades = tradeRepository.findAll();
		List<TradeDto> tradeDtoList = new ArrayList<>();

		for (Trade trade : trades) {
			if (trade.getProcess() == 0) {
				TradeDto dto = TradeDto.builder()
					.tradeId(trade.getTradeId())
					.userId(trade.getUserId())
					.depositAndWithdrawl(trade.getDepositAndWithdrawl())
					.amount(trade.getAmount())
					.date(trade.getDate())
					.bank(trade.getBank())
					.account(trade.getAccount())
					.process(trade.getProcess())
					.build();
				tradeDtoList.add(dto);
			}
		}
		return tradeDtoList;
	}
}
