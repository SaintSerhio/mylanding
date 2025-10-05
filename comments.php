<?php
// comments.php - для хранения отзывов на сервере (альтернатива localStorage)

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

$dataFile = 'comments.json';

// Инициализация файла, если не существует
if (!file_exists($dataFile)) {
    file_put_contents($dataFile, json_encode([]));
}

// Обработка GET запроса - получение отзывов
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $comments = json_decode(file_get_contents($dataFile), true);
    echo json_encode($comments);
    exit;
}

// Обработка POST запроса - добавление отзыва
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($input['name']) || !isset($input['text'])) {
        echo json_encode(['success' => false, 'message' => 'Недостаточно данных']);
        exit;
    }
    
    $comments = json_decode(file_get_contents($dataFile), true);
    
    $newComment = [
        'id' => uniqid(),
        'name' => filter_var($input['name'], FILTER_SANITIZE_STRING),
        'text' => filter_var($input['text'], FILTER_SANITIZE_STRING),
        'date' => date('c')
    ];
    
    $comments[] = $newComment;
    file_put_contents($dataFile, json_encode($comments));
    
    echo json_encode(['success' => true, 'comment' => $newComment]);
    exit;
}

// Обработка DELETE запроса - удаление отзыва
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($input['id'])) {
        echo json_encode(['success' => false, 'message' => 'Не указан ID отзыва']);
        exit;
    }
    
    $comments = json_decode(file_get_contents($dataFile), true);
    $newComments = array_filter($comments, function($comment) use ($input) {
        return $comment['id'] !== $input['id'];
    });
    
    file_put_contents($dataFile, json_encode(array_values($newComments)));
    echo json_encode(['success' => true]);
    exit;
}

echo json_encode(['success' => false, 'message' => 'Метод не поддерживается']);
?>