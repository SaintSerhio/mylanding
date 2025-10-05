<?php
// Разрешить CORS запросы
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Проверка, что запрос методом POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Метод не разрешен']);
    exit;
}

// Получение данных из формы
$email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
$name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
$comment = filter_var($_POST['comment'], FILTER_SANITIZE_STRING);

// Валидация email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Неверный email адрес']);
    exit;
}

// Обработка загруженных файлов
$fileAttachments = [];
if (!empty($_FILES['file'])) {
    $uploadDir = __DIR__ . '/uploads/';
    
    // Создаем директорию, если не существует
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }
    
    // Обрабатываем один или несколько файлов
    $files = $_FILES['file'];
    
    // Если загружен один файл
    if (!is_array($files['name'])) {
        $fileName = basename($files['name']);
        $filePath = $uploadDir . $fileName;
        
        if (move_uploaded_file($files['tmp_name'], $filePath)) {
            $fileAttachments[] = $filePath;
        }
    } else {
        // Если загружено несколько файлов
        for ($i = 0; $i < count($files['name']); $i++) {
            if ($files['error'][$i] === UPLOAD_ERR_OK) {
                $fileName = basename($files['name'][$i]);
                $filePath = $uploadDir . $fileName;
                
                if (move_uploaded_file($files['tmp_name'][$i], $filePath)) {
                    $fileAttachments[] = $filePath;
                }
            }
        }
    }
}

// Настройки почты
$to = 'sergiobulankin@gmail.com';
$subject = 'Новый заказ с сайта: ' . $name;
$message = "
Имя: $name
Email: $email
Комментарий: $comment

Сообщение отправлено с сайта: " . $_SERVER['HTTP_REFERER'] . "
";

$headers = [
    'From' => 'noreply@' . $_SERVER['HTTP_HOST'],
    'Reply-To' => $email,
    'X-Mailer' => 'PHP/' . phpversion(),
    'Content-type' => 'text/plain; charset=utf-8'
];

// Подготовка заголовков
$headersString = '';
foreach ($headers as $key => $value) {
    $headersString .= "$key: $value\r\n";
}

// Отправка почты с вложениями
if (!empty($fileAttachments)) {
    // Генерируем boundary
    $boundary = md5(time());
    
    // Изменяем заголовки для multipart
    $headersString = "MIME-Version: 1.0\r\n";
    $headersString .= "From: " . $headers['From'] . "\r\n";
    $headersString .= "Reply-To: " . $headers['Reply-To'] . "\r\n";
    $headersString .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";
    
    // Тело письма с вложениями
    $body = "--$boundary\r\n";
    $body .= "Content-Type: text/plain; charset=\"utf-8\"\r\n";
    $body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $body .= $message . "\r\n";
    
    // Добавляем вложения
    foreach ($fileAttachments as $filePath) {
        if (file_exists($filePath)) {
            $fileName = basename($filePath);
            $fileContent = file_get_contents($filePath);
            $fileContentEncoded = chunk_split(base64_encode($fileContent));
            
            $body .= "--$boundary\r\n";
            $body .= "Content-Type: application/octet-stream; name=\"$fileName\"\r\n";
            $body .= "Content-Transfer-Encoding: base64\r\n";
            $body .= "Content-Disposition: attachment; filename=\"$fileName\"\r\n\r\n";
            $body .= $fileContentEncoded . "\r\n";
        }
    }
    
    $body .= "--$boundary--";
    
    $success = mail($to, $subject, $body, $headersString);
} else {
    // Отправка без вложений
    $success = mail($to, $subject, $message, $headersString);
}

// Очистка загруженных файлов
foreach ($fileAttachments as $filePath) {
    if (file_exists($filePath)) {
        unlink($filePath);
    }
}

// Ответ клиенту
if ($success) {
    echo json_encode(['success' => true, 'message' => 'Сообщение отправлено успешно']);
} else {
    echo json_encode(['success' => false, 'message' => 'Ошибка при отправке сообщения']);
}
?>