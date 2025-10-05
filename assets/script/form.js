// Обработка форм
document.addEventListener('DOMContentLoaded', function() {
    // Модальное окно
    const modalContainer = document.querySelector('.modal__container');
    const orderButtons = document.querySelectorAll('.btn-contact, .contact__main, .contact__footer');
    const closeModal = document.querySelector('.modal__close');
    
    // Открытие модального окна
    orderButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (modalContainer) {
                modalContainer.classList.remove('hide');
                modalContainer.classList.add('show');
            }
        });
    });
    
    // Закрытие модального окна
    if (closeModal && modalContainer) {
        closeModal.addEventListener('click', function() {
            modalContainer.classList.remove('show');
            modalContainer.classList.add('hide');
        });
    }
    
    // Валидация email
    const emailInput = document.querySelector('input[name="email"]');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            validateEmail(this.value);
        });
    }
    
    // Активация кнопки отправки при согласии с условиями
    const checkbox = document.querySelector('.btn__checkbox');
    const submitBtn = document.querySelector('.btn__submit');
    
    if (checkbox && submitBtn) {
        checkbox.addEventListener('change', function() {
            submitBtn.disabled = !this.checked;
        });
    }
    
    // Отправка формы заказа
    const orderForms = document.querySelectorAll('form.form__submit');
    if (orderForms.length) {
        orderForms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                submitOrderForm(this);
            });
        });
    }
});

// Валидация email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    
    const emailInput = document.querySelector('input[name="email"]');
    if (emailInput) {
        if (isValid) {
            emailInput.style.borderColor = 'green';
        } else {
            emailInput.style.borderColor = 'red';
        }
    }
    
    return isValid;
}

// Отправка формы заказа
function submitOrderForm(form) {
    const formData = new FormData(form);
    
    // Валидация
    if (!validateEmail(formData.get('email'))) {
        alert('Пожалуйста, введите корректный email');
        return;
    }
    
    // Отправка данных на сервер
    fetch('sendmail.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Ваша заявка отправлена! Мы свяжемся с вами в ближайшее время.');
            form.reset();
            
            // Закрываем модальное окно
            const modalContainer = document.querySelector('.modal__container');
            if (modalContainer) {
                modalContainer.classList.remove('show');
                modalContainer.classList.add('hide');
            }
        } else {
            alert('Произошла ошибка при отправке: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при отправке формы.');
    });
}