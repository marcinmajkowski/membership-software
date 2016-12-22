package com.marcinmajkowski.membershipsoftware.payment;

import com.marcinmajkowski.membershipsoftware.checkin.CheckIn;
import com.marcinmajkowski.membershipsoftware.customer.Customer;
import com.marcinmajkowski.membershipsoftware.membership.Membership;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Collection;
import java.util.Date;

@Entity
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date timestamp;

    /**
     * This is used to initialize membershipStartDate, membershipEndDate, membershipName and membershipPrice.
     * I copy them because membership is not immutable.
     */
    @ManyToOne
    private Membership membership;

    @Column(nullable = false)
    private Integer membershipDurationInDays;

    //TODO API should be able to create Payment from Membership
    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private Date membershipStartDate;

    //TODO could be value generated from start date and duration
    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private Date membershipEndDate;

    @Column(nullable = true)
    private String membershipName;

    @Column(nullable = false)
    private BigDecimal membershipPrice;

    /**
     * This is checkIns max size.
     */
    @Column(nullable = false)
    private Integer membershipNumberOfTrainings;

    //FIXME consider what should happen if payer gets deleted
    @ManyToOne(optional = false)
    private Customer payer;

    //TODO cascade?
    @OneToMany(mappedBy = "payment")
    private Collection<CheckIn> checkIns;

    protected Payment() {
    }

    public long getId() {
        return id;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public Membership getMembership() {
        return membership;
    }

    public void setMembership(Membership membership) {
        this.membership = membership;
    }

    public Integer getMembershipDurationInDays() {
        return membershipDurationInDays;
    }

    public void setMembershipDurationInDays(Integer membershipDurationInDays) {
        this.membershipDurationInDays = membershipDurationInDays;
    }

    public Date getMembershipStartDate() {
        return membershipStartDate;
    }

    public void setMembershipStartDate(Date membershipStartDate) {
        this.membershipStartDate = membershipStartDate;
    }

    public Date getMembershipEndDate() {
        return membershipEndDate;
    }

    public void setMembershipEndDate(Date membershipEndDate) {
        this.membershipEndDate = membershipEndDate;
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

    public Integer getMembershipNumberOfTrainings() {
        return membershipNumberOfTrainings;
    }

    public void setMembershipNumberOfTrainings(Integer membershipNumberOfTrainings) {
        this.membershipNumberOfTrainings = membershipNumberOfTrainings;
    }

    public Customer getPayer() {
        return payer;
    }

    public void setPayer(Customer payer) {
        this.payer = payer;
    }

    public Collection<CheckIn> getCheckIns() {
        return checkIns;
    }

    public void setCheckIns(Collection<CheckIn> checkIns) {
        this.checkIns = checkIns;
    }

    //TODO cover this with tests
    public int getCheckInsSize() {
        // handling null like that because of problems during serialization to json just after creating new payment
        return this.checkIns == null ? 0 : this.checkIns.size();
    }
}
