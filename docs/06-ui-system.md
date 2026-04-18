# Sistema de UI

> Visualización en tiempo real del estado de ambos jugadores. Dos componentes: barra de salud y barra de energía.

---

## Componentes del HUD

### Barra de salud

Muestra el estado actual del HP del jugador en tiempo real.

| Propiedad | Comportamiento |
|----------|----------------|
| Activación de actualización | Al recibir daño |
| Velocidad de actualización | Inmediata — sin interpolación |
| Rango | 100 (completo) → 0 (derrota) |
| Dirección | Solo disminuye; no hay regeneración |
| Fin del combate | Se activa al llegar a 0 HP |

### Barra de energía

Muestra el nivel de energía acumulada del jugador en tiempo real.

| Propiedad | Comportamiento |
|----------|----------------|
| Activación de actualización | En interacciones de combate válidas |
| Velocidad de actualización | Inmediata |
| Rango | 0 → 100 |
| Dirección | Solo aumenta durante el combate |
| Decaimiento | Ninguno |

---

## Requisitos de diseño

!!! info "Legibilidad en todo momento"
    Ambas barras deben permanecer **completamente legibles** sin importar la actividad en pantalla. El jugador nunca debe perder la capacidad de leer su estado de HP o energía debido a ruido visual o superposición de elementos.

!!! note "Actualización sin retraso"
    Los cambios en HP y energía deben reflejarse en el HUD **en el mismo frame** en que ocurren en la simulación del juego. No se permiten animaciones intermedias que distorsionen el estado real del jugador.

!!! warning "Estado de derrota en UI"
    Cuando el HP de un jugador llega a 0, la interfaz debe comunicar claramente el estado de fin de combate. La barra de salud en cero y un indicador de victoria/derrota son los elementos mínimos requeridos.