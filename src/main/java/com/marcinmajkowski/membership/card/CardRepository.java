package com.marcinmajkowski.membership.card;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Created by Marcin on 08/12/2015.
 */
@RepositoryRestResource(excerptProjection = CardProjection.class)
public interface CardRepository extends PagingAndSortingRepository<Card, Long> {

    Card findByCode(@Param("code") String code);
}
