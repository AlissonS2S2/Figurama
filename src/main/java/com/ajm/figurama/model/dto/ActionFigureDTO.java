package com.ajm.figurama.model.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ActionFigureDTO {
    private Long id;
    private String nome;
    private String descricao;
    private Boolean ativo;
    private String categoria;
    private String anoLancamento;
    private String franquia;
    private String urlFoto;
    private ColecaoDTO colecao;
    
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ColecaoDTO {
        private Long id;
        private String titulo;
        private String descricao;
        private java.time.LocalDateTime dataCriacao;
        private UsuarioDTO usuario;
    }
    
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class UsuarioDTO {
        private Long id;
        private String nomeUsuario;
        private String email;
    }
}
