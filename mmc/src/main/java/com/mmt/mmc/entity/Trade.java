package com.mmt.mmc.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.CreatedDate;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
public class Trade {
	@Id
	@GeneratedValue
	private int tradeId;

	@Column(nullable = false)
	private int userId;

	@Column
	@ColumnDefault("0")
	private int depositAndWithdrawl;

	@Column(nullable = false)
	private int amount;

	@CreatedDate
	@Column(updatable = false)
	private LocalDateTime date;

	@Column(nullable = false)
	private String bank;

	@Column(nullable = false)
	private String account;

	@Column
	@ColumnDefault("0")
	private int process;

	@Builder
	public Trade(int tradeId, int userId, int depositAndWithdrawl, int amount, LocalDateTime date,
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
