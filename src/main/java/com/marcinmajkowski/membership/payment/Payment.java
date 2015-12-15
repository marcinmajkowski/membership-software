package com.marcinmajkowski.membership.payment;

import com.marcinmajkowski.membership.card.Card;
import com.marcinmajkowski.membership.enumeration.Channel;
import com.marcinmajkowski.membership.enumeration.CodeSource;
import com.marcinmajkowski.membership.membership.Membership;
import com.marcinmajkowski.membership.person.Person;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by Marcin on 12/12/2015.
 */
@Entity
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(nullable = false)
    private Date timestamp;

    @Column(nullable = false)
    private Date membershipStartDate;

    @ManyToOne(optional = false)
    private Membership membership;

    @ManyToOne(optional = false)
    private Card card;

    @ManyToOne(optional = false)
    private Person staffMember;

    @Enumerated(EnumType.STRING)
    private CodeSource codeSource;

    @Enumerated(EnumType.STRING)
    private Channel channel;

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public Date getMembershipStartDate() {
        return membershipStartDate;
    }

    public void setMembershipStartDate(Date membershipStartDate) {
        this.membershipStartDate = membershipStartDate;
    }

    public Membership getMembership() {
        return membership;
    }

    public void setMembership(Membership membership) {
        this.membership = membership;
    }

    public Card getCard() {
        return card;
    }

    public void setCard(Card card) {
        this.card = card;
    }

    public Person getStaffMember() {
        return staffMember;
    }

    public void setStaffMember(Person staffMember) {
        this.staffMember = staffMember;
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
}
