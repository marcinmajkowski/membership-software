package com.marcinmajkowski.membership.checkin;

import com.marcinmajkowski.membership.group.TrainingGroup;
import com.marcinmajkowski.membership.person.Person;
import org.springframework.data.rest.core.config.Projection;

import java.util.Date;

/**
 * Created by Marcin on 12/01/2016.
 */
@Projection(name = "personAndTimestampAndTrainingGroup", types = CheckIn.class)
interface PersonAndTimestampAndTrainingGroupCheckInProjection {

    Person getPerson();

    Date getTimestamp();

    TrainingGroup getTrainingGroup();
}
