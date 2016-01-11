package com.marcinmajkowski.membership.person;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

/**
 * Created by Marcin on 08/12/2015.
 */
@RepositoryRestResource(collectionResourceRel = "people", path = "people")
public interface PersonRepository extends CrudRepository<Person, Long> {

    List<Person> findByLastName(@Param("name") String name);

    List<Person> findByFirstNameAndLastNameAllIgnoreCase(
            @Param("firstName") String firstName,
            @Param("lastName") String lastName
    );
}
