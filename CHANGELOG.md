# Changelog

## [Unreleased]

### Added

- Adicionada validação do campo `title` na criação de tarefas.
- Adicionado limite máximo de 255 caracteres para o título das tarefas.

### Changed

- O título da tarefa é tratado com `trim()` antes de ser salvo.
- O status padrão das novas tarefas é definido como `pendente`.

### Fixed

- Corrigida a validação de campos ausentes, vazios e inválidos no `title`.
