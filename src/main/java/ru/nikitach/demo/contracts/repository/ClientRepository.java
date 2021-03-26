package ru.nikitach.demo.contracts.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.nikitach.demo.contracts.entity.Client;

public interface ClientRepository extends JpaRepository<Client,Integer> {

}
