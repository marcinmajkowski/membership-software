package com.marcinmajkowski.membership.payment;

import com.marcinmajkowski.membership.person.Person;
import org.springframework.data.rest.core.config.Projection;

import java.math.BigDecimal;
import java.util.Date;

/**
 * Created by Marcin on 24/01/2016.
 */
@Projection(name = "payerAndMembershipPriceAndTimestamp", types = Payment.class)
public interface PayerAndMembershipPriceAndTimestampPaymentProjection {

    Person getPayer();

    BigDecimal getMembershipPrice();

    Date getTimestamp();
}
