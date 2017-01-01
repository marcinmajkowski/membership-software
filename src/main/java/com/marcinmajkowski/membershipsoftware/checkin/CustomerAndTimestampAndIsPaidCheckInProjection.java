package com.marcinmajkowski.membershipsoftware.checkin;

import com.marcinmajkowski.membershipsoftware.customer.Customer;
import org.springframework.data.rest.core.config.Projection;

import java.util.Date;

@Projection(name = "customerAndTimestampAndIsPaid", types = CheckIn.class)
public interface CustomerAndTimestampAndIsPaidCheckInProjection {

    Customer getCustomer();

    Date getTimestamp();

    boolean isPaid();
}
