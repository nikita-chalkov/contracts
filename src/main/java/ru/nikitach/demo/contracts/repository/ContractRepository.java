package ru.nikitach.demo.contracts.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ru.nikitach.demo.contracts.entity.Contract;

public interface ContractRepository extends JpaRepository<Contract,Integer> {
    @Query("select g from Contract g where contractNumber = :searchTerm")
    Contract findByNumber(@Param("searchTerm") String number);
}
