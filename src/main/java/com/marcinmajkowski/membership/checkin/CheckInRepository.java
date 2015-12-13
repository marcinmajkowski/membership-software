package com.marcinmajkowski.membership.checkin;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Created by Marcin on 12/12/2015.
 */
@RepositoryRestResource
public interface CheckInRepository extends PagingAndSortingRepository<CheckIn, Long>, CheckInRepositoryCustom {

    // finding last visit for a card
    CheckIn findFirstByCardCodeOrderByTimestampDesc(String code);
}
