package com.marcinmajkowski.membership.checkin;

/**
 * Created by Marcin on 12/12/2015.
 */
public interface CheckInRepositoryCustom {

    CheckIn checkIn(String code, CheckIn.CodeSource codeSource);
}
