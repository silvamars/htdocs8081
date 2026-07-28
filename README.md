# HubOnSale — Estrutura por componentes

## Arquivos principais
- `index.html`: homepage
- `ui-kit.html`: catálogo visual interno
- `css/style.css`: ponto único de importação
- `js/main.js`: inicialização dos módulos

## CSS
- `css/base/`: tokens, reset e responsividade
- `css/components/`: componentes reutilizáveis
- `css/sections/`: seções da homepage
- `css/pages/`: ajustes exclusivos de páginas

## JavaScript
- `js/components/`: comportamento isolado por componente
- `js/main.js`: importa e inicializa os módulos

## Observação
Use um servidor local para testar os módulos JavaScript ES:
`python -m http.server 8000`
# hubonsale
