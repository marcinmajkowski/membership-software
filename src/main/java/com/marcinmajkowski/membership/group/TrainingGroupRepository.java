package com.marcinmajkowski.membership.group;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Created by Marcin on 10/01/2016.
 */
@RepositoryRestResource
public interface TrainingGroupRepository extends CrudRepository<TrainingGroup, Long> {
}
