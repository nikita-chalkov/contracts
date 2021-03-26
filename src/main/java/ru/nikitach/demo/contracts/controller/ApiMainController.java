package ru.nikitach.demo.contracts.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import org.springframework.web.bind.annotation.RestController;
import ru.nikitach.demo.contracts.service.ContractService;

@Slf4j
@RestController
@RequestMapping("/api")
public class ApiMainController {
    @Autowired
    private ContractService contractService;

    @RequestMapping(value = {"/all"},method = RequestMethod.POST, produces="application/json")
    public String welcome() throws JsonProcessingException {
        return new ObjectMapper().writeValueAsString(contractService.getAllContracts());
    }

}
