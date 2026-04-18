# Controles

> Entrada de teclado compartida para dos jugadores. Cada jugador ocupa una zona de teclas distinta.

---

## Asignación de teclas

=== "Jugador 1"

    | Acción | Tecla |
    |--------|------|
    | Mover izquierda | `A` |
    | Mover derecha | `D` |
    | Saltar | `Espacio` |
    | Agacharse | `S` |
    | Ataque primario | `J` |
    | Ataque secundario | `K` |
    | Bloquear | `L` |

=== "Jugador 2"

    | Acción | Tecla |
    |--------|------|
    | Mover izquierda | `Flecha izquierda` |
    | Mover derecha | `Flecha derecha` |
    | Saltar | `Flecha arriba` |
    | Agacharse | `Flecha abajo` |
    | Ataque primario | `Numpad 1` |
    | Ataque secundario | `Numpad 2` |
    | Bloquear | `Numpad 5` |

---

## Notas de comportamiento

!!! info "Auto-orientación"
    Los personajes siempre miran automáticamente hacia el oponente. El jugador no controla la dirección de ataque — esta se resuelve de forma automática por el sistema.

!!! note "Movimiento agachado"
    Moverse mientras se está agachado **reduce la velocidad de desplazamiento**. Agacharse no bloquea ataques por sí solo; para eso es necesario mantener la entrada de bloqueo.

!!! tip "Bloqueo en movimiento"
    El bloqueo puede mantenerse mientras se está en movimiento. Un jugador puede retroceder mientras bloquea, usando la gestión de distancia como herramienta defensiva junto al estado de bloqueo.

---

## Restricciones de entrada

Ambos jugadores comparten un solo teclado. Las zonas de teclas están diseñadas para minimizar conflictos físicos durante entradas simultáneas, pero el hardware compartido introduce un límite de lectura simultánea de teclas que puede variar según el teclado utilizado.