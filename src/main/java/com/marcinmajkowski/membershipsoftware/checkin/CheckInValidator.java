package com.marcinmajkowski.membershipsoftware.checkin;

import com.marcinmajkowski.membershipsoftware.payment.Payment;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

//FIXME when value is rejected, http response contains whole payment with payer, his cards e.t.c.
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
            errors.rejectValue("payment", "paymentNumberOfTrainingsReached");
        }

        //TODO check checkIn date with payment range
    }
}
