package com.marcinmajkowski.membership.checkin;

import com.marcinmajkowski.membership.customer.Customer;
import com.marcinmajkowski.membership.group.TrainingGroup;
import org.springframework.data.rest.core.config.Projection;

import java.util.Date;

@Projection(name = "customerAndTimestampAndTrainingGroup", types = CheckIn.class)
interface CustomerAndTimestampAndTrainingGroupCheckInProjection {

    Customer getCustomer();

    Date getTimestamp();

    TrainingGroup getTrainingGroup();
}
