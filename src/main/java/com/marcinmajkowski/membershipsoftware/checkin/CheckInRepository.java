package com.marcinmajkowski.membershipsoftware.checkin;

import com.marcinmajkowski.membershipsoftware.customer.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface CheckInRepository extends PagingAndSortingRepository<CheckIn, Long> {

    Page<CheckIn> findByCustomer(@Param("customer") Customer customer, Pageable pageable);

    // finding last visit for a card
    CheckIn findFirstByCardCodeOrderByTimestampDesc(String code);

    List<CheckIn> findByCardOwnerOrderByTimestampDesc(@Param("owner") Customer owner);
}
