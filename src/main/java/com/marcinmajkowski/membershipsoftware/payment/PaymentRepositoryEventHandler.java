package com.marcinmajkowski.membershipsoftware.payment;

import com.marcinmajkowski.membershipsoftware.membership.Membership;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.stereotype.Component;

import java.util.Calendar;
import java.util.Date;

@Component
@RepositoryEventHandler
public class PaymentRepositoryEventHandler {

    //TODO if client tried to set incorrect data, throw exception
    @HandleBeforeCreate
    public void handleBeforeCreate(Payment payment) {
        Membership membership = payment.getMembership();

        //TODO ensure timezone correctness e.t.c.
        // Membership end date is membership start date + membership duration in days
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(payment.getMembershipStartDate());
        calendar.add(Calendar.DATE, membership.getDurationInDays() - 1);
        Date membershipEndDate = calendar.getTime();

        payment.setTimestamp(new Date());
        payment.setMembershipDurationInDays(membership.getDurationInDays());
        payment.setMembershipEndDate(membershipEndDate);
        payment.setMembershipName(membership.getName());
        payment.setMembershipPrice(membership.getPrice());
        payment.setMembershipNumberOfTrainings(membership.getNumberOfTrainings());
    }
}
