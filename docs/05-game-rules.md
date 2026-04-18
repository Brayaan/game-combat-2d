# Reglas del juego

> Las seis reglas invariantes que definen el comportamiento del sistema. No pueden ser anuladas por acciones del jugador.

---

## Conjunto de reglas

!!! abstract "01 — Un ataque activo por jugador"
    Solo puede haber un ataque activo por jugador en cualquier momento. No se puede iniciar un nuevo ataque hasta que el anterior —incluida su fase completa de recuperación— haya finalizado. Esto se aplica de forma independiente a ambos jugadores.

!!! abstract "02 — El daño requiere contacto en frames activos"
    El daño se aplica **únicamente cuando hay contacto durante la ventana activa del ataque**. Los ataques fuera de su ventana activa no generan efecto de hitbox, sin importar la proximidad visual. Una única ventana activa evita abusos de multi-impacto en una misma instancia de ataque.

!!! abstract "03 — El bloqueo anula el daño entrante"
    Un ataque que impacta a un jugador en estado de bloqueo aplica **daño cero**. El bloqueo es una anulación total del daño, no una reducción. No existe daño parcial (chip damage) en el diseño actual.

!!! abstract "04 — Los ataques bloqueados empujan al atacante"
    Cuando un ataque es bloqueado, el **atacante recibe retroceso** — es desplazado hacia atrás y pierde el control de movimiento temporalmente. Atacar contra un bloqueo tiene un costo posicional para el agresor.

!!! abstract "05 — Los jugadores no pueden ocupar el mismo espacio"
    La colisión física entre personajes está siempre activa. Los jugadores no pueden atravesarse entre sí. El sistema mantiene una distancia mínima obligatoria en todo momento.

!!! abstract "06 — Todas las acciones tienen inicio y recuperación"
    Todas las acciones (ataques, bloqueo) tienen tiempos definidos de inicio y recuperación. Ninguna acción es instantánea. Los jugadores no pueden cancelar acciones a mitad de ejecución para encadenar nuevas acciones antes de tiempo.

---

## Interacción entre reglas

| Escenario | Regla(s) | Resultado |
|----------|----------|-----------|
| Ataque durante recuperación | 01 | El ataque no se ejecuta |
| Ataque fuera de la ventana activa | 02 | No se aplica daño |
| Ataque impacta a jugador bloqueando | 02, 03, 04 | No hay daño, el atacante es empujado |
| Jugadores intentan ocupar el mismo espacio | 05 | Colisión, se detiene el movimiento |
| Bloqueo activado después del impacto | 02, 03 | Se aplica daño — el bloqueo llegó tarde |