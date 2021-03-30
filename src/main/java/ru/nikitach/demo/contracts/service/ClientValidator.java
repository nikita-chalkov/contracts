package ru.nikitach.demo.contracts.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;
import ru.nikitach.demo.contracts.entity.Client;

@Slf4j
@Service
public class ClientValidator implements Validator {
    @Override
    public boolean supports(Class<?> aClass) {
        return Client.class.equals(aClass);
    }

    @Override
    public void validate(Object o, Errors errors) {
        Client client = (Client) o;
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "firstName", "FirstName");
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "lastName", "LastName");
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "birthDate", "BirthDate");
        if(client.getPasportNumber()!=null&&client.getPasportNumber().toString().length()<6)
            errors.rejectValue("pasportNumber", "PasportNumber");
        if(client.getPasportSeries()!=null&&client.getPasportSeries().toString().length()<4)
            errors.rejectValue("pasportSeries", "PasportSeries");
    }
}
