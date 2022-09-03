package org.example.cardgame.usecase.usecase;

import co.com.sofka.domain.generic.DomainEvent;
import org.example.cardgame.domain.events.JuegoCreado;
import org.example.cardgame.domain.events.JugadorAgregado;
import org.example.cardgame.domain.events.RondaTerminada;
import org.example.cardgame.domain.events.TiempoCambiadoDelTablero;
import org.example.cardgame.domain.values.*;
import org.example.cardgame.usecase.gateway.JuegoDomainEventRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import java.util.HashSet;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class DeterminarGanadorUseCaseTest {
    @Mock
    JuegoDomainEventRepository repository;
    @InjectMocks
    DeterminarGanadorUseCase useCase;
    @Test
    void determinarGanador() {
        //ARRANGE
        var event = new RondaTerminada(
                TableroId.of("SSS"),
                Set.of(
                        JugadorId.of("aaa")
                )
        );
        event.setAggregateRootId("XXXX");

        //Act & Assert
        when(repository.obtenerEventosPor("SSS"))
                .thenReturn(historico());

        StepVerifier
                .create(useCase.apply(Mono.just(event)))
                .expectNextMatches(domainEvent -> {
                    var event2 = (JuegoCreado) domainEvent;
                    return event2.aggregateRootId().equals("XXXX");
                })
                .expectComplete()
                .verify();
    }
    private Flux<DomainEvent> historico(){
        //juego
        var event = new JuegoCreado(JugadorId.of("aaa"));
        event.setAggregateRootId("XXXX");
        //jugador y mazo
        var event2 = new JugadorAgregado(
                JugadorId.of("TTT"),
                "Hernesto",
                new Mazo(Set.of(
                        new Carta(CartaMaestraId.of("111"), 5, true, true),
                        new Carta(CartaMaestraId.of("222"), 6, true, true),
                        new Carta(CartaMaestraId.of("333"), 7, true, true),
                        new Carta(CartaMaestraId.of("444"), 8, true, true),
                        new Carta(CartaMaestraId.of("555"), 9, true, true),
                        new Carta(CartaMaestraId.of("666"), 11, true, true)
                )
                )
        );
        return Flux.just(event, event2);
    }
}