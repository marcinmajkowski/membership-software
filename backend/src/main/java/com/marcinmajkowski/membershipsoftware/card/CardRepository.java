package com.marcinmajkowski.membershipsoftware.card;

import com.marcinmajkowski.membershipsoftware.customer.Customer;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface CardRepository extends PagingAndSortingRepository<Card, Long> {

    Card findByCode(@Param("code") String code);

    List<Card> findByOwner(@Param("owner") Customer owner);
}
