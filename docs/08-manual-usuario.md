# Manual de Usuario

> Guía técnica y operativa para la configuración, controles y mecánicas de Game Combat 2D.

---

## 1. Menú Principal y Opciones

Al inicializar el juego, el sistema presenta la pantalla de **Menú Principal**, diseñada para ofrecer acceso estructurado a la configuración y al inicio de las partidas.

### Estructura de Navegación

<div class="grid cards" markdown>

- **Jugar**
    
    Inicia el flujo lógico hacia la interfaz de selección de personaje y transiciona posteriormente a la arena de combate.

- **Opciones**
    
    Abre el panel de configuración extendida, el cual contiene las siguientes subsecciones:
    
    * **Tutorial (Controles):** Despliega una referencia esquemática sobre la asignación de hardware.
    * **Audio:** Permite ajustar de forma independiente los niveles logarítmicos de Volumen de Música y Efectos de Sonido (SFX) mediante deslizadores interactivos.

- **Salir**
    
    Finaliza el proceso en ejecución y cierra la aplicación de forma segura.

</div>

---

## 2. Selección de Personajes

La antesala al combate consiste en una interfaz de carrusel rotativo que expone la lista de combatientes disponibles en el sistema.

* **Navegación de Entidades:** Utilice las **Flechas Direccionales (Izquierda/Derecha)** para ciclar entre los personajes. El personaje central representa la selección activa y muestra de inmediato su animación en estado de reposo (Idle).
* **Confirmación de Selección:** Presione la tecla **Enter** para fijar su selección e inicializar los parámetros de la arena de combate.
* **Telemetría:** En pantalla se despliegan los atributos y la descripción técnica del combatiente ("Datos del Luchador").

---

## 3. Asignación de Controles

La arquitectura del juego soporta multijugador local simultáneo en un solo teclado (PvP). El mapa de entradas ha sido segregado en dos perfiles independientes para mitigar el efecto de saturación (ghosting) del teclado.

=== "Jugador 1"

    | Acción de Control | Tecla Asignada |
    |-------------------|:--------------:|
    | Desplazamiento Izquierda | `A` |
    | Desplazamiento Derecha | `D` |
    | Salto Vertical | `Espacio` |
    | Agacharse | `S` |
    | Ataque Primario (Rápido) | `J` |
    | Ataque Secundario (Fuerte)| `K` |
    | Bloqueo / Defensa Activa | `L` |
    | Ataque en Cuclillas | `Q` (manteniendo la posición agachada) |
    | Ataque Aéreo con Impulso | `J` (durante la ventana de salto) |

=== "Jugador 2"

    | Acción de Control | Tecla Asignada |
    |-------------------|:--------------:|
    | Desplazamiento Izquierda | `Flecha Izquierda` |
    | Desplazamiento Derecha | `Flecha Derecha` |
    | Salto Vertical | `Flecha Arriba` |
    | Agacharse | `Flecha Abajo` |
    | Ataque Primario (Rápido) | `Numpad 1` |
    | Ataque Secundario (Fuerte)| `Numpad 2` |
    | Bloqueo / Defensa Activa | `Numpad 5` |
    | Ataque en Cuclillas | `Q` (manteniendo la posición agachada) * |
    | Ataque Aéreo con Impulso | `J` (durante la ventana de salto) * |

    !!! note "Mapeo global de ataques avanzados"
        Para la iteración técnica actual, las entradas secundarias de ataques en cuclillas y aéreos operan de forma global. Verifique la compatibilidad de *Key Rollover* de su teclado para ejecuciones simultáneas.

!!! info "Comportamiento del Sistema de Auto-Orientación"
    El modelo físico incluye alineación direccional estricta. El vector frontal del personaje siempre se orientará de forma automatizada hacia la posición relativa del oponente. Esto permite ejecutar repliegues tácticos (mantener bloqueo mientras se desplaza hacia atrás) sin exponer vulnerabilidades en el marco de colisión.

---

## 4. Sistema de Combate y Habilidades

Las mecánicas ofensivas y defensivas se rigen por un modelo de restricciones de cuadros de animación (frames) y gestión rigurosa del estado de los agentes.

### Clasificación de Ataques

1. **Ataque Primario:** Ejecución inmediata con un índice de recuperación bajo. Optimizado para aplicar presión inicial y pruebas de reflejo al adversario.
2. **Ataque Secundario:** Exige un intervalo de preparación prologando, pero inflige daño drástico. Conlleva un alto riesgo de vulnerabilidad si el impacto fracasa.
3. **Ataque Aéreo:** Despliega un vector de impulso frontal. Se ejecuta con la tecla de ataque rápido estrictamente antes del contacto con el suelo.
4. **Ataque Agachado:** Golpe concebido para sortear bloqueos estáticos, alterando el vector central de colisión hacia una posición baja.

### Gestión de Defensa (Bloqueo)

!!! abstract "Resolución de Colisiones Defensivas"
    El ingreso al estado de bloqueo neutraliza el 100% del daño entrante y aplica una fuerza de repulsión (knockback) que fuerza el retroceso del atacante para restablecer la zona neutral. Asimismo, recompensa al defensor inyectando puntos adicionales a su barra de energía.

!!! warning "Exclusión Mutua de Estados"
    El motor restringe las acciones simultáneas en conflicto. Es mecánicamente imposible mantener un estado de bloqueo mientras se inicia el ciclo temporal de un ataque ofensivo.

---

## 5. Capacidades Especiales y de Consumo

Cada perfil de combatiente ha sido dotado con la capacidad de ejecutar hasta **cuatro habilidades singulares**.

La habilitación de estas rutinas está supeditada al recurso dinámico de **Energía**. Una vez que dicha variable cruza el umbral del 100%, el sistema activa visualmente la **Barra de Poderes** en la capa gráfica, confirmando la disponibilidad de las habilidades definitivas.

De acuerdo con las definiciones de la clase del personaje, los poderes especiales ofrecen dos variables críticas:
* Aplicación de daño escalar masivo al oponente, ignorando mitigaciones parciales.
* Recuperación aritmética porcentual sobre los puntos de vitalidad (HP) del propio jugador, constituyendo la única mecánica de restauración habilitada dentro del sistema.

---

## 6. Telemetría y HUD (Heads-Up Display)

El HUD garantiza lectura en tiempo real del estado lógico de los recursos durante la sesión:

| Indicador Gráfico | Comportamiento del Recurso | Condiciones Límite |
|-------------------|----------------------------|--------------------|
| **Puntos de Salud (HP)** | Inicia en valor base 100. Registra la pérdida de vitalidad ante daños exitosos. | Carece de factor regenerativo natural. Alcanzar un valor escalar de `0` fuerza la conclusión inmediata de la simulación. |
| **Puntos de Energía (EP)**| Inicia en valor base 0. Acumulación progresiva por daño infligido, recibido y bloqueos correctos. | Límite máximo (Clamp) fijado en 100. Indispensable para desencadenar el llamado de habilidades definitivas. |

---

## 7. Interrupción de Ciclo y Configuración Dinámica

El usuario puede manipular la ejecución de la simulación a través del **Menú de Pausa**, invocable de manera inmediata vía la tecla **`Esc`** (Escape).

Al interceptar este comando, el motor de físicas congela el paso del tiempo (`Time.timeScale = 0`). Las subrutinas habilitadas son:
* **Reanudar:** Desbloquea la escala de tiempo y restablece el control del flujo físico.
* **Opciones:** Interface integrada para el recálculo directo de decibeles de audio (SFX / Música), aplicando las transformaciones a los mezcladores sin destruir la sesión activa.
* **Reiniciar Partida:** Purga las variables de estado e invoca una reinstanciación en limpio de la arena.
* **Volver al Menú Principal:** Destruye el grafo actual de la escena y lanza el núcleo del frontend.

---

## 8. Directrices Óptimas de Resolución

1. **Alineación Espacial (Spacing):** Los colisionadores de impacto (Hitboxes) operan mediante detecciones estrictas. Lanzar comandos fuera del vector efectivo anula toda posibilidad de validación de daño.
2. **Compromiso de Animación:** Fallar un Ataque Secundario implica quedar anclado a la animación de recuperación, exponiendo su entidad (Hurtbox) a ataques ineludibles por un margen crítico de segundos.
3. **Periodo de Invulnerabilidad (I-Frames):** Tras registrar una reducción exitosa en el HP, el sistema provee una breve exclusión de detección de daño para evitar algoritmos de combo infinito por asfixia recursiva.
4. **Masa y Volúmenes Físicos:** Los avatares poseen propiedad rígida (Non-Trigger). Intentar rebasar el límite volumétrico del oponente mediante colisión frontal está inhabilitado, fomentando maniobras de encapsulamiento (acorralar en esquinas).
