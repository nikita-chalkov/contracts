package ru.nikitach.demo.contracts.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;
import ru.nikitach.demo.contracts.entity.Contract;

import java.time.Duration;

@Slf4j
@Service
public class ContractValidator implements Validator {
    @Autowired
    private ContractService contractService;

    @Override
    public boolean supports(Class<?> aClass) {
        return Contract.class.equals(aClass);
    }

    @Override
    public void validate(Object o, Errors errors) {
        Contract contract = (Contract) o;
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "insuranceSum", "InsuranceSum");
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "dateStart", "DateStart");
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "dateEnd", "DateEnd");
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "buildingType", "BuildingType");
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "yearBuild", "YearBuild");
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "area", "Area");
        if (contract.getDateStart()!=null && contract.getDateEnd()!=null && Duration.between(contract.getDateStart().toLocalDate().atTime(0,0),contract.getDateEnd().toLocalDate().atTime(0,0)).toDays()>365)errors.rejectValue("dateEnd", "DateEnd");
        if (contract.getCalc()!=null) return;
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "dateCalc", "DateCalc");
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "bonus", "Bonus");
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "contractNumber", "ContractNumber");
        if (contract.getContractNumber()!=null && contractService.getContractByNumber(contract.getContractNumber())!=null && !contractService.getContractByNumber(contract.getContractNumber()).getId().equals(contract.getId())) errors.rejectValue("contractNumber", "ContractNumber");
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "dateConclusion", "DateConclusion");
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "insurant", "Insurant");
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "country", "Country");
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "region", "Region");
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "city", "City");
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "street", "Street");
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "apartment", "Apartment");
        if (contract.getInsurant()!=null && contract.getInsurant().getBirthDate()==null) errors.rejectValue("insurant.birthDate", "InsurantBirthDate");
        if (contract.getInsurant()!=null && contract.getInsurant().getPasportNumber()==null || contract.getInsurant().getPasportNumber().length()!=6) errors.rejectValue("insurant.pasportNumber", "InsurantPasportNumber");
        if (contract.getInsurant()!=null && contract.getInsurant().getPasportSeries()==null || contract.getInsurant().getPasportSeries().length()!=4) errors.rejectValue("insurant.pasportSeries", "InsurantPasportSeries");
    }
}
