package com.marcinmajkowski.membershipsoftware.payment;

import com.marcinmajkowski.membershipsoftware.checkin.CheckIn;
import com.marcinmajkowski.membershipsoftware.customer.Customer;
import com.marcinmajkowski.membershipsoftware.user.User;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.Set;

/**
 * Created by Marcin on 12/12/2015.
 */
@Entity
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date timestamp;

    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private Date membershipStartDate;

    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private Date membershipEndDate;

    @Column(nullable = false)
    private String membershipName;

    @Column(nullable = false)
    private BigDecimal membershipPrice;

    @Column(nullable = false)
    private Integer membershipNumberOfTrainings;

    @ManyToOne(optional = false)
    private Customer payer;

    @ManyToOne(optional = false)
    private User staffMember;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "payment")
    private Set<CheckIn> checkIns;

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

    public User getStaffMember() {
        return staffMember;
    }

    public void setStaffMember(User staffMember) {
        this.staffMember = staffMember;
    }

    public Set<CheckIn> getCheckIns() {
        return checkIns;
    }

    public void setCheckIns(Set<CheckIn> checkIns) {
        this.checkIns = checkIns;
    }
}
