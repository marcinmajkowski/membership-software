package com.marcinmajkowski.membership.membership;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.math.BigDecimal;
import java.util.List;

/**
 * Created by Marcin on 08/12/2015.
 */
@RepositoryRestResource
public interface MembershipRepository extends CrudRepository<Membership, Long> {
}
