package ru.nikitach.demo.contracts.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.nikitach.demo.contracts.entity.BuildingType;

public interface BuildingTypeRepository extends JpaRepository<BuildingType,Integer> {
}
