package com.meuprojeto.telefone_agendamento.controller;

import com.meuprojeto.telefone_agendamento.model.Contato;
import com.meuprojeto.telefone_agendamento.repository.ContatoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ContatoControllerTest {

    @Mock
    private ContatoRepository contatoRepository;

    @InjectMocks
    private ContatoController contatoController;

    private Contato contato;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        contato = new Contato();
        contato.setContatoId(1L);
        contato.setContatoNome("João Silva");
        contato.setContatoEmail("joao.silva@exemplo.com");
        contato.setContatoCelular("123456789");
        contato.setContatoTelefone("987654321");
        contato.setContatoSnFavorito("N");
        contato.setContatoSnAtivo("S");
    }

    @Test
    void deveRetornarListaDeContatos() {
        when(contatoRepository.findAll()).thenReturn(List.of(contato));

        ResponseEntity<List<Contato>> response = contatoController.getContatos();

        assertEquals(200, response.getStatusCodeValue());
        assertNotNull(response.getBody());
        assertEquals(1, response.getBody().size());
    }

    @Test
    void deveAdicionarContatoComSucesso() {
        when(contatoRepository.findByContatoCelular(contato.getContatoCelular())).thenReturn(Optional.empty());
        when(contatoRepository.save(any(Contato.class))).thenReturn(contato);

        ResponseEntity<Contato> response = contatoController.adicionarContato(contato);

        assertEquals(201, response.getStatusCodeValue());
        assertNotNull(response.getBody());
        assertEquals("João Silva", response.getBody().getContatoNome());
    }

    @Test
    void naoDeveAdicionarContatoSeCelularJaExiste() {
        when(contatoRepository.findByContatoCelular(contato.getContatoCelular())).thenReturn(Optional.of(contato));

        ResponseEntity<Contato> response = contatoController.adicionarContato(contato);

        assertEquals(400, response.getStatusCodeValue());
        assertFalse(response.hasBody());
    }

    @Test
    void deveAtualizarContatoExistente() {
        when(contatoRepository.findById(1L)).thenReturn(Optional.of(contato));
        when(contatoRepository.save(any(Contato.class))).thenReturn(contato);

        ResponseEntity<Contato> response = contatoController.atualizarContato(1L, contato);

        assertEquals(200, response.getStatusCodeValue());
        assertNotNull(response.getBody());
        assertEquals("João Silva", response.getBody().getContatoNome());
    }

    @Test
    void deveInativarContato() {
        when(contatoRepository.findById(1L)).thenReturn(Optional.of(contato));
        when(contatoRepository.save(any(Contato.class))).thenReturn(contato);

        ResponseEntity<Contato> response = contatoController.inativarContato(1L);

        assertEquals(200, response.getStatusCodeValue());
        assertNotNull(response.getBody());
        assertEquals("N", response.getBody().getContatoSnAtivo());
    }

    @Test
    void deveMarcarContatoComoFavorito() {
        when(contatoRepository.findById(1L)).thenReturn(Optional.of(contato));
        when(contatoRepository.save(any(Contato.class))).thenReturn(contato);

        ResponseEntity<Contato> response = contatoController.marcarFavorito(1L);

        assertEquals(200, response.getStatusCodeValue());
        assertNotNull(response.getBody());
        assertEquals("S", response.getBody().getContatoSnFavorito());
    }
}
