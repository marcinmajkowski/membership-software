package com.marcinmajkowski.membershipsoftware.membership;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

//TODO soft delete
@Entity
public class Membership {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    @NotNull
    private BigDecimal price;

    @NotNull
    private Integer durationInDays;

    @NotNull
    private Integer numberOfTrainings;

    protected Membership() {
    }

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
}
