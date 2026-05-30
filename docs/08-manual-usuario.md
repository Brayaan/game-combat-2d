# Guía Operativa del Sistema (User Manual)

> Documentación de usuario final referente a los esquemas de control, telemetría y reglas de interacción dentro de la plataforma Game Combat 2D.

---

## 1. Interfaz de Inicio y Navegación

Al inicializar el aplicativo, el cliente es recibido por la capa de presentación primaria (Menú Principal), la cual expone los flujos lógicos fundamentales del sistema.

### Estructura del Menú Principal

<div class="grid cards" markdown>

- **Jugar**
    
    Inicializa el flujo de carga hacia la matriz de Selección de Entidades y, posteriormente, al entorno de combate físico.

- **Opciones**
    
    Despliega la consola de configuración de la sesión, que integra:
    
    * **Tutorial (Mapeo Físico):** Superposición de esquema en pantalla detallando la asignación de hardware.
    * **Audio:** Subsistema de mezcla para la ecualización logarítmica de los buses de **Efectos de Sonido (SFX)** y **Banda Sonora**.

- **Salir**
    
    Envía la instrucción de terminación de proceso al sistema operativo.

</div>

---

## 2. Inicialización de Combate (Selección de Personajes)

Previo al acceso al entorno físico, los operadores deben seleccionar la entidad a instanciar en la sesión.

El selector opera mediante una interfaz de rotación (carrusel) con validación en tiempo real:

1. **Navegación:** Utilice las teclas ++left++ / ++right++ para ciclar el índice del catálogo. El sistema cargará en pantalla el modelo bidimensional ejecutando su animación de reposo (Idle).
2. **Telemetría del Perfil:** El panel adyacente expone el cuadro de "Datos del Luchador", incluyendo sinopsis y distribución de atributos.
3. **Confirmación:** Oprima la tecla ++enter++ para bloquear la selección y despachar el comando de carga asíncrona hacia la escena de Batalla.

---

## 3. Arquitectura de Entradas (Controles)

El motor lógico soporta entrada multiplexada local para dos operadores sobre el mismo hardware físico. Las tablas de asignación (Key Mappings) han sido distribuidas asimétricamente para evadir cuellos de botella en la matriz del teclado (Key Ghosting / N-Key Rollover).

=== "Jugador 1 (Vector Izquierdo)"

    | Acción Descriptiva | Entrada Asignada |
    |--------------------|:----------------:|
    | Traslación Negativa (Izquierda) | ++a++ |
    | Traslación Positiva (Derecha) | ++d++ |
    | Vector de Salto (Vertical) | ++space++ |
    | Cambio de Postura (Agacharse) | ++s++ |
    | Ofensiva Rápida (Ataque Primario) | ++j++ |
    | Ofensiva Pesada (Ataque Secundario)| ++k++ |
    | Postura Defensiva (Bloqueo) | ++l++ |

=== "Jugador 2 (Vector Derecho)"

    | Acción Descriptiva | Entrada Asignada |
    |--------------------|:----------------:|
    | Traslación Negativa (Izquierda) | ++left++ |
    | Traslación Positiva (Derecha) | ++right++ |
    | Vector de Salto (Vertical) | ++up++ |
    | Cambio de Postura (Agacharse) | ++down++ |
    | Ofensiva Rápida (Ataque Primario) | ++numpad-1++ |
    | Ofensiva Pesada (Ataque Secundario)| ++numpad-2++ |
    | Postura Defensiva (Bloqueo) | ++numpad-5++ |

!!! note "Variables Operativas Globales"
    Las acciones avanzadas se derivan del estado posicional del avatar a través de un bus global de eventos:
    
    * **Ataque en Cuclillas:** Presionar ++q++ mientras se mantiene activa la entrada de Cambio de Postura.
    * **Impacto Aéreo (Dash):** Presionar ++j++ durante los cuadros activos (frames) del vector de salto.

!!! info "Comportamiento del Sistema de Orientación"
    El modelo físico incluye auto-alineación direccional estricta. El vector frontal del personaje siempre interpolará de forma automática hacia el centro de gravedad del oponente. Esto autoriza maniobras de repliegue táctico (sostener la tecla de Bloqueo mientras se aplica traslación inversa) sin desproteger la matriz de colisión frontal.

---

## 4. Dinámica de Sistemas de Combate

El flujo de colisión (Combat Loop) es resuelto mediante el cruce algorítmico de cajas de impacto asimétricas (Hitboxes y Hurtboxes) calculadas frame por frame.

### Vectores de Ofensiva

Los métodos formales de agresión proporcionados al operador son:

Ofensiva Rápida (Primaria)
:   Tiempo de inicialización marginal (Startup), diseñado para interceptar rutinas adversarias. Produce un delta de daño menor pero garantiza una reincorporación inmediata a la posición de guardia.

Ofensiva Pesada (Secundaria)
:   Alta latencia de inicialización. Destinada estrictamente a penalizar ventanas de vulnerabilidad (Punish). Inflige daño masivo pero expone el cuerpo rígido del atacante ante una intercepción si no acierta.

Modificador Aéreo
:   Sobrescribe el vector de salto induciendo un desplazamiento horizontal forzado (Dash), proyectando el colisionador ofensivo hacia coordenadas medias antes de completar la rutina de aterrizaje.

Modificador de Postura Baja
:   Alteración ejecutada desde la variable "Agachado", la cual invierte el centro vertical del daño, ideal para sortear rutinas de defensa configuradas contra impactos superiores.

### Protocolo de Defensa (Bloqueo)

!!! success "Anulación de Daño por Bloqueo Exitoso"
    Si el flag de Bloqueo resulta verdadero (`true`) durante el ciclo de impacto, el motor aplicará un coeficiente de daño escalar equivalente a cero (`0`). 
    Adicionalmente, se despacha una fuerza física instantánea de repulsión (Knockback) sobre la entidad agresora, forzando la desestabilización de su cadena de ataque. En paralelo, el algoritmo inyecta puntos como recompensa en la telemetría del defensor.

!!! warning "Restricción de Concurrencia (Máquina de Estados)"
    El controlador de animaciones subyacente (Animator) es mutuamente excluyente. A nivel de kernel, un operador se encuentra inhabilitado para suscribirse al estado defensivo y emitir comandos ofensivos de forma simultánea.

---

## 5. Habilidades Definitivas y Subsistema de Energía

Cada perfil de entidad ha sido programado con una matriz lógica que hospeda hasta **cuatro secuencias de Habilidades Definitivas (Ultimates)**.

La autorización para disparar estas habilidades reside en la recolección del recurso **Energía (EP)**. Cuando el acumulador de EP quiebra el límite probabilístico (100%), el sistema inyecta sobre la interfaz gráfica el panel `Barra de Poderes`, liberando el seguro de las macros.

Las macros ejecutadas varían según el identificador de clase del combatiente:
* Procedimientos de daño destructivo e ineludible bajo ciertos parámetros espaciales.
* Tareas asíncronas de sanación celular que escalan la variable estática de vida máxima, representando la única infraestructura regenerativa operativa del código base.

---

## 6. Telemetría y Monitoreo Lógico (HUD)

La superposición HUD (Heads-Up Display) inyecta reportes gráficos paramétricos con una tasa de actualización paralela a la lógica del juego:

| Módulo de Interfaz | Lógica Algorítmica Funcional | Excepción Crítica (Quiebre) |
|--------------------|------------------------------|-----------------------------|
| **Vitalidad (HP)** | Pila tipo entero con un umbral base de 100. Computa y sustrae paramétricamente los registros de daño validado. | El alcance del límite inferior `0` interrumpe en el acto el bucle lógico del motor, despachando el protocolo de "Derrota Absoluta". |
| **Poder (EP)** | Pila inicializada en 0, restringida a un máximo absoluto de 100. Incrementa tras validación positiva de daños infligidos/recibidos y bloqueos perfectos. | La colisión de memoria con el tope 100 libera listeners en la interfaz de usuario para permitir el consumo del valor acumulado en macros de destrucción. |

---

## 7. Manejo de Interrupciones de Hilo de Ejecución

El cliente final posee delegación de hardware para interrumpir el cálculo computacional de físicas en la arena pulsando la tecla de escape (`Esc`). Este macro altera la constante global de simulación.

El panel de contingencias desplegado ofrece control sobre:
* **Reanudar:** Desbloquea la manipulación temporal, reanudando las variables y permitiendo la ejecución escalar del framerate.
* **Opciones:** Interface encapsulada para modificación estática del canal mezclador de Audio (Mixer), sin comprometer ni alterar la semilla aleatoria del combate.
* **Reiniciar Partida:** Ordena un reseteo forzado de coordenadas y resetea las clases singleton de Vitalidad y Energía.
* **Volver al Menú Principal:** Purga todos los objetos en RAM del espacio físico instanciado y retorna a la carga secuencial de la capa base del Lobby.

---

## 8. Principios Teóricos del Algoritmo de Duelo

Para maximizar el rendimiento contra la matemática del sistema, asimile los siguientes parámetros invariables:

1. **Gestión del Delta Espacial (Spacing y Hitboxes):** El algoritmo de impacto requiere intersección paramétrica pura. Ejecutar llamadas a la ofensiva en el vacío consume inútilmente la ventana de tiempo activo, reduciendo el DPS (Daño Por Segundo) a niveles improductivos.
2. **Commitment (Compromiso de Cuadros):** Los ataques pesados no poseen capacidad de cancelación asíncrona. Fallar una colisión de impacto lo ancla en los cuadros de recuperación (Recovery Frames), marginando a su entidad (`Hurtbox`) sin recurso de intercepción.
3. **Caché de Invulnerabilidad (I-Frames):** El procesamiento validado de un ataque hostil despierta una subrutina de inmunidad temporal, excluyendo al receptor de las máscaras de colisión para evitar errores de desbordamiento en cadenas de impacto recursivo (Combos Infinitos).
4. **Masa Estricta y Bounding Boxes:** Las entidades interactúan como cuerpos rígidos sólidos (`Non-Trigger`). La evasión frontal es matemáticamente inviable, recompensando la táctica de restricción perimetral (Acorralamiento en las esquinas del área renderizada).
