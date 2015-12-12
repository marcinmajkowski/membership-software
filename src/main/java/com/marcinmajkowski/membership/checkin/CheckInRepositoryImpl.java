package com.marcinmajkowski.membership.checkin;

import com.marcinmajkowski.membership.card.Card;
import com.marcinmajkowski.membership.card.CardRepository;
import com.marcinmajkowski.membership.person.Person;
import com.marcinmajkowski.membership.person.PersonRepository;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;
import java.util.List;

/**
 * Created by Marcin on 12/12/2015.
 */
public class CheckInRepositoryImpl implements CheckInRepositoryCustom {

    private static final Log logger = LogFactory.getLog(CheckInRepositoryImpl.class);

    @Autowired
    private CheckInRepository checkInRepository;

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private PersonRepository personRepository;

    @Override
    public CheckIn checkIn(String code, CheckIn.CodeSource codeSource) {
        Card card = cardRepository.findOne(code);

        List<Person> people = personRepository.findByLastName("Tokarski");
        Person staffMember = people.isEmpty() ? null : people.get(0);

        CheckIn checkIn = new CheckIn();
        checkIn.setCard(card);
        checkIn.setTimestamp(new Date());
        checkIn.setChannel(CheckIn.Channel.DESKTOP);
        checkIn.setCodeSource(codeSource);
        checkIn.setStaffMember(staffMember);

        checkInRepository.save(checkIn);

        logger.info("Checked in!");

        return checkIn;
    }
}
