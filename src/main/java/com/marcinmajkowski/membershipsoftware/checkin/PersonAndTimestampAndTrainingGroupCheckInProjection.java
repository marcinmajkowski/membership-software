package com.marcinmajkowski.membershipsoftware.checkin;

import com.marcinmajkowski.membershipsoftware.customer.Customer;
import com.marcinmajkowski.membershipsoftware.group.TrainingGroup;
import org.springframework.data.rest.core.config.Projection;

import java.util.Date;

@Projection(name = "customerAndTimestampAndTrainingGroup", types = CheckIn.class)
interface CustomerAndTimestampAndTrainingGroupCheckInProjection {

    Customer getCustomer();

    Date getTimestamp();

    TrainingGroup getTrainingGroup();
}
