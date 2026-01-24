package com.ajm.figurama.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FileStorageService {
    
    @Value("${file.upload-dir:uploads}")
    private String uploadDir;
    
    private final Path fileStorageLocation;
    
    public FileStorageService(@Value("${file.upload-dir:uploads}") String uploadDir) {
        this.fileStorageLocation = Paths.get(uploadDir)
                .toAbsolutePath()
                .normalize();
        
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new RuntimeException("Não foi possível criar o diretório de upload!", ex);
        }
    }
    
    /**
     * Salva um arquivo e retorna o caminho relativo
     */
    public String salvarArquivo(MultipartFile file) {
        if (file.isEmpty()) {
            throw new RuntimeException("Arquivo vazio!");
        }
        
        // Validar tipo de arquivo
        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new RuntimeException("Apenas imagens são permitidas!");
        }
        
        // Gerar nome único para o arquivo
        String nomeOriginal = StringUtils.cleanPath(file.getOriginalFilename());
        String extensao = nomeOriginal.substring(nomeOriginal.lastIndexOf("."));
        String nomeUnico = UUID.randomUUID().toString() + extensao;
        
        try {
            // Salvar arquivo
            Path targetLocation = this.fileStorageLocation.resolve(nomeUnico);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            
            // Retornar caminho relativo
            return "/uploads/" + nomeUnico;
            
        } catch (IOException ex) {
            throw new RuntimeException("Erro ao salvar arquivo: " + nomeUnico, ex);
        }
    }
    
    /**
     * Deleta um arquivo pelo caminho
     */
    public void deletarArquivo(String caminhoArquivo) {
        if (caminhoArquivo == null || caminhoArquivo.isEmpty()) {
            return;
        }
        
        try {
            // Remover /uploads/ do caminho
            String nomeArquivo = caminhoArquivo.replace("/uploads/", "");
            Path filePath = this.fileStorageLocation.resolve(nomeArquivo).normalize();
            Files.deleteIfExists(filePath);
        } catch (IOException ex) {
            throw new RuntimeException("Erro ao deletar arquivo: " + caminhoArquivo, ex);
        }
    }
}