package ru.nikitach.demo.contracts.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import ru.nikitach.demo.contracts.entity.BuildingType;
import ru.nikitach.demo.contracts.repository.BuildingTypeRepository;

import java.util.List;

@Service
public class BuildingTypeService {
    @Autowired
    private BuildingTypeRepository repository;

    public List<BuildingType> getBuildingTypes() {
        return repository.findAll(Sort.by("id"));
    }
}
