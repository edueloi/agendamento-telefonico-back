package com.meuprojeto.telefone_agendamento.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.meuprojeto.telefone_agendamento.model.Contato;
import com.meuprojeto.telefone_agendamento.repository.ContatoRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/contatos")
public class ContatoController {

    @Autowired
    private ContatoRepository contatoRepository;

    // Listar todos os contatos
    @GetMapping
    public ResponseEntity<List<Contato>> getContatos() {
        List<Contato> contatos = contatoRepository.findAll();
        return ResponseEntity.ok(contatos);
    }

    // Verificar se o celular já está cadastrado
    @GetMapping("/verificar/{celular}")
    public ResponseEntity<String> verificarCadastro(@PathVariable String celular) {
        Optional<Contato> contatoExistente = contatoRepository.findByContatoCelular(celular);
        if (contatoExistente.isPresent()) {
            return ResponseEntity.badRequest().body("Já existe um contato cadastrado com esse número de celular.");
        }
        return ResponseEntity.ok("Contato pode ser cadastrado.");
    }

    // Adicionar um novo contato
    @PostMapping
    public ResponseEntity<Contato> adicionarContato(@RequestBody Contato contato) {
        System.out.println("Recebido: " + contato);

        Optional<Contato> contatoExistente = contatoRepository.findByContatoCelular(contato.getContatoCelular());
        if (contatoExistente.isPresent()) {
            return ResponseEntity.badRequest().build();
        }

        if (contato.getContatoNome() == null || contato.getContatoNome().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        contato.setContatoDhCad(LocalDateTime.now());
        Contato novoContato = contatoRepository.save(contato);
        return ResponseEntity.status(201).body(novoContato);
    }


    // Atualizar um contato existente
    @PutMapping("/{id}")
    public ResponseEntity<Contato> atualizarContato(@PathVariable Long id, @RequestBody Contato contatoAtualizado) {
        Optional<Contato> contatoExistente = contatoRepository.findById(id);

        if (contatoExistente.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Contato contato = contatoExistente.get();

        // Apenas atualiza os valores recebidos, mantendo os outros inalterados
        if (contatoAtualizado.getContatoNome() != null) {
            contato.setContatoNome(contatoAtualizado.getContatoNome());
        }
        if (contatoAtualizado.getContatoEmail() != null) {
            contato.setContatoEmail(contatoAtualizado.getContatoEmail());
        }
        if (contatoAtualizado.getContatoCelular() != null) {
            contato.setContatoCelular(contatoAtualizado.getContatoCelular());
        }
        if (contatoAtualizado.getContatoTelefone() != null) {
            contato.setContatoTelefone(contatoAtualizado.getContatoTelefone());
        }
        if (contatoAtualizado.getContatoSnFavorito() != null) {
            contato.setContatoSnFavorito(contatoAtualizado.getContatoSnFavorito());
        }
        if (contatoAtualizado.getContatoSnAtivo() != null) {
            contato.setContatoSnAtivo(contatoAtualizado.getContatoSnAtivo());
        }

        Contato updatedContato = contatoRepository.save(contato);
        return ResponseEntity.ok(updatedContato);
    }

    // Deletar um contato pelo ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarContato(@PathVariable Long id) {
        Optional<Contato> contatoExistente = contatoRepository.findById(id);
        if (contatoExistente.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        contatoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // Inativar um contato
    @PatchMapping("/inativar/{id}")
    public ResponseEntity<Contato> inativarContato(@PathVariable Long id) {
        Optional<Contato> contatoExistente = contatoRepository.findById(id);
        if (contatoExistente.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Contato contato = contatoExistente.get();
        contato.setContatoSnAtivo("N"); // Marca como inativo
        Contato updatedContato = contatoRepository.save(contato);
        return ResponseEntity.ok(updatedContato);
    }

    // Marcar um contato como favorito
    @PatchMapping("/favoritar/{id}")
    public ResponseEntity<Contato> marcarFavorito(@PathVariable Long id) {
        Optional<Contato> contatoExistente = contatoRepository.findById(id);
        if (contatoExistente.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Contato contato = contatoExistente.get();
        contato.setContatoSnFavorito("S"); // Marca como favorito
        Contato updatedContato = contatoRepository.save(contato);
        return ResponseEntity.ok(updatedContato);
    }

    // Buscar contatos ativos
    @GetMapping("/ativos")
    public ResponseEntity<List<Contato>> getContatosAtivos() {
        List<Contato> contatosAtivos = contatoRepository.findByContatoSnAtivo("S");
        return ResponseEntity.ok(contatosAtivos);
    }

    // Buscar contatos inativos
    @GetMapping("/inativos")
    public ResponseEntity<List<Contato>> getContatosInativos() {
        List<Contato> contatosInativos = contatoRepository.findByContatoSnAtivo("N");
        return ResponseEntity.ok(contatosInativos);
    }

    // Buscar contatos favoritos
    @GetMapping("/favoritos")
    public ResponseEntity<List<Contato>> getContatosFavoritos() {
        List<Contato> contatosFavoritos = contatoRepository.findByContatoSnFavorito("S");
        return ResponseEntity.ok(contatosFavoritos);
    }
}
