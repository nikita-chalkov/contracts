package ru.nikitach.demo.contracts.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.nikitach.demo.contracts.entity.Contract;

public interface ContractRepository extends JpaRepository<Contract,Integer> {
}
