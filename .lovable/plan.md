# Centro “Más”, versión web y APK para RUN

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
- Versión web adaptable e instalable, con iconos y configuración de aplicación.
- APK Android instalable para pruebas, generado desde la misma experiencia web para mantener funciones y diseño sincronizados.

## Experiencia
- En móvil, “Más” reemplaza la pestaña Calendario para conservar cuatro destinos principales y objetivos táctiles cómodos.
- La portada de “Más” usa filas agrupadas, iconos claros, estado resumido y navegación jerárquica.
- Cada subvista tiene retorno visible, encabezado propio y controles adecuados: selectores, interruptores o acciones.
- Privacidad y permisos siguen siendo revocables; las integraciones continúan simuladas localmente hasta contar con credenciales reales.
- El APK conservará las preferencias y conexiones simuladas en el dispositivo. La publicación en Google Play requerirá posteriormente una firma y ficha de tienda del propietario.

## Detalles técnicos
- Crear un proveedor de preferencias/i18n compartido con almacenamiento local, detección segura del idioma y diccionario tipado ES/EN.
- Añadir rutas dedicadas para `/mas`, `/mas/perfil`, `/mas/rendimiento`, `/mas/entrenamiento`, `/mas/configuracion` y `/mas/ayuda`.
- Centralizar etiquetas de navegación y formatos de unidades para que reaccionen al idioma y preferencias.
- Configurar la aplicación web instalable y un contenedor Android ligero; generar un APK de prueba sin crear una segunda interfaz independiente.
- Mantener los metadatos únicos por página y validar navegación, persistencia, cambio de idioma, unidades y pantallas móviles/escritorio.
- Entregar el código web y el APK instalable; la publicación web se realizará solo cuando el usuario la solicite explícitamente.
