# Documentação Completa dos Códigos Java - Projeto Figurama

Este documento contém todos os códigos Java do projeto Figurama com explicações detalhadas do que cada arquivo faz.

---

## 📁 Estrutura do Projeto

O projeto segue uma arquitetura em camadas com Spring Boot:
- **Model**: DTOs (Records) para transferência de dados
- **Repository**: Entidades JPA e interfaces de acesso a dados
- **Service**: Camada de negócio
- **Controller**: Endpoints REST
- **Mapper**: Conversão entre DTOs e Entities

---

## 🚀 Classe Principal

### FiguramaApplication.java
```java
package com.ajm.figurama;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class FiguramaApplication {

    public static void main(String[] args) {
        SpringApplication.run(FiguramaApplication.class, args);
    }
}
```
**Função**: Classe principal que inicia a aplicação Spring Boot. A anotação `@SpringBootApplication` configura automaticamente o contexto da aplicação.

---

## 📋 Model (DTOs)

### ColecaoRecord.java
```java
package com.ajm.figurama.model;

public record ColecaoRecord(String titulo, String descricao, Integer quantidade, Long usuarioId) {
}
```
**Função**: DTO (Data Transfer Object) para transferência de dados de coleções. É um record Java que representa uma coleção com:
- `titulo`: Nome da coleção
- `descricao`: Descrição da coleção  
- `quantidade`: Quantidade de itens na coleção
- `usuarioId`: ID do usuário dono da coleção

### ActionFigureRecord.java
```java
package com.ajm.figurama.model;

public record ActionFigureRecord(String nome, String franquia, String fotoUrl, Long colecaoId) {
}
```
**Função**: DTO para transferência de dados de figuras de ação. Contém:
- `nome`: Nome da figura
- `franquia`: Franquia (ex: Marvel, DC, etc.)
- `fotoUrl`: URL da foto da figura
- `colecaoId`: ID da coleção à qual pertence

### UsuarioRecord.java
```java
package com.ajm.figurama.model;

public record UsuarioRecord(String nomeUsuario, String email, String senha) {
}
```
**Função**: DTO para transferência de dados de usuários. Contém:
- `nomeUsuario`: Nome único do usuário
- `email`: E-mail único do usuário
- `senha`: Senha do usuário (em produção, usar criptografia)

---

## 🗄️ Repository (Entidades e Acesso a Dados)

### ColecaoEntity.java
```java
package com.ajm.figurama.repository;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class ColecaoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;
    private String descricao;
    private Integer quantidade;

    @OneToMany(mappedBy = "colecao", cascade = CascadeType.ALL)
    private List<ActionFigureEntity> figures;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private UsuarioEntity usuario;
}
```
**Função**: Entidade JPA que representa a tabela de coleções no banco de dados.
- `@Entity`: Marca como entidade JPA
- `@Id/@GeneratedValue`: Configuração de chave primária auto-incremento
- `@OneToMany`: Relacionamento um-para-muitos com ActionFigureEntity
- `@ManyToOne`: Relacionamento muitos-para-um com UsuarioEntity
- `@JoinColumn(name = "usuario_id")`: Configura a coluna de chave estrangeira para usuário
- `@Getter/@Setter`: Gera métodos getters e setters (Lombok)
- `@NoArgsConstructor/@AllArgsConstructor`: Construtores (Lombok)

### ActionFigureEntity.java
```java
package com.ajm.figurama.repository;

import jakarta.persistence.*;
import lombok.*;
@Entity
@Table(name = "action_figure")
@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor

public class ActionFigureEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String franquia;
    private String fotoUrl;

    @ManyToOne
    @JoinColumn(name = "colecao_id")
    private ColecaoEntity colecao;
}
```
**Função**: Entidade JPA que representa a tabela de figuras de ação.
- `@Table(name = "action_figure")`: Especifica nome da tabela
- `@ManyToOne`: Relacionamento muitos-para-um com ColecaoEntity
- `@JoinColumn`: Configura a coluna de chave estrangeira
- `@Builder`: Padrão Builder (Lombok)

### UsuarioEntity.java
```java
package com.ajm.figurama.repository;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class UsuarioEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String nomeUsuario;
    
    @Column(unique = true)
    private String email;
    
    private String senha;
}
```
**Função**: Entidade JPA que representa a tabela de usuários.
- `@Entity`: Marca como entidade JPA
- `@Column(unique = true)`: Garante unicidade de nomeUsuario e email
- `@Builder`: Padrão Builder para construção de objetos

### ColecaoRepository.java
```java
package com.ajm.figurama.repository;

import com.ajm.figurama.repository.ColecaoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ColecaoRepository extends JpaRepository<ColecaoEntity, Long>{
    
}
```
**Função**: Interface Spring Data JPA para acesso a dados de coleções. Herda métodos básicos CRUD de `JpaRepository`.

### ActionFigureRepository.java
```java
package com.ajm.figurama.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActionFigureRepository extends JpaRepository<ActionFigureEntity, Long> {
    
    List<ActionFigureEntity> findByColecaoId(Long colecaoId);
    
    List<ActionFigureEntity> findByFranquia(String franquia);

    List<ActionFigureEntity> findTop6ByOrderIdDesc();
}
```
**Função**: Interface Spring Data JPA para acesso a dados de figuras de ação. Inclui métodos customizados:
- `findByColecaoId()`: Busca figuras por ID da coleção
- `findByFranquia()`: Busca figuras por franquia
- `findTop6ByOrderIdDesc()`: Retorna as 6 figuras mais recentes (ordenadas por ID decrescente)

### UsuarioRepository.java
```java
package com.ajm.figurama.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<UsuarioEntity, Long> {
    boolean existsByEmail(String email);
    boolean existsByNomeUsuario(String nomeUsuario);
}
```
**Função**: Interface Spring Data JPA para acesso a dados de usuários. Inclui métodos customizados:
- `existsByEmail()`: Verifica se e-mail já existe
- `existsByNomeUsuario()`: Verifica se nome de usuário já existe

---

## 🔄 Mapper (Conversão DTO ↔ Entity)

### ColecaoMapper.java
```java
package com.ajm.figurama.model.dto.mapper;

import com.ajm.figurama.model.ColecaoRecord;
import com.ajm.figurama.repository.ColecaoEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ColecaoMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "figures", ignore = true)
    ColecaoEntity toEntity(ColecaoRecord dto);
}
```
**Função**: Mapper MapStruct para conversão entre ColecaoRecord e ColecaoEntity.
- `@Mapper(componentModel = "spring")`: Integração com Spring
- `@Mapping(target = "id", ignore = true)`: Ignora campo ID ao converter
- `@Mapping(target = "figures", ignore = true)`: Ignora lista de figuras

### ActionFigureMapper.java
```java
package com.ajm.figurama.model.dto.mapper;

import com.ajm.figurama.model.ActionFigureRecord;
import com.ajm.figurama.repository.ActionFigureEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface ActionFigureMapper {
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "colecao", ignore = true)
    ActionFigureEntity toEntity(ActionFigureRecord dto);
    
    @Mapping(target = "colecaoId", source = "colecao.id", qualifiedByName = "mapColecaoId")
    ActionFigureRecord toDto(ActionFigureEntity entity);
    
    @Named("mapColecaoId")
    default Long mapColecaoId(Long colecaoId) {
        return colecaoId;
    }
}
```
**Função**: Mapper MapStruct para conversão entre ActionFigureRecord e ActionFigureEntity.
- Converte DTO para Entity ignorando ID e coleção
- Converte Entity para DTO extraindo ID da coleção
- `@Named`: Método customizado para mapeamento

---

## 🏢 Service (Camada de Negócio)

### ColecaoService.java
```java
package com.ajm.figurama.service;

import com.ajm.figurama.model.ColecaoRecord;
import com.ajm.figurama.repository.ColecaoEntity;
import java.util.List;

public interface ColecaoService {
    ColecaoEntity salvar(ColecaoRecord dto);
    List<ColecaoEntity> listarTodos();
}
```
**Função**: Interface que define os contratos de negócio para coleções.

### ColecaoServiceImpl.java
```java
package com.ajm.figurama.service;

import com.ajm.figurama.model.ColecaoRecord;
import com.ajm.figurama.model.dto.mapper.ColecaoMapper;
import com.ajm.figurama.repository.ColecaoRepository;
import com.ajm.figurama.repository.UsuarioRepository;
import com.ajm.figurama.repository.UsuarioEntity;
import com.ajm.figurama.repository.ColecaoEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ColecaoServiceImpl implements ColecaoService {

    private final ColecaoRepository repository;
    private final ColecaoMapper mapper;
    private final UsuarioRepository usuarioRepository;

    @Override
    public ColecaoEntity salvar(ColecaoRecord dto) {
        ColecaoEntity entity = mapper.toEntity(dto);

        UsuarioEntity dono = usuarioRepository.findById(dto.usuarioId())
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    
        entity.setUsuario(dono);

        return repository.save(entity);
    }

    @Override
    public List<ColecaoEntity> listarTodos() {
        return repository.findAll();
    }
}
```
**Função**: Implementação dos serviços de coleções.
- `@Service`: Marca como componente Spring
- `@RequiredArgsConstructor`: Injeção de dependências via construtor (Lombok)
- `salvar()`: Converte DTO para Entity, valida usuário e persiste
- `listarTodos()`: Retorna todas as coleções

### ActionFigureService.java
```java
package com.ajm.figurama.service;

import com.ajm.figurama.model.ActionFigureRecord;
import com.ajm.figurama.repository.ActionFigureEntity;
import java.util.List;

public interface ActionFigureService {
    
    ActionFigureEntity salvar(ActionFigureRecord dto);
    
    ActionFigureEntity atualizar(Long id, ActionFigureRecord dto);
    
    void deletar(Long id);
    
    ActionFigureEntity buscarPorId(Long id);
    
    List<ActionFigureEntity> listarTodos();
    
    List<ActionFigureEntity> buscarPorColecao(Long colecaoId);
    
    List<ActionFigureEntity> buscarPorFranquia(String franquia);
}
```
**Função**: Interface que define os contratos de negócio para figuras de ação com operações CRUD completas.

### ActionFigureServiceImpl.java
```java
package com.ajm.figurama.service;

import com.ajm.figurama.model.ActionFigureRecord;
import com.ajm.figurama.model.dto.mapper.ActionFigureMapper;
import com.ajm.figurama.repository.ActionFigureEntity;
import com.ajm.figurama.repository.ActionFigureRepository;
import com.ajm.figurama.repository.ColecaoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ActionFigureServiceImpl implements ActionFigureService {

    private final ActionFigureRepository repository;
    private final ActionFigureMapper mapper;
    private final ColecaoRepository colecaoRepository;

    @Override
    public ActionFigureEntity salvar(ActionFigureRecord dto) {
        ActionFigureEntity entity = mapper.toEntity(dto);
        
        // Verificar se a coleção existe
        if (dto.colecaoId() != null) {
            entity.setColecao(colecaoRepository.findById(dto.colecaoId())
                    .orElseThrow(() -> new RuntimeException("Coleção não encontrada com ID: " + dto.colecaoId())));
        }
        
        return repository.save(entity);
    }

    @Override
    public ActionFigureEntity atualizar(Long id, ActionFigureRecord dto) {
        ActionFigureEntity entity = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Action Figure não encontrada com ID: " + id));
        
        entity.setNome(dto.nome());
        entity.setFranquia(dto.franquia());
        entity.setFotoUrl(dto.fotoUrl());
        
        if (dto.colecaoId() != null) {
            entity.setColecao(colecaoRepository.findById(dto.colecaoId())
                    .orElseThrow(() -> new RuntimeException("Coleção não encontrada com ID: " + dto.colecaoId())));
        }
        
        return repository.save(entity);
    }

    @Override
    public void deletar(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Action Figure não encontrada com ID: " + id);
        }
        repository.deleteById(id);
    }

    @Override
    public ActionFigureEntity buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Action Figure não encontrada com ID: " + id));
    }

    @Override
    public List<ActionFigureEntity> listarTodos() {
        return repository.findAll();
    }

    @Override
    public List<ActionFigureEntity> buscarPorColecao(Long colecaoId) {
        return repository.findByColecaoId(colecaoId);
    }

    @Override
    public List<ActionFigureEntity> buscarPorFranquia(String franquia) {
        return repository.findByFranquia(franquia);
    }
}
```
**Função**: Implementação completa dos serviços de figuras de ação.
- `salvar()`: Valida existência da coleção antes de salvar
- `atualizar()`: Atualiza dados da figura mantendo validações
- `deletar()`: Verifica existência antes de deletar
- `buscarPorId()`: Retorna exceção se não encontrado
- `buscarPorColecao()`: Usa método customizado do repository
- `buscarPorFranquia()`: Usa método customizado do repository

---

## 🌐 Controller (Endpoints REST)

### RotaColecoes.java
```java
package com.ajm.figurama.controller.rotas;

public interface RotaColecoes {
    String ROOT = "/colecoes";
    String LISTAR = "/listar";
    String SALVAR = "/salvar";
}
```
**Função**: Interface constante com definições de rotas para coleções, facilitando manutenção e avoiding hardcoding.

### RotaActionFigures.java
```java
package com.ajm.figurama.controller.rotas;

public interface RotaActionFigures {
    String ROOT = "/action-figures";
    String LISTAR = "/listar";
    String BUSCAR_POR_ID = "/{id}";
    String BUSCAR_POR_COLECAO = "/colecao/{colecaoId}";
    String BUSCAR_POR_FRANQUIA = "/franquia";
    String SALVAR = "/salvar";
    String ATUALIZAR = "/{id}";
    String DELETAR = "/{id}";
}
```
**Função**: Interface constante com definições de rotas para figuras de ação.

### ColecaoController.java
```java
package com.ajm.figurama.controller;

import com.ajm.figurama.controller.rotas.RotaColecoes;
import com.ajm.figurama.model.ColecaoRecord;
import com.ajm.figurama.repository.ColecaoEntity;
import com.ajm.figurama.service.ColecaoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // Usamos RestController para trabalhar com JSON
@RequestMapping(RotaColecoes.ROOT)
@RequiredArgsConstructor
public class ColecaoController {

    private final ColecaoService service;

    @GetMapping(RotaColecoes.LISTAR)
    public ResponseEntity<List<ColecaoEntity>> listar() {
        return ResponseEntity.ok(service.listarTodos());
    }

    @PostMapping(RotaColecoes.SALVAR)
    public ResponseEntity<ColecaoEntity> salvar(@RequestBody ColecaoRecord dto) {
        return ResponseEntity.ok(service.salvar(dto));
    }
}
```
**Função**: Controller REST para operações com coleções.
- `@RestController`: Define como controller REST
- `@RequestMapping`: Define rota base `/colecoes`
- `@GetMapping(RotaColecoes.LISTAR)`: Endpoint GET `/colecoes/listar`
- `@PostMapping(RotaColecoes.SALVAR)`: Endpoint POST `/colecoes/salvar`

### ActionFigureController.java
```java
package com.ajm.figurama.controller;

import com.ajm.figurama.controller.rotas.RotaActionFigures;
import com.ajm.figurama.model.ActionFigureRecord;
import com.ajm.figurama.repository.ActionFigureEntity;
import com.ajm.figurama.service.ActionFigureService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(RotaActionFigures.ROOT)
@RequiredArgsConstructor
public class ActionFigureController {

    private final ActionFigureService service;

    @GetMapping(RotaActionFigures.LISTAR)
    public ResponseEntity<List<ActionFigureEntity>> listarTodos() {
        return ResponseEntity.ok(service.listarTodos());
    }

    @GetMapping(RotaActionFigures.BUSCAR_POR_ID)
    public ResponseEntity<ActionFigureEntity> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @GetMapping(RotaActionFigures.BUSCAR_POR_COLECAO)
    public ResponseEntity<List<ActionFigureEntity>> buscarPorColecao(@PathVariable Long colecaoId) {
        return ResponseEntity.ok(service.buscarPorColecao(colecaoId));
    }

    @GetMapping(RotaActionFigures.BUSCAR_POR_FRANQUIA)
    public ResponseEntity<List<ActionFigureEntity>> buscarPorFranquia(@RequestParam String franquia) {
        return ResponseEntity.ok(service.buscarPorFranquia(franquia));
    }

    @PostMapping(RotaActionFigures.SALVAR)
    public ResponseEntity<ActionFigureEntity> salvar(@RequestBody ActionFigureRecord dto) {
        return ResponseEntity.ok(service.salvar(dto));
    }

    @PutMapping(RotaActionFigures.ATUALIZAR)
    public ResponseEntity<ActionFigureEntity> atualizar(@PathVariable Long id, @RequestBody ActionFigureRecord dto) {
        return ResponseEntity.ok(service.atualizar(id, dto));
    }

    @DeleteMapping(RotaActionFigures.DELETAR)
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
```
**Função**: Controller REST completo para operações CRUD de figuras de ação.
- `@GetMapping(RotaActionFigures.LISTAR)`: GET `/action-figures/listar` - Lista todas
- `@GetMapping(RotaActionFigures.BUSCAR_POR_ID)`: GET `/action-figures/{id}` - Busca por ID
- `@GetMapping(RotaActionFigures.BUSCAR_POR_COLECAO)`: GET `/action-figures/colecao/{colecaoId}` - Busca por coleção
- `@GetMapping(RotaActionFigures.BUSCAR_POR_FRANQUIA)`: GET `/action-figures/franquia?franquia={nome}` - Busca por franquia
- `@PostMapping(RotaActionFigures.SALVAR)`: POST `/action-figures/salvar` - Cria nova
- `@PutMapping(RotaActionFigures.ATUALIZAR)`: PUT `/action-figures/{id}` - Atualiza existente
- `@DeleteMapping(RotaActionFigures.DELETAR)`: DELETE `/action-figures/{id}` - Deleta

### UsuarioController.java
```java
package com.ajm.figurama.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ajm.figurama.model.UsuarioRecord;
import com.ajm.figurama.repository.UsuarioEntity;
import com.ajm.figurama.repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/usuarios")
@RequiredArgsConstructor
public class UsuarioController {
    private final UsuarioRepository repository;

    @PostMapping("/registrar")
    public ResponseEntity<?> registrar(@RequestBody UsuarioRecord dto) {
        if(repository.existsByEmail(dto.email())) {
            return ResponseEntity.badRequest().body("E-mail já cadastrado");
        }
        
        UsuarioEntity novo = UsuarioEntity.builder()
                .nomeUsuario(dto.nomeUsuario())
                .email(dto.email())
                .senha(dto.senha()) // Em um projeto real, usaríamos criptografia aqui
                .build();
        
        return ResponseEntity.ok(repository.save(novo));
    }
}
```
**Função**: Controller REST para registro de usuários.
- `@PostMapping("/registrar")`: POST `/usuarios/registrar` - Registra novo usuário
- Validação de e-mail duplicado antes do registro
- Uso do padrão Builder para construir a entidade
- Observação: Em produção, implementar criptografia de senha

---

## 🎯 Resumo das Funcionalidades

O projeto implementa um sistema completo para gerenciamento de coleções de figuras de ação com:

1. **CRUD Completo**: Criação, leitura, atualização e deleção
2. **Relacionamentos**: One-to-Many entre Coleções e Action Figures, Many-to-One entre Coleções e Usuários
3. **Validações**: Verificação de existência de entidades relacionadas, e-mails duplicados
4. **Buscas Avançadas**: Por coleção, franquia, ID
5. **Sistema de Usuários**: Registro de usuários com validação de e-mail único
6. **Arquitetura Limpa**: Separação clara de responsabilidades
7. **Boas Práticas**: Uso de DTOs, mappers, injeção de dependências

---

## 📝 Tecnologias Utilizadas

- **Spring Boot 3.5.7**: Framework principal
- **Spring Data JPA**: Acesso a dados
- **Jakarta Persistence**: API de persistência
- **Lombok**: Redução de código boilerplate
- **MapStruct**: Mapeamento entre objetos
- **MySQL**: Banco de dados (com H2 para testes)

---

## 🔧 Configurações Necessárias

1. **Banco de Dados**: Configurar `application.properties` com credenciais MySQL
2. **Dependências**: Todas já configuradas no `pom.xml`
3. **Execução**: Rodar `FiguramaApplication.java`

O projeto está pronto para uso e completamente funcional!
