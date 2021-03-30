package ru.nikitach.demo.contracts.service;

import junit.framework.TestCase;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import ru.nikitach.demo.contracts.Application;
import ru.nikitach.demo.contracts.entity.BuildingType;
import ru.nikitach.demo.contracts.entity.Contract;

import java.sql.Date;


@Slf4j
@SpringBootTest(classes= Application.class)
@RunWith(SpringRunner.class)
public class ContractServiceTest extends TestCase {
    @Autowired
    private ContractService contractService;

    @Test
    public void testCalculate() {
        Contract contract = new Contract();
        contract.setInsuranceSum(100);
        contract.setDateStart(Date.valueOf("2020-01-01"));
        contract.setDateEnd(Date.valueOf("2020-01-02"));
        //days = 1d
        BuildingType buildingType = new BuildingType();
        buildingType.setId(2);//home k=1.5
        contract.setBuildingType(buildingType);
        contract.setYearBuild(2015);//k=2.0
        contract.setArea(100.0);//k=2.0
        //bonus = (100/1)*1.5*2.0*2.0=600
        assertEquals(600.0,contractService.calculate(contract));
    }
}