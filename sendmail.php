<?php
// sendmail.php для InfinityFree
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Включить вывод ошибок для отладки (убрать в продакшене)
error_reporting(0);

// Проверка метода запроса
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Метод не разрешен']);
    exit;
}

// Получение и валидация данных
$email = filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL);
$name = filter_var($_POST['name'] ?? '', FILTER_SANITIZE_STRING);
$comment = filter_var($_POST['comment'] ?? '', FILTER_SANITIZE_STRING);

// Проверка обязательных полей
if (empty($email) || empty($name)) {
    echo json_encode(['success' => false, 'message' => 'Заполните обязательные поля']);
    exit;
}

// Валидация email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Неверный формат email']);
    exit;
}

// Настройки для письма
$to = 'sergiobulankin@gmail.com'; // Ваш email
$subject = 'Новая заявка с сайта: ' . $name;
$headers = "From: noreply@" . $_SERVER['HTTP_HOST'] . "\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "Content-Type: text/plain; charset=utf-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Текст письма
$message = "Новая заявка с сайта:\n\n";
$message .= "Имя: " . $name . "\n";
$message .= "Email: " . $email . "\n";
$message .= "Комментарий: " . $comment . "\n\n";
$message .= "---\n";
$message .= "Отправлено: " . date('Y-m-d H:i:s') . "\n";
$message .= "С сайта: " . ($_SERVER['HTTP_REFERER'] ?? 'Неизвестно');

// Попытка отправки через mail()
$mailSent = mail($to, $subject, $message, $headers);

if ($mailSent) {
    echo json_encode([
        'success' => true, 
        'message' => 'Сообщение успешно отправлено!'
    ]);
} else {
    // Логирование ошибки
    error_log("Ошибка отправки почты: " . print_r(error_get_last(), true));
    
    echo json_encode([
        'success' => false, 
        'message' => 'Ошибка при отправке сообщения. Попробуйте позже.'
    ]);
}
?>