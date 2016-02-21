package com.marcinmajkowski.membership.checkin;

import com.marcinmajkowski.membership.group.TrainingGroup;
import com.marcinmajkowski.membership.customer.Customer;
import org.springframework.data.rest.core.config.Projection;

import java.util.Date;

/**
 * Created by Marcin on 12/01/2016.
 */
@Projection(name = "customerAndTimestampAndTrainingGroup", types = CheckIn.class)
interface CustomerAndTimestampAndTrainingGroupCheckInProjection {

    Customer getCustomer();

    Date getTimestamp();

    TrainingGroup getTrainingGroup();
}
