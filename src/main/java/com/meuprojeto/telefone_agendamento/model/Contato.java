package com.meuprojeto.telefone_agendamento.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

@Entity
@Table(name = "contato", schema = "desafio")
public class Contato {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long contatoId;

    @NotNull
    @Size(max = 100)
    private String contatoNome;

    @NotNull
    @Size(max = 255)
    private String contatoEmail;

    @NotNull
    @Size(max = 11)
    private String contatoCelular;

    @Size(max = 10)
    private String contatoTelefone;

    @NotNull
    @Column(name = "contato_sn_favorito", columnDefinition = "CHAR(1) DEFAULT 'N'")
    private String contatoSnFavorito = "N"; // Padrão: Não favorito

    @NotNull
    @Column(name = "contato_sn_ativo", columnDefinition = "CHAR(1) DEFAULT 'S'")
    private String contatoSnAtivo = "S"; // Padrão: Ativo

    @Column(name = "contato_dh_cad", updatable = false)
    private LocalDateTime contatoDhCad = LocalDateTime.now(); // Define a data no momento da criação

    // Getters e Setters

    public Long getContatoId() {
        return contatoId;
    }

    public void setContatoId(Long contatoId) {
        this.contatoId = contatoId;
    }

    public String getContatoNome() {
        return contatoNome;
    }

    public void setContatoNome(String contatoNome) {
        this.contatoNome = contatoNome;
    }

    public String getContatoEmail() {
        return contatoEmail;
    }

    public void setContatoEmail(String contatoEmail) {
        this.contatoEmail = contatoEmail;
    }

    public String getContatoCelular() {
        return contatoCelular;
    }

    public void setContatoCelular(String contatoCelular) {
        this.contatoCelular = contatoCelular;
    }

    public String getContatoTelefone() {
        return contatoTelefone;
    }

    public void setContatoTelefone(String contatoTelefone) {
        this.contatoTelefone = contatoTelefone;
    }

    public String getContatoSnFavorito() {
        return contatoSnFavorito;
    }

    public void setContatoSnFavorito(String contatoSnFavorito) {
        this.contatoSnFavorito = contatoSnFavorito;
    }

    public String getContatoSnAtivo() {
        return contatoSnAtivo;
    }

    public void setContatoSnAtivo(String contatoSnAtivo) {
        this.contatoSnAtivo = contatoSnAtivo;
    }

    public LocalDateTime getContatoDhCad() {
        return contatoDhCad;
    }

    public void setContatoDhCad(LocalDateTime contatoDhCad) {
        this.contatoDhCad = contatoDhCad;
    }
}
