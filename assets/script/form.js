// assets/js/form.js - обновленная версия для InfinityFree
document.addEventListener('DOMContentLoaded', function() {
    const orderForms = document.querySelectorAll('form.form__submit');
    
    orderForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            submitOrderForm(this);
        });
    });
});

async function submitOrderForm(form) {
    const formData = new FormData(form);
    const submitBtn = form.querySelector('.btn__submit');
    
    // Показываем состояние загрузки
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Отправка...';
    submitBtn.disabled = true;
    
    try {
        const response = await fetch('sendmail.php', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            showMessage('✅ ' + data.message, 'success');
            form.reset();
            
            // Закрываем модальное окно если есть
            const modal = document.querySelector('.modal__container');
            if (modal) {
                modal.classList.remove('show');
                modal.classList.add('hide');
            }
        } else {
            showMessage('❌ ' + data.message, 'error');
        }
        
    } catch (error) {
        console.error('Ошибка:', error);
        showMessage('❌ Ошибка сети. Попробуйте позже.', 'error');
    } finally {
        // Восстанавливаем кнопку
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

function showMessage(text, type) {
    // Создаем элемент для сообщения
    const messageEl = document.createElement('div');
    messageEl.className = `form-message form-message-${type}`;
    messageEl.textContent = text;
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        z-index: 10000;
        max-width: 300px;
        animation: slideIn 0.3s ease;
    `;
    
    messageEl.style.background = type === 'success' ? '#4CAF50' : '#f44336';
    
    document.body.appendChild(messageEl);
    
    // Автоматическое скрытие
    setTimeout(() => {
        messageEl.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.parentNode.removeChild(messageEl);
            }
        }, 300);
    }, 5000);
}

// Добавляем стили для анимации
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);