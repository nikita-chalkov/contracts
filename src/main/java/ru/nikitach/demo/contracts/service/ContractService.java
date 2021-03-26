package ru.nikitach.demo.contracts.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import ru.nikitach.demo.contracts.entity.Contract;
import ru.nikitach.demo.contracts.repository.ContractRepository;

import java.util.List;

@Slf4j
@Service
public class ContractService {
    @Autowired
    private ContractRepository repository;

    public List<Contract> getAllContracts() {
        return repository.findAll();//(Sort.by("date_conclusion"));
    }
}
