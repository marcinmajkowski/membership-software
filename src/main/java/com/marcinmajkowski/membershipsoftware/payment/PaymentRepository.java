package com.marcinmajkowski.membershipsoftware.payment;

import com.marcinmajkowski.membershipsoftware.customer.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface PaymentRepository extends PagingAndSortingRepository<Payment, Long> {

    Page<Payment> findByPayer(@Param("payer") Customer payer, Pageable pageable);

    @Query("select p from Payment p " +
            "where p.payer = :payer " +
            "and current_date between p.membershipStartDate and p.membershipEndDate " +
            "and (p.checkInsSize < p.membershipNumberOfTrainings or p.membershipNumberOfTrainings = -1)")
    Iterable<Payment> findValidTodayByPayer(@Param("payer") Customer payer);
}
