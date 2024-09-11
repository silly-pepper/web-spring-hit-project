package com.itmo.web.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;


@Getter @Setter
@NoArgsConstructor
@Entity
@Table(name = "hits")
public class Hit implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(nullable = false)
    private double x;
    @Column(nullable = false)
    private double y;
    @Column(nullable = false)
    private double r;
    @Column(nullable = false)
    private boolean result;
    @Column(nullable = false)
    private LocalDateTime dateTime;
    @Column(nullable = false)
    private Long executionTime;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @PrePersist
    public void prePersist(){
        executionTime =  System.nanoTime()-executionTime;
    }

    @Override
    public String toString() {
        return "Hit{" +
                "id=" + id +
                ", xValue=" + x +
                ", yValue=" + y +
                ", rValue=" + r +
                ", result=" + result +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Hit hit = (Hit) o;
        return id == hit.id && Double.compare(hit.x, x) == 0 && Double.compare(hit.y, y) == 0 && Double.compare(hit.r, r) == 0 && result == hit.result;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, x, y, r, result);
    }
}
