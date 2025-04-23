document.addEventListener('DOMContentLoaded', function() {
    const targetDate = new Date('2025-04-26T23:59:59');
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const countdownElement = document.getElementById('countdown');
    const messageElement = document.getElementById('message');
    const headerParagraph = document.querySelector('header p'); // Seleccionamos el párrafo del header
    const themeSwitch = document.getElementById('theme-toggle-switch');
    const themeCheckbox = document.getElementById('theme-checkbox');
    const body = document.body;

    const frasesDiarias = [
        "Cada día que pasa nos acerca más a nuestro momento.",
        "La espera se hace dulce sabiendo que es por ti.",
        "Contando los días para crear juntos nuevos recuerdos.",
        "Mi corazón palpita más fuerte con cada día que resta.",
        "La ilusión crece conforme se acerca el día.",
        "Este tiempo solo aumenta mi certeza: nuestro encuentro no es casualidad.",
        "Soñando con el instante en que nuestros caminos se unan.",
        "La cuenta regresiva está en marcha, ¡y mi emoción también!",
        "Cada segundo es un paso más hacia ti.",
        "Abril nos espera con un momento mágico.",
        "Siento que el destino nos tiene algo hermoso preparado.",
        "La paciencia tendrá su recompensa muy pronto.",
        "Imaginando cada detalle de ese día especial.",
        "La distancia solo hace crecer este sentimiento.",
        "Estoy ansioso por compartir ese momento contigo.",
        "La magia está en el aire y se acerca a nosotros.",
        "Estos días son solo la antesala de algo maravilloso.",
        "Mi pensamiento constante eres tú, cada día.",
        "El tiempo vuela cuando se espera algo tan bonito.",
        "Ya casi podemos escribir juntos un nuevo capítulo.",
        "La alegría de este encuentro ilumina cada día.",
        "Febrero nos regalará un instante único.",
        "Marzo nos trae la promesa de un gran día.",
        "La primavera florecerá con nuestro encuentro.",
        "La emoción no deja de crecer.",
        "Amo la forma en que mi mundo se expande cuando estás cerca.",
        "Tengo la certeza de que nuestro encuentro no es casualidad.",
        "El universo conspiró para que este momento llegue.",
        "Ya casi puedo sentir la magia.",
        "Este es el preludio de una hermosa historia.",
        // Puedes añadir más frases para los días restantes
    ];

    function updateFraseDiaria() {
        const now = new Date();
        const differenceInDays = Math.ceil((targetDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

        if (differenceInDays > 0 && differenceInDays <= frasesDiarias.length) {
            headerParagraph.textContent = frasesDiarias[frasesDiarias.length - differenceInDays];
        } else if (differenceInDays === 0) {
            headerParagraph.textContent = "¡Hoy es el día!";
        } else if (differenceInDays < 0) {
            headerParagraph.textContent = "Nuestro hermoso momento ya llegó.";
        } else {
            headerParagraph.textContent = "Tengo la certeza de que nuestro encuentro no es casualidad"; // Frase por defecto si no hay frase programada
        }
    }

    function updateCountdown() {
        const now = new Date();
        const difference = targetDate.getTime() - now.getTime();

        if (difference <= 0) {
            clearInterval(intervalId);
            countdownElement.classList.add('hidden');
            messageElement.classList.remove('hidden');
            headerParagraph.textContent = "Nuestro hermoso momento ya llegó."; // Actualizar frase al llegar la fecha
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        daysElement.textContent = days < 10 ? '0' + days : days;
        hoursElement.textContent = hours < 10 ? '0' + hours : hours;
        minutesElement.textContent = minutes < 10 ? '0' + minutes : minutes;
        secondsElement.textContent = seconds < 10 ? '0' + seconds : seconds;

        updateFraseDiaria(); // Actualizar la frase en cada intervalo
    }

    const intervalId = setInterval(updateCountdown, 1000);
    messageElement.classList.add('hidden');
    updateCountdown();
    updateFraseDiaria(); // Llamar la primera vez para mostrar la frase inicial

    // Manejo del cambio de tema con el switch
    if (themeSwitch && themeCheckbox && body) {
        themeSwitch.addEventListener('click', () => {
            themeCheckbox.checked = !themeCheckbox.checked; // Simula el cambio de estado del checkbox
            toggleTheme();
        });

        themeCheckbox.addEventListener('change', toggleTheme); // También escucha cambios directos del checkbox

        function toggleTheme() {
            body.classList.toggle('day-theme');
            body.classList.toggle('night-theme');
            updateThemePreference();
        }

        function updateThemePreference() {
            if (body.classList.contains('day-theme')) {
                localStorage.setItem('theme', 'day-theme');
            } else {
                localStorage.setItem('theme', 'night-theme');
            }
        }

        function updateThemeBasedOnTime() {
            const now = new Date();
            const hour = now.getHours();
            console.log('Hora local al cargar:', hour);
            // Consideramos día entre las 7 AM y las 6:59 PM (hora 18) hora local
            if (hour >= 7 && hour < 19) {
                body.classList.remove('night-theme');
                body.classList.add('day-theme');
                themeCheckbox.checked = true; // Asegurarse de que el switch esté en la posición correcta
                localStorage.setItem('theme', 'day-theme');
                console.log('Tema automático: Día');
            } else {
                body.classList.remove('day-theme');
                body.classList.add('night-theme');
                themeCheckbox.checked = false; // Asegurarse de que el switch esté en la posición correcta
                localStorage.setItem('theme', 'night-theme');
                console.log('Tema automático: Noche');
            }
        }

        // Establecer el tema al cargar la página
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            body.className = savedTheme;
            themeCheckbox.checked = savedTheme === 'day-theme';
        } else {
            updateThemeBasedOnTime();
        }
    }
});