package ru.nikitach.demo.contracts.entity;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Date;

@Setter
@Getter
@Entity
@Table(name = "Contracts")
public class Contract {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "insurance_sum", nullable = false)
    private Integer insuranceSum;

    @Column(name = "date_start", nullable = false)
    private Date dateStart;

    @Column(name = "date_end", nullable = false)
    private Date dateEnd;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "building_type")
    private BuildingType buildingType;

    @Column(name = "year_build", length = 4, nullable = false)
    private Integer yearBuild;

    @Column(name = "area", nullable = false)
    private Double area;

    @Column(name = "date_calc", nullable = false)
    private Date dateCalc;

    @Column(name = "bonus", nullable = false)
    private Double bonus;

    @Column(name = "contract_number", length = 6, nullable = false)
    private String contractNumber;

    @Column(name = "date_conclusion", nullable = false)
    private Date dateConclusion;

    @Transient
    private Integer calc;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "insurant")
    private Client insurant;

    @Column(name = "country", nullable = false)
    private String country;

    @Column(name = "`index`")
    private String index;

    @Column(name = "region", nullable = false)
    private String region;

    @Column(name = "district")
    private String district;

    @Column(name = "city", nullable = false)
    private String city;

    @Column(name = "street", nullable = false)
    private String street;

    @Column(name = "house")
    private Integer house;

    @Column(name = "housing")
    private String housing;

    @Column(name = "structure")
    private String structure;

    @Column(name = "apartment", nullable = false)
    private String apartment;

    @Column(name = "contract_comment", length = 1000)
    private String contractComment;

    public Contract() {}

}
