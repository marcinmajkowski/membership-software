package com.marcinmajkowski.membership.payment;

import com.marcinmajkowski.membership.person.Person;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

/**
 * Created by Marcin on 12/12/2015.
 */
@RepositoryRestResource
public interface PaymentRepository extends PagingAndSortingRepository<Payment, Long> {

    List<Payment> findByPayerOrderByTimestampDesc(@Param("payer") Person payer);
}
