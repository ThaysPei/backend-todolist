# Changelog

Todas as mudanças relevantes deste projeto serão documentadas neste arquivo.

O formato segue o [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/).

## [Não lançado]

## [0.3.0] - 2026-10-05

### Changed

- Corrige identações pendentes (`a4b6f41`)
- Ajusta a ordem do código (`82e5f8a`)
- Ajusta formatação e corrige uma constante (`c802ae8`)
- Reorganiza os `require` (`42f129e`)
- Corrige um nome e remove uma "palavra mágica" (`4978f06`)

## [0.2.0] - 2026-10-02

### Added

- Middlewares nas rotas de tasks, com ajustes no controller, no model e nas rotas (`e3af73e`)
- Novas validações para as tasks (`f792619`)

### Changed

- Extrai o `title` do `body` e corrige os `if`s de validação (`e7fa588`)
- Padroniza o nome das funções (`f73b886`)

### Fixed

- Corrige a criação de datas (`339a05f`)

### Security

- Remove o `insertId` da resposta, que expunha informação interna do banco (`e703803`)

## [0.1.0] - 2026-10-01

### Added

- Função de formatação de data em UTC (`b00c40e`)
- Função de cadastro de tasks (`c4d416d`)
- Nova rota para cadastro de tasks (`fe9c917`)
- `use` para receber o corpo da requisição (`1e589a8`)

### Changed

- Atualiza a função de cadastro (`5315d42`)
- Ignora o arquivo de configuração do editor local no Git (`1c6e17a`)

### Removed

- Insert de teste (`7936ff9`)