# Introducción

> Descripción del sistema y principios de diseño centrales.

---

## Descripción

Game Combat 2D es un sistema de combate en 2D en tiempo real diseñado para enfrentamientos directos 1v1. El jugador controla un personaje capaz de moverse, atacar y defenderse usando un conjunto limitado de acciones. El objetivo es reducir el HP del oponente a cero mediante el uso estratégico de las mecánicas disponibles.

El diseño evita deliberadamente la complejidad introducida por la asimetría, la aleatoriedad o la progresión — el techo de habilidad proviene del dominio de un conjunto de reglas pequeño y bien definido.

---

## Principios de diseño

Condiciones iguales
:   Ambos jugadores comienzan con estadísticas idénticas. Ningún personaje tiene ventajas inherentes.

Sin aleatoriedad
:   Cada resultado en combate es consecuencia directa de las decisiones del jugador. No existen elementos RNG.

Control espacial
:   La distancia entre jugadores determina qué acciones son viables en cada momento. Gestionar el espacio es una decisión táctica continua.

Contra-juego activo
:   El bloqueo no es una defensa pasiva — un bloqueo exitoso revierte la ventaja posicional empujando al atacante hacia atrás.

---

## Sistemas principales

| Sistema | Descripción | Dependencias |
|--------|-------------|--------------|
| Combate | Ataques, bloqueo, retroceso | Controles |
| Salud | Seguimiento de HP, condición de derrota | Combate |
| Energía | Acumulación mediante interacción | Combate |
| UI | Visualización en tiempo real del estado | Salud, Energía |

---

## Condición de victoria

!!! success "Condición de victoria"
    Un jugador gana cuando el HP del oponente llega a **0**. El sistema de combate se termina inmediatamente al cumplirse esta condición.