# Centro “Más” e internacionalización para RUN

## Objetivo
Convertir “Más” en el centro de cuenta, herramientas y preferencias de RUN, inspirado en la organización clara de Garmin pero adaptado al lenguaje visual y las funciones existentes. Inicio y Apps y dispositivos se mantienen intactos y accesibles.

## Qué se construirá
- Nueva pestaña y página **Más** en móvil y escritorio, con resumen del atleta y categorías compactas.
- Categorías: Dispositivos y sensores; Estadísticas y rendimiento; Entrenamiento y herramientas; Configuración general; Ayuda e información.
- Vistas internas para perfil, zonas de frecuencia cardíaca, récords, VO₂ Max, planes, rutas y carga CTL/ATL/TSB, usando datos demostrativos coherentes cuando todavía no haya actividad suficiente.
- Ajustes funcionales y persistentes para idioma, unidades, notificaciones, privacidad y apariencia.
- Selector de idioma Español, English o Automático; detección inicial del navegador y actualización inmediata de toda la interfaz.
- Conversión de distancias y ritmos entre sistema métrico e imperial sin alterar los datos almacenados.
- Traducción completa de Inicio, navegación, tarjetas, acciones y flujos de Apps y dispositivos.

## Experiencia
- En móvil, “Más” reemplaza la pestaña Calendario para conservar cuatro destinos principales y objetivos táctiles cómodos.
- La portada de “Más” usa filas agrupadas, iconos claros, estado resumido y navegación jerárquica.
- Cada subvista tiene retorno visible, encabezado propio y controles adecuados: selectores, interruptores o acciones.
- Privacidad y permisos siguen siendo revocables; las integraciones continúan simuladas localmente hasta contar con credenciales reales.

## Detalles técnicos
- Crear un proveedor de preferencias/i18n compartido con almacenamiento local, detección segura del idioma y diccionario tipado ES/EN.
- Añadir rutas dedicadas para `/mas`, `/mas/perfil`, `/mas/rendimiento`, `/mas/entrenamiento`, `/mas/configuracion` y `/mas/ayuda`.
- Centralizar etiquetas de navegación y formatos de unidades para que reaccionen al idioma y preferencias.
- Mantener los metadatos únicos por página y validar navegación, persistencia, cambio de idioma, unidades y pantallas móviles/escritorio.
