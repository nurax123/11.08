document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('passwordInput');
    const numButtons = document.querySelectorAll('.num-button');
    const calculatorContainer = document.getElementById('calculatorContainer');
    const messageContainer = document.getElementById('messageContainer');
    const backButton = document.getElementById('backButton');
    const togglePassword = document.getElementById('togglePassword');
    const backgroundMusic = document.getElementById('backgroundMusic'); // Ambil elemen audio

    const correctPassword = "240922"; // Password yang benar

    // Event listener untuk tombol numerik
    numButtons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonValue = button.textContent;

            if (button.classList.contains('clear-button')) {
                passwordInput.value = '';
            } else if (button.classList.contains('back-button')) {
                passwordInput.value = passwordInput.value.slice(0, -1);
            } else if (passwordInput.value.length < 6) { // Batasi panjang password 6 digit
                passwordInput.value += buttonValue;
            }

            // Cek password setiap kali input berubah
            if (passwordInput.value === correctPassword) {
                // Hentikan tombol numerik agar tidak bisa diinput lagi setelah password benar
                numButtons.forEach(btn => btn.disabled = true);

                setTimeout(() => {
                    calculatorContainer.classList.add('hide-calculator');
                    messageContainer.classList.add('show-message');
                    messageContainer.classList.remove('hidden');
                    
                    // Putar musik setelah transisi layar
                    backgroundMusic.play().catch(error => {
                        // Tangani jika pemutaran otomatis gagal (misalnya, diblokir browser)
                        console.log("Autoplay blocked:", error);
                        // Kamu bisa tambahkan pesan ke user di sini jika perlu
                        // alert("Tekan di mana saja untuk memutar musik!"); 
                    });

                }, 300); // Sedikit delay agar transisi terlihat
            }
        });
    });

    // Event listener untuk tombol mata
    togglePassword.addEventListener('click', () => {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            togglePassword.innerHTML = '<i class="fas fa-eye-slash"></i>';
        } else {
            passwordInput.type = 'password';
            togglePassword.innerHTML = '<i class="fas fa-eye"></i>';
        }
    });

    // Event listener untuk tombol kembali
    backButton.addEventListener('click', () => {
        messageContainer.classList.remove('show-message');
        calculatorContainer.classList.remove('hide-calculator');
        
        // Hentikan musik saat kembali ke layar kalkulator
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0; // Reset ke awal

        setTimeout(() => {
            messageContainer.classList.add('hidden');
            passwordInput.value = ''; // Reset password input
            passwordInput.type = 'password'; // Pastikan kembali ke tipe password
            togglePassword.innerHTML = '<i class="fas fa-eye"></i>'; // Pastikan ikon mata terbuka
            
            // Aktifkan kembali tombol numerik
            numButtons.forEach(btn => btn.disabled = false);
        }, 800); // Sesuaikan dengan durasi transisi CSS
    });
});