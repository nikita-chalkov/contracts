package ru.nikitach.demo.contracts.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import ru.nikitach.demo.contracts.entity.Client;
import ru.nikitach.demo.contracts.entity.Contract;
import ru.nikitach.demo.contracts.service.*;


@Slf4j
@RestController
@RequestMapping("/api")
public class ApiMainController {
    @Autowired
    private ContractService contractService;
    @Autowired
    private ContractValidator contractValidator;
    @Autowired
    private BuildingTypeService buildingTypeService;
    @Autowired
    private ClientService clientService;
    @Autowired
    private ClientValidator clientValidator;

    @RequestMapping(value = {"/all"},method = RequestMethod.POST, produces="application/json")
    public String getAllContracts() throws JsonProcessingException {
        return new ObjectMapper().writeValueAsString(contractService.getAllContracts());
    }

    @RequestMapping(value = {"/buildingTypes"},method = RequestMethod.POST, produces="application/json")
    public String getBuildingTypes() throws JsonProcessingException {
        return new ObjectMapper().writeValueAsString(buildingTypeService.getBuildingTypes());
    }

    @RequestMapping(value = {"/insurantSearch"},method = RequestMethod.POST, produces = "application/json", consumes = MediaType.APPLICATION_JSON_VALUE)
    public String getInsurantBySearch(@RequestBody Client client) throws JsonProcessingException {
        return new ObjectMapper().writeValueAsString(clientService.getInsurantBySearch(client));
    }

    @RequestMapping(value = {"/insurantCreate"},method = RequestMethod.POST, produces = "application/json", consumes = MediaType.APPLICATION_JSON_VALUE)
    public String insurantCreate(@RequestBody Client client, BindingResult bindingResult) throws JsonProcessingException {
        clientValidator.validate(client, bindingResult);
        if(bindingResult.hasErrors()) {
            return new ObjectMapper().writeValueAsString(bindingResult.getAllErrors());
        }
        return new ObjectMapper().writeValueAsString(clientService.save(client));
    }

    @RequestMapping(value = {"/contractCreate"},method = RequestMethod.POST, produces = "application/json", consumes = MediaType.APPLICATION_JSON_VALUE)
    public String contractCreate(@RequestBody Contract contract, BindingResult bindingResult) throws JsonProcessingException {
        contractValidator.validate(contract, bindingResult);
        if(bindingResult.hasErrors()) {
            return new ObjectMapper().writeValueAsString(bindingResult.getAllErrors());
        }
        clientService.save(contract.getInsurant());
        contract.setBonus(contractService.calculate(contract));
        return new ObjectMapper().writeValueAsString(contractService.save(contract));
    }

    @RequestMapping(value={"/calculate"}, method = RequestMethod.POST, produces = "application/json", consumes = MediaType.APPLICATION_JSON_VALUE)
    public String calculateContract(@RequestBody Contract contract, BindingResult bindingResult) throws JsonProcessingException {
        contractValidator.validate(contract, bindingResult);
        if(bindingResult.hasErrors()) {
            return new ObjectMapper().writeValueAsString(bindingResult.getAllErrors());
        }
        return new ObjectMapper().writeValueAsString(contractService.calculate(contract));
    }
}
