package ru.nikitach.demo.contracts.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import ru.nikitach.demo.contracts.entity.Contract;
import ru.nikitach.demo.contracts.repository.ContractRepository;

import java.time.Duration;
import java.util.List;


@Slf4j
@Service
@PropertySource("classpath:coefficient.properties")
public class ContractService {
    @Autowired
    private ContractRepository repository;
    @Value("${coefficient.buildingTypes}")
    private Integer buildingTypes;
    @Value("${coefficient.buildingType.typeId}")
    private Integer[] buildingTypeId;
    @Value("${coefficient.buildingType.typeVal}")
    private Double[] buildingTypeVal;
    @Value("${coefficient.buildYears}")
    private Integer buildYears;
    @Value("${coefficient.buildYear.years}")
    private Integer[] buildYearRange;
    @Value("${coefficient.buildYear.val}")
    private Double[] buildYearVal;
    @Value("${coefficient.areas}")
    private Integer areas;
    @Value("${coefficient.area.sizes}")
    private Double[] areasRange;
    @Value("${coefficient.area.val}")
    private Double[] areasVal;


    public List<Contract> getAllContracts() {
        return repository.findAll();//Sort.by("date_conclusion")
    }

    public Contract getContractByNumber(String number) {
        return repository.findByNumber(number);
    }

    //(Страховая сумма / кол-во дней) * Коэф.ТН * Коэф.ГП * Коэф.Пл
    public Double calculate(Contract contract){
        Long durationDays = Duration.between(contract.getDateStart().toLocalDate().atTime(0,0),contract.getDateEnd().toLocalDate().atTime(0,0)).toDays();
        Double CBT = getCoefficientBuildingType(contract.getBuildingType().getId());
        Double CBY = getCoefficientBuildYear(contract.getYearBuild());
        Double CA = getCoefficientArea(contract.getArea());
        log.info("CBT: " + CBT + "   CBY: " + CBY + "   CA: " + CA);
        Double bonus = (contract.getInsuranceSum() / durationDays.doubleValue()) * CBT * CBY * CA;
        return Double.valueOf(String.format("%.2f",bonus).replace(',','.'));
    }

    private Double getCoefficientBuildingType(Integer type){
        for(int i=0;i<buildingTypes;i++){
            if (buildingTypeId[i].equals(type)) return buildingTypeVal[i];
        }
        return 0.0;
    }

    private Double getCoefficientBuildYear(Integer year) {
        for (int i=0;i<buildYears;i++) {
            if (i==0) {
                if (year<buildYearRange[0]) return buildYearVal[0];
            } else if (i==(buildYears-1)) {
                if (year>=buildYearRange[i]) return buildYearVal[i];
            } else if (year>=buildYearRange[i-1] && year<buildYearRange[i]) {
                return buildYearVal[i];
            }
        }
        return 0.0;
    }

    private Double getCoefficientArea(Double area) {
        for (int i=0;i<areas;i++) {
            if (i==0) {
                if (area<areasRange[0]) return areasVal[0];
            } else if (i==(areas-1)) {
                if (area>=areasRange[i]) return areasVal[i];
            } else if (area>=areasRange[i-1] && area<areasRange[i]) {
                return areasVal[i];
            }
        }
        return 0.0;
    }

    public Contract save(Contract contract) {
        return repository.save(contract);
    }
}
