package com.POM.MatNam.store.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.POM.MatNam.store.dto.Store;

public interface StoreDao extends JpaRepository<Store, Long>{
	
}
