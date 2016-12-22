package com.marcinmajkowski.membershipsoftware.checkin;

import com.marcinmajkowski.membershipsoftware.payment.Payment;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

public class CheckInValidator implements Validator {

    @Override
    public boolean supports(Class<?> aClass) {
        return CheckIn.class.equals(aClass);
    }

    @Override
    public void validate(Object o, Errors errors) {
        CheckIn checkIn = (CheckIn) o;
        Payment payment = checkIn.getPayment();

        if (payment != null
                && payment.getMembershipNumberOfTrainings() >= 0
                && payment.getCheckIns().size() >= payment.getMembershipNumberOfTrainings()) {

            //TODO currently, spring-data-rest exception handler will not show the message in the response
            //TODO https://jira.spring.io/browse/DATAREST-832?filter=-3
            // Using reject instead of rejectValue because otherwise payment will be included in the response as
            // "invalidValue" property. Since that serialization would not be aware of spring-data-rest, it would
            // contain circular references leading to stack overflow.
            errors.reject("payment NumberOfTrainingsReached");
        }

        //TODO check checkIn date with payment range
    }
}
