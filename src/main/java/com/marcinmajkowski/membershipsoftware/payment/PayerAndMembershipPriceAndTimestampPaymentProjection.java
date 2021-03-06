package com.marcinmajkowski.membershipsoftware.payment;

import com.marcinmajkowski.membershipsoftware.customer.Customer;
import org.springframework.data.rest.core.config.Projection;

import java.math.BigDecimal;
import java.util.Date;

@Projection(name = "payerAndMembershipPriceAndTimestamp", types = Payment.class)
public interface PayerAndMembershipPriceAndTimestampPaymentProjection {

    Long getId();

    Customer getPayer();

    BigDecimal getMembershipPrice();

    Date getTimestamp();
}
