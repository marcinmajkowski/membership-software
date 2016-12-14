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

        if (payment == null) {
            errors.rejectValue("payment", "missing");
        } else if (payment.getCheckIns().size() == payment.getMembershipNumberOfTrainings()) {
            errors.rejectValue("payment", "paymentNumberOfTrainingsReached");
        }

        //TODO check checkIn date with payment range
    }
}
