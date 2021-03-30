package ru.nikitach.demo.contracts.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ru.nikitach.demo.contracts.entity.Client;

import java.util.List;

public interface ClientRepository extends JpaRepository<Client,Integer> {
    @Query("select g from Client g where concat(lower(g.firstName),lower(g.lastName),lower(g.thirdName)) like lower (concat('%', :searchTerm1, '%'))" +
            " or concat(lower(g.firstName),lower(g.lastName),lower(g.thirdName)) like lower (concat('%', :searchTerm2, '%'))" +
            " or concat(lower(g.firstName),lower(g.lastName),lower(g.thirdName)) like lower (concat('%', :searchTerm3, '%'))")
    List<Client> findClientByString(@Param("searchTerm1") String search1, @Param("searchTerm2") String search2, @Param("searchTerm3") String search3);

}
