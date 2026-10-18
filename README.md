# Jhair & Nayif · Invitación de boda

Invitación web animada para la boda del **27 de noviembre de 2026, 10:00 a. m.**,
en La Iglesia de Jesucristo de los Santos de los Últimos Días, Jr. Antonio Raymondi 1219, Chupaca.

Son tres archivos: `index.html`, `musica.mp3` y `qr-yape.jpg` (vals original compuesto para esta invitación). No tiene dependencias ni compilación.

## Publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub (por ejemplo `boda-jhair-nayif`).
2. Sube `index.html`, `musica.mp3`, `qr-yape.jpg` (y este README) a la raíz del repositorio con **Add file → Upload files**.
3. Ve a **Settings → Pages**.
4. En *Source* elige **Deploy from a branch**, rama `main`, carpeta `/ (root)` y guarda.
5. En uno o dos minutos tu invitación estará en
   `https://TU-USUARIO.github.io/boda-jhair-nayif/`

## Personalizar

Al final de `index.html` hay un bloque `CONFIG`:

```js
const CONFIG = {
  fechaEvento: "2026-11-27T10:00:00-05:00",
  mapa: "https://maps.app.goo.gl/8u1roYL4RXx6UoMLA",
  whatsapp: "",        // ej. "51987654321" → muestra el botón "Confirmar por WhatsApp"
  mensajeWhatsapp: "¡Hola! Confirmo mi asistencia a la boda de Jhair y Nayif 💐",
  musica: ""           // ej. "musica.mp3" → sube el mp3 al repo y aparece el botón de música
};
```

- **Confirmación por WhatsApp:** escribe el número con código de país (51 para Perú), sin `+` ni espacios.
- **Música:** sube un archivo `.mp3` al repositorio y pon su nombre en `musica`. Empieza a sonar al abrir el sobre.
- **Textos:** se editan directamente en el HTML (busca la sección que quieras cambiar).

## Animaciones incluidas

- Sobre que se abre al tocarlo, con sello de lacre.
- Paisaje ilustrado (montaña, templo y flores) que aparece por capas.
- Efecto parallax al hacer scroll.
- Flores y hierbas que se mecen con el viento.
- Pétalos cayendo.
- Secciones que aparecen al hacer scroll.
- Cuenta regresiva en vivo.

## Datos por completar

En el mismo bloque `CONFIG`:

- **`vestimenta.pinterestMujeres` / `pinterestVarones`:** enlaces a los tableros de Pinterest.
- **`regalos.cuentas`:** titular y número de Yape (con botón para copiar).
- **`regalos.qr`:** `qr-yape.jpg`. Debajo aparece el botón "Descargar QR".
- **`musica`:** si prefieres otra canción, reemplaza `musica.mp3` por tu archivo con el mismo nombre.

## Ver quién confirmó (Google Sheets)

El formulario "Confirma tu asistencia" guarda cada respuesta en una hoja de Google Sheets que solo tú ves.
Se configura una sola vez (unos 5 minutos):

1. Entra a [sheets.new](https://sheets.new) con tu cuenta de Google y ponle un nombre, por ejemplo *Confirmaciones boda*.
2. En el menú, abre **Extensiones → Apps Script**.
3. Borra lo que aparece y pega todo el contenido de `confirmaciones-apps-script.gs`. Guarda (ícono de disquete).
4. Pulsa **Implementar → Nueva implementación**. En el engranaje elige **Aplicación web**.
   - *Ejecutar como:* **Yo**
   - *Quién tiene acceso:* **Cualquier usuario**
5. Pulsa **Implementar**, autoriza los permisos que pide Google y copia la **URL de la aplicación web** (termina en `/exec`).
6. En `index.html`, dentro de `CONFIG`, pega esa URL en `rsvpUrl: ""` y vuelve a subir el archivo a GitHub.

Listo: cada confirmación aparece como una fila nueva en la pestaña **Confirmaciones**, con nombre, si asistirá,
acompañantes, total de personas y mensaje. Arriba a la derecha verás el total de personas que asistirán.

> Si cambias el código del Apps Script más adelante, usa **Implementar → Administrar implementaciones → Editar → Nueva versión**
> para que la URL siga siendo la misma.

`rsvpFechaLimite` define la fecha límite que se muestra en el texto (déjalo vacío para no mostrarla).
