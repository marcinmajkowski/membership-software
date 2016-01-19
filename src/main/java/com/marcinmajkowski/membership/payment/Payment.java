package com.marcinmajkowski.membership.payment;

import com.marcinmajkowski.membership.card.Card;
import com.marcinmajkowski.membership.enumeration.Channel;
import com.marcinmajkowski.membership.enumeration.CodeSource;
import com.marcinmajkowski.membership.membership.Membership;
import com.marcinmajkowski.membership.person.Person;
import com.marcinmajkowski.membership.user.User;

import javax.persistence.*;
import java.math.BigDecimal;
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

    @Column(nullable = false)
    private String membershipName;

    @Column(nullable = false)
    private BigDecimal membershipPrice;

    @Column(nullable = false)
    private Integer membershipDurationInDays;

    @Column(nullable = false)
    private Integer membershipNumberOfTrainings;

    @ManyToOne(optional = false)
    private Person payee;

    @ManyToOne(optional = false)
    private User staffMember;

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

    public String getMembershipName() {
        return membershipName;
    }

    public void setMembershipName(String membershipName) {
        this.membershipName = membershipName;
    }

    public BigDecimal getMembershipPrice() {
        return membershipPrice;
    }

    public void setMembershipPrice(BigDecimal membershipPrice) {
        this.membershipPrice = membershipPrice;
    }

    public Integer getMembershipDurationInDays() {
        return membershipDurationInDays;
    }

    public void setMembershipDurationInDays(Integer membershipDurationInDays) {
        this.membershipDurationInDays = membershipDurationInDays;
    }

    public Integer getMembershipNumberOfTrainings() {
        return membershipNumberOfTrainings;
    }

    public void setMembershipNumberOfTrainings(Integer membershipNumberOfTrainings) {
        this.membershipNumberOfTrainings = membershipNumberOfTrainings;
    }

    public Person getPayee() {
        return payee;
    }

    public void setPayee(Person payee) {
        this.payee = payee;
    }

    public User getStaffMember() {
        return staffMember;
    }

    public void setStaffMember(User staffMember) {
        this.staffMember = staffMember;
    }
}
