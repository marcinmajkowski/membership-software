package com.marcinmajkowski.membershipsoftware.payment;

import com.marcinmajkowski.membershipsoftware.customer.Customer;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface PaymentRepository extends PagingAndSortingRepository<Payment, Long> {

    List<Payment> findByPayerOrderByTimestampDesc(@Param("payer") Customer payer);
}
