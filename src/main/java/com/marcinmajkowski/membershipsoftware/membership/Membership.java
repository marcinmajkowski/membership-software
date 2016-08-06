package com.marcinmajkowski.membershipsoftware.membership;

import com.marcinmajkowski.membershipsoftware.user.User;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
public class Membership {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(nullable = false)
    private Integer durationInDays;

    @Column(nullable = false)
    private Integer numberOfTrainings;

    @ManyToOne(optional = false)
    private User staffMember;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getDurationInDays() {
        return durationInDays;
    }

    public void setDurationInDays(Integer durationInDays) {
        this.durationInDays = durationInDays;
    }

    public Integer getNumberOfTrainings() {
        return numberOfTrainings;
    }

    public void setNumberOfTrainings(Integer numberOfTrainings) {
        this.numberOfTrainings = numberOfTrainings;
    }

    public User getStaffMember() {
        return staffMember;
    }

    public void setStaffMember(User staffMember) {
        this.staffMember = staffMember;
    }
}
