package com.meuprojeto.telefone_agendamento.repository;

import com.meuprojeto.telefone_agendamento.model.Contato;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ContatoRepository extends JpaRepository<Contato, Long> {

    // Método para buscar por celular (verifica se já existe)
    Optional<Contato> findByContatoCelular(String contatoCelular);

    // Método para buscar contatos ativos e inativos (mesmo método pode ser usado para ambos)
    List<Contato> findByContatoSnAtivo(String contatoSnAtivo);

    // Método para buscar por favoritos
    List<Contato> findByContatoSnFavorito(String contatoSnFavorito);
}
