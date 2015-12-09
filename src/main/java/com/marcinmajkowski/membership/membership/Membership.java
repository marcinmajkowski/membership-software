package com.marcinmajkowski.membership.membership;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.math.BigDecimal;

/**
 * Created by Marcin on 08/12/2015.
 */
@Entity
public class Membership {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private BigDecimal price;
    private Integer duration;
    private Integer timesPerWeek;

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public Integer getTimesPerWeek() {
        return timesPerWeek;
    }

    public void setTimesPerWeek(Integer timesPerWeek) {
        this.timesPerWeek = timesPerWeek;
    }
}
