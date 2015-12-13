package com.marcinmajkowski.membership.checkin;

import com.marcinmajkowski.membership.enumeration.CodeSource;

/**
 * Created by Marcin on 12/12/2015.
 */
public interface CheckInRepositoryCustom {

    CheckIn checkIn(String code, CodeSource codeSource);
}
