package com.marcinmajkowski.membership.group;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface TrainingGroupRepository extends CrudRepository<TrainingGroup, Long> {
}
