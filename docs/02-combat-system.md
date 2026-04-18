# Sistema de combate

> Ataques, bloqueo y retroceso — las tres mecánicas que definen cada intercambio.

---

## Tipos de ataque

=== "Primario — Puñetazo"

    | Propiedad | Valor |
    |----------|-------|
    | Inicio (startup) | Rápido |
    | Recuperación | Baja |
    | Daño | Reducido |
    | Uso recomendado | Presión, ataques seguros, secuencias rápidas |

    El ataque primario está diseñado para presión sostenida. Su baja recuperación lo convierte en la opción más segura cuando la posición del oponente es incierta.

=== "Secundario — Patada"

    | Propiedad | Valor |
    |----------|-------|
    | Inicio (startup) | Medio |
    | Recuperación | Alta |
    | Daño | Elevado |
    | Uso recomendado | Castigo confirmado, apertura de combos |

    El ataque secundario compromete al atacante. Una patada fallida deja una ventana de vulnerabilidad mayor que un puñetazo fallido. Alto riesgo, alta recompensa.

---

## Reglas de ataque

!!! warning "Un solo ataque activo a la vez"
    Solo puede haber un ataque activo por jugador en cualquier momento. No se puede iniciar un nuevo ataque hasta que el actual —incluyendo sus frames de recuperación— se haya completado por completo.

!!! abstract "Ventana de impacto"
    El daño solo se aplica **durante la ventana activa** del ataque. El contacto fuera de este frame no produce ningún efecto, incluso si el hitbox está superpuesto.

!!! note "Sin daño sostenido"
    Un ataque no puede aplicar daño más de una vez. Cada instancia de daño requiere un ciclo de ataque completamente nuevo.

---

## Sistema de bloqueo

El bloqueo es un estado de entrada activo. Cuando un ataque impacta a un jugador que está bloqueando:

| Efecto | Resultado |
|--------|----------|
| Daño al defensor | Anulado completamente |
| Efecto en el atacante | Retroceso — empujado hacia atrás |
| Energía para el atacante | No se genera |
| Energía para el defensor | +3 (ver [Sistema de energía](04-energy-system.md)) |

!!! success "Inversión posicional"
    Un bloqueo exitoso revierte el control del intercambio. El atacante pierde terreno; el defensor mantiene la posición. La agresión imprudente es castigada directamente.

---

## Retroceso

El retroceso se aplica en dos escenarios: al recibir daño y al tener un ataque bloqueado.

Al sufrir retroceso, el personaje afectado:

1. Es desplazado en dirección opuesta a la fuente
2. Pierde todo control de movimiento temporalmente
3. Recupera el control automáticamente al finalizar el período de retroceso

La duración y la distancia del retroceso son valores fijos definidos por el sistema. No varían según el tipo de ataque.

!!! info "Recuperación de control"
    La recuperación del retroceso es automática. El jugador no necesita realizar ninguna acción — el control vuelve tras la duración fija.