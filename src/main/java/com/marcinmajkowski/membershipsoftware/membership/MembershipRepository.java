package com.marcinmajkowski.membershipsoftware.membership;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface MembershipRepository extends CrudRepository<Membership, Long> {
}
