# Comportamiento del juego

> Comportamiento a nivel de sistema: movimiento del personaje, interacciones físicas y estados de control del jugador.

---

## Simetría de personajes

!!! success "Simetría total"
    Ambos personajes comparten **parámetros idénticos**: velocidad, valores de daño, alcance y todas las propiedades estadísticas. Ningún personaje tiene una ventaja inherente sobre el otro. Cualquier asimetría en un intercambio es producto exclusivamente de la posición y las decisiones de tiempo del jugador.

---

## Auto-orientación

Los personajes rotan continuamente para mirar al oponente. Este es un comportamiento a nivel de sistema que no puede ser modificado por el jugador.

Consecuencias:

- Los ataques siempre se resuelven en dirección al oponente sin intervención del jugador  
- La lectura visual del combate es siempre clara y sin ambigüedades  
- El jugador se enfoca únicamente en decisiones de acción, no en la orientación  

---

## Interacciones físicas

| Interacción | Activa |
|-------------|:------:|
| Colisión entre jugadores | Sí |
| Superposición / atravesar jugadores | No — no permitido |
| Retroceso por daño | Sí |
| Retroceso del atacante por bloqueo | Sí |
| Retroceso durante i-frames | Sí — el desplazamiento se mantiene |

---

## Estados de control del jugador

La entrada del jugador no siempre está activa. El sistema maneja dos estados de control:

### Control activo

Estado normal. Todas las entradas son procesadas: movimiento, ataques, bloqueo, agacharse, salto.

### Control suspendido (retroceso)

Se activa al: recibir daño o tener un ataque bloqueado.

!!! warning "Suspensión de entrada durante retroceso"
    Durante el retroceso, **todas las entradas del jugador son ignoradas**. El personaje no puede moverse, atacar ni bloquear. Esto se aplica en la capa de procesamiento de entrada, no en la capa de animación.

!!! info "Recuperación automática"
    El control se restablece **automáticamente** al finalizar la duración del retroceso. No se requiere ninguna acción del jugador para salir del estado suspendido. La duración es una constante fija del sistema.

---

## Resultados deterministas

Todos los resultados del combate son completamente deterministas. Dadas las mismas entradas en los mismos frames, el sistema siempre produce la misma salida. No existen elementos aleatorios en ningún subsistema de combate.

Lo que determina quién gana:

Posicionamiento
:   La distancia al oponente determina el alcance de ataques, opciones de escape y relevancia del bloqueo. La gestión del espacio es una capa táctica continua.

Tiempo
:   La diferencia entre un golpe, un bloqueo o un fallo se mide en frames. El tiempo de reacción y la precisión de entrada determinan directamente el resultado.

Gestión de recursos
:   Conservación del HP durante toda la pelea, no solo en intercambios individuales.