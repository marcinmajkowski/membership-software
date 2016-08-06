package com.marcinmajkowski.membershipsoftware.customer;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface CustomerRepository extends CrudRepository<Customer, Long> {

    Customer findByCardsCode(@Param("code") String code);

    List<Customer> findByLastName(@Param("name") String name);

    List<Customer> findByFirstNameAndLastNameAllIgnoreCase(
            @Param("firstName") String firstName,
            @Param("lastName") String lastName
    );
}
