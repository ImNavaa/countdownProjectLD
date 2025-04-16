document.addEventListener('DOMContentLoaded', function() {
    const targetDate = new Date('2025-04-26T23:59:59'); // Fecha límite: 26 de abril a las 11:59:59 PM
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const countdownElement = document.getElementById('countdown');
    const messageElement = document.getElementById('message');

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

    // Ocultar el mensaje inicial
    messageElement.classList.add('hidden');

    // Ejecutar la función una vez al cargar para evitar un breve parpadeo sin números
    updateCountdown();
});