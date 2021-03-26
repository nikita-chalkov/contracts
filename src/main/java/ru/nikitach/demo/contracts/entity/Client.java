package ru.nikitach.demo.contracts.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Date;

@Setter
@Getter
@Entity
@Table(name = "Clients")
public class Client {
    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "first_name", length = 50, nullable = false)
    private String firstName;

    @Column(name = "last_name", length = 50, nullable = false)
    private String lastName;

    @Column(name = "third_name", length = 50)
    private String thirdName;

    @Column(name = "birth_date", nullable = false)
    private Date birthDate;

    @Column(name = "pasport_number", nullable = false)
    private Integer pasportNumber;

    @Column(name = "pasport_series", nullable = false)
    private Integer pasportSeries;

    public Client(){}
}
