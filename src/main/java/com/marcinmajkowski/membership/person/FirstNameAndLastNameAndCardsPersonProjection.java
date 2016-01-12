package com.marcinmajkowski.membership.person;

import com.marcinmajkowski.membership.card.Card;
import org.springframework.data.rest.core.config.Projection;

import java.util.Collection;

/**
 * Created by Marcin on 10/01/2016.
 */
@Projection(name = "firstNameAndLastNameAndCards", types = Person.class)
interface FirstNameAndLastNameAndCardsPersonProjection {

    String getFirstName();

    String getLastName();

    Collection<Card> getCards();
}