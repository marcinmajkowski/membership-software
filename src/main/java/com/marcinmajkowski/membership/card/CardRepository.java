package com.marcinmajkowski.membership.card;

import com.marcinmajkowski.membership.person.Person;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

/**
 * Created by Marcin on 08/12/2015.
 */
@RepositoryRestResource
public interface CardRepository extends PagingAndSortingRepository<Card, Long> {

    List<Person> findByCode(@Param("code") String code);
}
