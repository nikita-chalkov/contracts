package ru.nikitach.demo.contracts.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.nikitach.demo.contracts.entity.Client;
import ru.nikitach.demo.contracts.repository.ClientRepository;

import java.util.List;

@Service
public class ClientService {
    @Autowired
    private ClientRepository repository;

    public List<Client> getInsurantBySearch(Client client) {
        return repository.findClientByString(client.getFirstName(), client.getLastName(), client.getThirdName());
    }

    public Client save(Client client) {
        return repository.save(client);
    }
}
