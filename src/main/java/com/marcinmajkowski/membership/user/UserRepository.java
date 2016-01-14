package com.marcinmajkowski.membership.user;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Created by Marcin on 14/01/2016.
 */
@RepositoryRestResource
public interface UserRepository extends CrudRepository<User, Long> {
}
