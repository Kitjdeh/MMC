package com.mmt.mmc.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mmt.mmc.entity.Trade;

public interface TradeRepository extends JpaRepository<Trade, Integer> {

}
