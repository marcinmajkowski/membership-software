package com.marcinmajkowski.membership.checkin;

import com.marcinmajkowski.membership.person.Person;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

/**
 * Created by Marcin on 12/12/2015.
 */
@RepositoryRestResource
public interface CheckInRepository extends PagingAndSortingRepository<CheckIn, Long>, CheckInRepositoryCustom {

    // finding last visit for a card
    CheckIn findFirstByCardCodeOrderByTimestampDesc(String code);

    List<CheckIn> findByCardOwnerOrderByTimestampDesc(@Param("owner") Person owner);
}
