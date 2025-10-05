<?php
// api/images.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json");

// Массив с данными изображений для слайдера
$images = [
    [
        'id' => 1,
        'url' => 'assets/images/slider/html.png',
        'title' => 'HTML Вёрстка',
        'link' => 'https://example.com/html-project',
        'category' => 'landing'
    ],
    [
        'id' => 2,
        'url' => 'assets/images/slider/jscard.png',
        'title' => 'JS Карточки',
        'link' => 'https://example.com/js-project',
        'category' => 'interactive'
    ],
    [
        'id' => 3,
        'url' => 'assets/images/slider/landingone.png',
        'title' => 'Лендинг Пейдж',
        'link' => 'https://example.com/landing-one',
        'category' => 'landing'
    ],
    [
        'id' => 4,
        'url' => 'assets/images/slider/landingsecond.png',
        'title' => 'Лендинг Пейдж 2',
        'link' => 'https://example.com/landing-two',
        'category' => 'landing'
    ],
    [
        'id' => 5,
        'url' => 'assets/images/slider/landingtilda.png',
        'title' => 'Лендинг на Tilda',
        'link' => 'https://example.com/tilda-project',
        'category' => 'landing'
    ],
    [
        'id' => 6,
        'url' => 'assets/images/slider/mycard.png',
        'title' => 'Сайт-визитка',
        'link' => 'https://example.com/business-card',
        'category' => 'business'
    ]
];

// Поддержка фильтрации по категории
if (isset($_GET['category']) && !empty($_GET['category'])) {
    $category = $_GET['category'];
    $filteredImages = array_filter($images, function($image) use ($category) {
        return $image['category'] === $category;
    });
    echo json_encode(array_values($filteredImages));
} else {
    echo json_encode($images);
}
?>