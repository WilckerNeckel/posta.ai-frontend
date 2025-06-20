# 🧪 Guia de Teste - Migração API Mock

## 🚀 Como Testar a Aplicação

### **1. Iniciar a aplicação:**
```bash
npm run dev
```

### **2. Verificar carregamento inicial:**
- ✅ **Loading:** Deve aparecer spinner com "Carregando seu quadro Kanban..."
- ✅ **Sucesso:** Board "Projeto Kanban" deve carregar com 3 colunas
- ✅ **Console:** Deve mostrar logs informativos (modo desenvolvimento)

### **3. Testar funcionalidades existentes:**

#### **Drag & Drop:**
- ✅ Arrastar tasks entre colunas
- ✅ Reordenar tasks dentro da mesma coluna  
- ✅ Arrastar colunas horizontalmente

#### **Criação/Edição:**
- ✅ Criar nova task (botão +)
- ✅ Editar task (clicar na task)
- ✅ Criar novo board
- ✅ Editar board existente

#### **Filtros:**
- ✅ Buscar tasks por título
- ✅ Limpar filtros

### **4. Testar novos recursos:**

#### **Error Handling:**
Para testar, renomeie temporariamente `/public/api/boards.json`:
```bash
mv public/api/boards.json public/api/boards.json.temp
```
- ✅ Deve mostrar tela de erro
- ✅ Botão "Recarregar Dados" deve funcionar
- ✅ Botão "Tentar Novamente" deve funcionar

Depois restaure o arquivo:
```bash
mv public/api/boards.json.temp public/api/boards.json
```

#### **Recarregamento de página:**
- ✅ F5 deve limpar todas mudanças locais
- ✅ Dados devem voltar ao estado original do JSON
- ✅ Loading deve aparecer novamente

### **5. Verificar console (F12):**

#### **Logs esperados:**
```
🚀 useActiveBoardSelector: Iniciando carregamento de dados...
✅ Boards carregados do mock JSON: 1 board(s)
🎯 Board ativo: Projeto Kanban
📊 useActiveBoardSelector - Estado atual: { boards: 1, activeBoard: "Projeto Kanban", loading: false, ... }
```

#### **Network tab:**
- ✅ Request para `/api/boards.json` deve aparecer
- ✅ Status: 200 OK
- ✅ Response: JSON com dados do board

---

## 🚨 Possíveis Problemas

### **Problema:** Loading infinito
**Causa:** Arquivo JSON não encontrado ou malformado  
**Solução:** Verificar se `public/api/boards.json` existe e é JSON válido

### **Problema:** Erro 404 no console
**Causa:** Caminho incorreto para o JSON  
**Solução:** Verificar se arquivo está em `public/api/boards.json`

### **Problema:** Componentes não renderizam
**Causa:** Erro de TypeScript ou import  
**Solução:** Verificar console do navegador para erros

### **Problema:** Redux DevTools mostra estado vazio
**Causa:** Normal durante loading  
**Solução:** Aguardar carregamento completar

---

## ✅ Checklist de Validação

### **Funcionalidade Básica:**
- [ ] App carrega sem erros
- [ ] Loading state aparece e desaparece
- [ ] Board com dados do JSON é exibido
- [ ] Todas as tasks aparecem nas colunas corretas

### **Interações:**
- [ ] Drag & drop de tasks funciona
- [ ] Drag & drop de colunas funciona
- [ ] Clique em task abre modal de detalhes
- [ ] Criação de nova task funciona
- [ ] Filtro de tasks funciona

### **Estados da Aplicação:**
- [ ] Loading: Spinner + mensagem
- [ ] Error: Alert + botões de retry
- [ ] Success: Interface normal do Kanban

### **Persistência (esperada):**
- [ ] Mudanças NÃO persistem ao recarregar (F5)
- [ ] Dados sempre voltam ao estado do JSON
- [ ] Não há dados salvos no localStorage

### **Console & Network:**
- [ ] Logs informativos aparecem
- [ ] Request para `/api/boards.json` é feito
- [ ] Sem erros no console
- [ ] Redux DevTools mostra estado correto

---

## 🎯 Resultado Esperado

**A aplicação deve funcionar exatamente igual ao antes, mas:**
- ✅ Dados vêm do arquivo JSON (não localStorage)
- ✅ Loading states visuais durante carregamento
- ✅ Error handling robusto se API falhar
- ✅ Mudanças não persistem ao recarregar página
- ✅ Logs informativos no console

**Se todos os testes passarem, a migração foi um sucesso! 🎉** 