# Game Combat 2D

> Documento de Diseño Técnico · Sistema de combate 1v1 en tiempo real · v1.0

---

## Visión general

Game Combat 2D es un sistema de combate en tiempo real construido para partidas locales de dos jugadores. El diseño se fundamenta en tres invariantes: **condiciones iniciales iguales**, **mecánicas basadas en reacción** y **el control espacial como recurso**.

No existen ventajas estadísticas, no hay resultados aleatorios y no hay modificadores de progresión. Cada resultado es la consecuencia directa de una decisión del jugador.

---

## Sistemas

<div class="grid cards" markdown>

- **Controles**

    Esquema de teclado compartido para dos jugadores. Movimiento, ataques, agacharse y bloqueo.

    [Ver controles](01-controls.md)

- **Sistema de combate**

    Ataques primarios y secundarios, bloqueo activo, retroceso (knockback) y ventanas de impacto.

    [Ver sistema de combate](02-combat-system.md)

- **Sistema de salud**

    HP inicial, daño por tipo de ataque, invulnerabilidad temporal y condición de derrota.

    [Ver sistema de salud](03-health-system.md)

- **Sistema de energía**

    Recurso acumulativo generado por la interacción en combate. Diseñado para uso futuro.

    [Ver sistema de energía](04-energy-system.md)

- **Reglas del juego**

    Las seis reglas principales que definen el comportamiento a nivel de sistema.

    [Ver reglas del juego](05-game-rules.md)

- **Sistema de UI**

    Barras de salud y energía en tiempo real para ambos jugadores.

    [Ver sistema de UI](06-ui-system.md)

</div>

---

## Estado del sistema

| Sistema | Estado |
|--------|--------|
| Movimiento y controles | Implementado |
| Ataque primario | Implementado |
| Ataque secundario | Implementado |
| Sistema de bloqueo | Implementado |
| Retroceso (knockback) | Implementado |
| Sistema de salud | Implementado |
| Sistema de energía | Implementado — sin uso activo |
| HUD | Implementado |

---

## Condición de victoria

!!! success "Victoria"
    El combate termina cuando el HP de un jugador llega a **0**. El oponente es declarado ganador de forma inmediata. No existe temporizador, no hay rondas y no hay sistema de desempate.