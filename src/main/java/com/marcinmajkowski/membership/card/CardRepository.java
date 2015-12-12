package com.marcinmajkowski.membership.card;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Created by Marcin on 08/12/2015.
 */
@RepositoryRestResource
public interface CardRepository extends PagingAndSortingRepository<Card, String> {
}
