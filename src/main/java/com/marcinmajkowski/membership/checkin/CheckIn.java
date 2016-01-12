package com.marcinmajkowski.membership.checkin;

import com.marcinmajkowski.membership.card.Card;
import com.marcinmajkowski.membership.enumeration.Channel;
import com.marcinmajkowski.membership.enumeration.CodeSource;
import com.marcinmajkowski.membership.person.Person;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by Marcin on 12/12/2015.
 */
@Entity
public class CheckIn {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(nullable = false)
    private Date timestamp;

    @ManyToOne(optional = true)
    private Card card;

    @ManyToOne(optional = false)
    private Person person;

    @Enumerated(EnumType.STRING)
    private CodeSource codeSource;

    @Enumerated(EnumType.STRING)
    private Channel channel;

    @ManyToOne(optional = false)
    private Person staffMember;

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public Card getCard() {
        return card;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public void setCard(Card card) {
        this.card = card;
    }

    public CodeSource getCodeSource() {
        return codeSource;
    }

    public void setCodeSource(CodeSource codeSource) {
        this.codeSource = codeSource;
    }

    public Channel getChannel() {
        return channel;
    }

    public void setChannel(Channel channel) {
        this.channel = channel;
    }

    public Person getStaffMember() {
        return staffMember;
    }

    public void setStaffMember(Person staffMember) {
        this.staffMember = staffMember;
    }
}
