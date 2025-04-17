document.addEventListener('DOMContentLoaded', function() {
    const targetDate = new Date('2025-04-26T23:59:59');
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const countdownElement = document.getElementById('countdown');
    const messageElement = document.getElementById('message');
    const themeSwitch = document.getElementById('theme-toggle-switch');
    const themeCheckbox = document.getElementById('theme-checkbox');
    const body = document.body;

    function updateCountdown() {
        const now = new Date();
        const difference = targetDate.getTime() - now.getTime();

        if (difference <= 0) {
            clearInterval(intervalId);
            countdownElement.classList.add('hidden');
            messageElement.classList.remove('hidden');
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
    }

    const intervalId = setInterval(updateCountdown, 1000);
    messageElement.classList.add('hidden');
    updateCountdown();

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