// Функции для работы с отзывами
document.addEventListener('DOMContentLoaded', function() {
    // Загрузка отзывов при загрузке страницы
    loadComments();
    
    // Обработка отправки формы отзыва
    const commentForm = document.getElementById('commentForm');
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitComment();
        });
    }
    
    // Админская панель
    const loginAdminBtn = document.getElementById('loginAdmin');
    if (loginAdminBtn) {
        loginAdminBtn.addEventListener('click', function() {
            const password = document.getElementById('adminPassword').value;
            if (password === 'admin123') { // Замените на ваш пароль
                document.getElementById('adminPanel').style.display = 'block';
                enableCommentEditing();
            } else {
                alert('Неверный пароль');
            }
        });
    }
});

// Загрузка отзывов из localStorage
function loadComments() {
    const commentsContainer = document.getElementById('commentsContainer');
    if (!commentsContainer) return;
    
    commentsContainer.innerHTML = '';
    
    let comments = JSON.parse(localStorage.getItem('comments')) || [];
    
    if (comments.length === 0) {
        commentsContainer.innerHTML = '<p>Пока нет отзывов. Будьте первым!</p>';
        return;
    }
    
    comments.forEach((comment, index) => {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment-item';
        commentElement.innerHTML = `
            <div class="comment-author">${escapeHtml(comment.name)}</div>
            <div class="comment-date">${new Date(comment.date).toLocaleString()}</div>
            <div class="comment-text">${escapeHtml(comment.text)}</div>
            <div class="comment-actions" style="display: none;">
                <button onclick="editComment(${index})">Редактировать</button>
                <button onclick="deleteComment(${index})">Удалить</button>
            </div>
        `;
        commentsContainer.appendChild(commentElement);
    });
}

// Отправка отзыва
function submitComment() {
    const form = document.getElementById('commentForm');
    if (!form) return;
    
    const formData = new FormData(form);
    
    const comment = {
        name: formData.get('name'),
        text: formData.get('comment'),
        date: new Date().toISOString()
    };
    
    let comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.push(comment);
    localStorage.setItem('comments', JSON.stringify(comments));
    
    form.reset();
    loadComments();
    alert('Ваш отзыв добавлен!');
}

// Включение редактирования отзывов
function enableCommentEditing() {
    const actionButtons = document.querySelectorAll('.comment-actions');
    actionButtons.forEach(button => {
        button.style.display = 'block';
    });
}

// Редактирование отзыва
function editComment(index) {
    let comments = JSON.parse(localStorage.getItem('comments'));
    const newText = prompt('Редактировать отзыв:', comments[index].text);
    
    if (newText !== null) {
        comments[index].text = newText;
        localStorage.setItem('comments', JSON.stringify(comments));
        loadComments();
    }
}

// Удаление отзыва
function deleteComment(index) {
    if (confirm('Вы уверены, что хотите удалить этот отзыв?')) {
        let comments = JSON.parse(localStorage.getItem('comments'));
        comments.splice(index, 1);
        localStorage.setItem('comments', JSON.stringify(comments));
        loadComments();
    }
}

// Экранирование HTML для безопасности
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}