# [TaskFlow - Responsive SaaS Interface](https://task-flow-saas-dashboard-ui.vercel.app/)

Interface moderna de dashboard inspirada em produtos SaaS reais, com foco em responsividade, acessibilidade e organização arquitetural de CSS.

---

## 🧠 Visão Geral

Este projeto foi desenvolvido para demonstrar boas práticas de front-end aplicadas a interfaces administrativas.

Ele simula uma página real de produto, resolvendo desafios comuns como:
- Sidebar responsiva
- Layouts complexos com CSS Grid
- Navegação acessível
- Estrutura escalável de estilos

Ideal para portfólio profissional e estudos avançados de UI/UX.

---

## 🎨 Principais Features

- Sidebar responsiva (aside no desktop, header no mobile)
- Layout baseado em `grid-template-areas`
- Menu acessível (ARIA + navegação por teclado)
- Abordagem mobile-first
- CSS organizado por contexto e componente
- Design system com variáveis CSS

---

## 🧩 Arquitetura & Decisões Técnicas

### Grid + Template Areas
Utilizado para separar claramente:
- Sidebar
- Conteúdo principal
- Header

Isso melhora legibilidade, manutenção e evolução do layout.

### Separação de Componentes
- `dashboard/` -> layout estrutural
- `components/menu` -> navegação reutilizável
- `base/` -> tokens e estilos globais

### Responsividade
- Desktop: sidebar fixa lateral
- Mobile: sidebar vira header com toggle
- Breakpoints bem definidos e sem hacks

### Acessibilidade
- Navegação completa por teclado
- Uso consciente de ARIA (sem ARIA fake)
- Estados de foco visíveis
- Sem elementos interativos desnecessários

---

## 🛠️ Tecnologias Utilizadas

- HTML5 semântico
- CSS Grid & Flexbox
- CSS Variables (Design Tokens)
- JavaScript Vanilla
- Vercel (deploy)

---

## 🚀 Demo

🔗 https://task-flow-saas-dashboard-ui.vercel.app/

---

## 📦 Como rodar localmente

```
git clone https://github.com/UelintonHJ/TaskFlow-saas-dashboard-ui.git
cd TaskFlow-saas-dashboard-ui
```
Abra o index.html no navegador
_(não há build step)_

---

## 📱 Responsividade

* **Mobile**: header fixo com menu toggle
* **Tablet**: layout adaptativo fluido
* **Desktop**: sidebar lateral persistente

---

## ♿ Acessibilidade

* Tab navigation funcional
* ESC fecha menus
* ARIA apenas quando necessário
* Foco visível em todos os links

---

## 👤 Autor

Desenvolvido por **Uelinton Janke**
Front-end Developer
* LinkedIn: www.linkedin.com/in/uelinton-janke
