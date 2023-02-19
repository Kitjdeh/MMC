package com.mmt.mmc.model.dto;

import java.time.LocalDateTime;
import java.util.Date;

import com.mmt.mmc.entity.Trade;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@NoArgsConstructor
public class TradeDto {
	private int tradeId;
	private int userId;
	private int depositAndWithdrawl;
	private int amount;
	private String date;
	private String bank;
	private String account;
	private int process;

	public Trade toEntity(){
		Trade build = Trade.builder()
			.tradeId(tradeId)
			.userId(userId)
			.depositAndWithdrawl(depositAndWithdrawl)
			.amount(amount)
			.date(date)
			.bank(bank)
			.account(account)
			.process(process)
			.build();
		return build;
	}

	@Builder
	public TradeDto(int tradeId, int userId, int depositAndWithdrawl, int amount, String date,
		String bank, String account, int process) {
		this.tradeId = tradeId;
		this.userId = userId;
		this.depositAndWithdrawl = depositAndWithdrawl;
		this.amount = amount;
		this.date = date;
		this.bank = bank;
		this.account = account;
		this.process = process;
	}
}
