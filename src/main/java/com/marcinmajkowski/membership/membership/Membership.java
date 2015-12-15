package com.marcinmajkowski.membership.membership;

import javax.persistence.*;
import java.math.BigDecimal;

/**
 * Created by Marcin on 08/12/2015.
 */
@Entity
public class Membership {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(nullable = false)
    private Integer duration;

    @Column
    private Integer timesPerWeek;

    @Column(nullable = false)
    private Boolean isOpen;

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

    public Boolean getOpen() {
        return isOpen;
    }

    public void setOpen(Boolean open) {
        isOpen = open;
    }
}
