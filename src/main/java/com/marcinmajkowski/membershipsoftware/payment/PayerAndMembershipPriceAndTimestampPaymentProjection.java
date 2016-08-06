package com.marcinmajkowski.membershipsoftware.payment;

import com.marcinmajkowski.membershipsoftware.customer.Customer;
import org.springframework.data.rest.core.config.Projection;

import java.math.BigDecimal;
import java.util.Date;

/**
 * Created by Marcin on 24/01/2016.
 */
@Projection(name = "payerAndMembershipPriceAndTimestamp", types = Payment.class)
public interface PayerAndMembershipPriceAndTimestampPaymentProjection {

    Customer getPayer();

    BigDecimal getMembershipPrice();

    Date getTimestamp();
}
