package com.marcinmajkowski.membership.card;

import com.marcinmajkowski.membership.customer.Customer;
import org.springframework.data.rest.core.config.Projection;

import java.util.Date;

/**
 * Created by Marcin on 16/12/2015.
 */
@Projection(name = "cardProjection", types = { Card.class })
interface CardProjection {

    String getCode();

    Date getIssueTimestamp();

    Customer getOwner();
}
