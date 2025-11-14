module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // Nueva funcionalidad
        'fix',      // Corrección de bugs
        'docs',     // Cambios en documentación
        'style',    // Cambios de formato (no afectan el código)
        'refactor', // Refactorización de código
        'test',     // Agregar o modificar tests
        'chore',    // Cambios en el proceso de build o herramientas
        'perf',     // Mejoras de rendimiento
        'ci',       // Cambios en CI/CD
        'revert',   // Revertir commits previos
      ],
    ],
  },
};
