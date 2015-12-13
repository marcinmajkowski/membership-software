package com.marcinmajkowski.membership.payment;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Created by Marcin on 12/12/2015.
 */
@RepositoryRestResource
public interface PaymentRepository extends PagingAndSortingRepository<Payment, Long> {
}
