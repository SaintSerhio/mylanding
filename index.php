<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/comments.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css">
    <title>myLanding</title>
</head>
<body>
    <div class="wrapper">
        <div class="container">
            <header class="header">
                <div class="header__content">
                    <div class="header__logo">
                        <div class="header__logotip">
                            <img src="assets/images/logo/logo.png" alt="logo" class="logotip">
                        </div>
                    </div>
                    <div class="header__images">
                        <div class="head__images">
                            <img src="assets/images/img/myWork.png" alt="coladg" class="head__img">
                        </div>
                    </div>
                    <nav class="header__navigation">
                        <ul class="navigation__content">
                            <li class="navigation__button"><a href="#" class="button__link">Резюме</a></li>
                            <li class="navigation__button"><a href="#" class="button__link">Работы</a></li>
                            <li class="navigation__button"><a href="#" class="button__link">Контакты</a></li>
                        </ul>
                    </nav>
                    <div class="header__contact btn-contact">
                        <span>Заказать</span>
                    </div>
                    <div class="header__burger">
                        <input type="checkbox" id="burger-checkbox" class="burger-checkbox">
                        <label for="burger-checkbox" class="burger__menu"></label>
                        <ul class="burger__menu-list">
                            <li class="burger__link"><a href="#">Резюме</a></li>
                            <li class="burger__link"><a href="#">Работы</a></li>
                            <li class="burger__link"><a href="#">Контакты</a></li>
                            <div class="container__logo-link">
                                <div class="logo__link-content">
                                    <img src="assets/images/logo/logo.png" alt="logo" class="logo__link-img">
                                </div>
                            </div>
                        </ul>
                    </div>
                </div>
            </header>
        </div>
        <div class="modal__container hide">
            <div class="modal__content">
                <div class="modal__close">
                    <span>закрыть</span>
                </div>
                <form class="form__submit" method="post" enctype="multipart/form-data">
                    <p>
                        <input class="input__area" type="email" placeholder="Введите email" name="email" onblur="validateEmail(this.value);" required>
                    </p>
                    <p>
                        <input class="input__area" type="name" placeholder="Введите ваше имя" name="name" required>
                    </p>
                    <p>
                        <textarea class="input__area" name="comment" placeholder="Что вы хотели уточнить?" id="comment"></textarea>
                    </p>
                    <p class="file__submit">
                        <label for="file" class="text__file-submit">Приложите файл с макетом</label>
                        <input type="file" name="file" id="file" class="file__file" multiple>
                    </p>
                    <p class="checkbox__submit">
                        <label for="checkbox" class="text__checkbox-submit">Даёте ли вы согласие на обработку данных</label>
                        <input type="checkbox" id="checkbox" class="btn__checkbox">
                    </p>
                    <button type="submit" class="btn__submit" disabled>Отправить</button>
                </form>
            </div>
        </div>
        <main class="page__my-job-offers container">
            <section class="about__container">
                <div class="about__content-bg">
                    <img src="assets/images/img/yand.jpg" alt="" class="content-bg__one">
                    <img src="assets/images/img/yand.jpg" alt="" class="content-bg__two">
                    <div class="anchor__bg"><img src="assets/images/logo/wordpress.jpg" alt="wordpress" class="content-bg__head"></div>
                    <div class="about__content">
                        <h1 class="about__text">Адаптивный, кроссбраузерный сайт с привязкой к WordPress</h1>
                    </div>
                </div>
                <div class="decor">
                    <span class="line__decor"></span>
                </div>
                <div class="about__offer">
                    <h2 class="offer__title title__style">Для каждого дела свой сайт</h2>
                    <h3 class="offer__text">Тут можно выбрать то что вам подойдёт</h3>
                </div>
                <div class="about__site-type">
                    <ul class="site__type">
                        <li class="site__landing type active">лендинг</li>
                        <li class="site__magazin type">магазин</li>
                        <li class="site__corporate type">корпоративный</li>
                        <li class="site__blog type">блог</li>
                    </ul>
                    <div class="site__info">
                        <div class="site__info-content">
                            <img class="site__info-img" src="assets/images/tabs/landingone.png" alt="лендинг">
                            <div class="site__info-text">Лендинг — это одностраничный сайт, который побуждает посетителя к действию: купить, зарегистрироваться, оставить заявку, подписаться.</div>
                        </div>
                        <div class="site__info-content">
                            <img class="site__info-img" src="assets/images/tabs/magazin.png" alt="магазин">
                            <div class="site__info-text">Интернет-магазин — это торговая площадка в интернете, которая может принимать заказы и оплату онлайн.</div>
                        </div>
                        <div class="site__info-content">
                            <img class="site__info-img" src="assets/images/tabs/landingsecond.png" alt="корпоративный">
                            <div class="site__info-text">Корпоративный сайт сайт компании — это всегда многостраничный сайт, где есть полный функционал для онлайн-работы, вся информация о компании, товарах и услугах, контактная информация, сервисы и обратная связь.</div>
                        </div>
                        <div class="site__info-content">
                            <img class="site__info-img" src="assets/images/img/ofice.jpg" alt="блог">
                            <div class="site__info-text">Блог — это специальный сайт или раздел на сайте с контентом на определенную тему, который регулярно обновляется. Чаще всего информация в блоге отображается в обратном хронологическом порядке: первыми идут статьи и посты, которые были опубликованы последними. </d>
                        </div>
                    </div>
                </div>
            </section>
            <div class="decor">
                <span class="line__decor"></span>
            </div>
            <section class="why__my-container">
                <img src="assets/images/img/jsi.webp" alt="" class="why__my-bg">
                <div class="why__my-card">
                    <div class="why__my-img"><img src="assets/images/card/clock.svg" alt="часы"></div>
                    <div class="why__my-text">Имея свой сайт вы экономите время и ресурсы на представлении вашего товара, бренда, компании, магазина или предоставляемые услуги.</div>
                </div>
                <div class="why__my-card">
                    <div class="why__my-img"><img src="assets/images/card/key.svg" alt="ключ"></div>
                    <div class="why__my-text">Индивидуальный подход. Я учту особенности вашего бизнеса и предпочтения целевой аудитории, чтобы создать уникальный и привлекательный сайт, который будет выделяться среди конкурентов.</div>
                </div>
                <div class="why__my-card">
                    <div class="why__my-img"><img src="assets/images/card/money.svg" alt="монеты"></div>
                    <div class="why__my-text">С граммотным подходом к делу ваш сайт не только приведёт к вам новых клиентов, но вместе с ними принесёт вам прибыль.</div>
                </div>
            </section>
            <div class="decor">
                <span class="line__decor"></span>
            </div>
            <h2 class="team title__style">Моя команда</h2>
            <section class="my__team-container">
                <div class="my__team-card">
                    <div class="my__team-title"><h2 class="team-title">Сергей Буланкин</h2></div>
                    <div class="my__team-subtitle"><h3 class="team-subtitle">HTML вёрстка</h3></div>
                    <div class="my__team-img"><img src="assets/images/team/i am anphase two.jpg" alt="" class="team-img"></div>
                    <div class="my__team-text">Вёрстка и стили на этом человеке</div>
                </div>
                <div class="my__team-card">
                    <div class="my__team-title"><h2 class="team-title">Сергей Буланкин</h2></div>
                    <div class="my__team-subtitle"><h3 class="team-subtitle">Frontend</h3></div>
                    <div class="my__team-img"><img src="assets/images/team/my.jpg" alt="" class="team-img"></div>
                    <div class="my__team-text">Адаптивность, интерактивность и динамичность сайта</div>
                </div>
                <div class="my__team-card">
                    <div class="my__team-title"><h2 class="team-title">Михаил Буланкин</h2></div>
                    <div class="my__team-subtitle"><h3 class="team-subtitle">SEO</h3></div>
                    <div class="my__team-img"><img src="assets/images/team/creative.png" alt="" class="team-img"></div>
                    <div class="my__team-text">Оптимизирует всё для поисковых систем</div>
                </div>
                <div class="my__team-card">
                    <div class="my__team-title"><h2 class="team-title">Анастасия Буланкина</h2></div>
                    <div class="my__team-subtitle"><h3 class="team-subtitle">Маркетолог, таргетолог, SMM</h3></div>
                    <div class="my__team-img"><img src="assets/images/team/seo.png" alt="" class="team-img"></div>
                    <div class="my__team-text">С ней все узнают о вашем деле</div>
                </div><div class="my__team-card">
                    <div class="my__team-title"><h2 class="team-title">Злата Буланкина</h2></div>
                    <div class="my__team-subtitle"><h3 class="team-subtitle">Директор</h3></div>
                    <div class="my__team-img"><img src="assets/images/team/director.png" alt="" class="team-img"></div>
                    <div class="my__team-text">Самый важный гусь</div>
                </div>
                <div class="my__team-card">
                    <div class="my__team-title"><h2 class="team-title">Сергей Буланкин</h2></div>
                    <div class="my__team-subtitle"><h3 class="team-subtitle">Backend</h3></div>
                    <div class="my__team-img"><img src="assets/images/team/i am see to heaven.jpg" alt="" class="team-img"></div>
                    <div class="my__team-text">Обратная связь и вся невидимая часть сайта</div>
                </div>
            </section>
            <div class="decor">
                <span class="line__decor"></span>
            </div>
            <h2 class="slider__title title__style">Примеры работ</h2>
            <section class="slider__container">
                <div class="gallery__container">
                    <div class="gallery__box">
                        <!---<div style="--i:1;">
                            <div class="gallery__container-title">
                                <a href="http://"><h4 class="gallery__slide">HTML</h4></a>
                            </div>
                            <img src="assets/images/slider/html.png" alt="">
                        </div>
                        <div style="--i:2;">
                            <div class="gallery__container-title">
                                <a href="http://"><h4 class="gallery__slide">JS card</h4></a>
                            </div>
                            <img src="assets/images/slider/jscard.png" alt="">
                        </div>
                        <div style="--i:3;">
                            <div class="gallery__container-title">
                                <a href="http://"><h4 class="gallery__slide">Landing</h4></a>
                            </div>
                            <img src="assets/images/slider/landingone.png" alt="">
                        </div>
                        <div style="--i:4;">
                            <div class="gallery__container-title">
                                <a href="http://"><h4 class="gallery__slide">Landing</h4></a>
                            </div>
                            <img src="assets/images/slider/landingsecond.png" alt="">
                        </div>
                        <div style="--i:5;">
                            <div class="gallery__container-title">
                                <a href="http://"><h4 class="gallery__slide">Landing on Tilda</h4></a>
                            </div>
                            <img src="assets/images/slider/landingtilda.png" alt="">
                        </div>
                        <div style="--i:6;">
                            <div class="gallery__container-title">
                                <a href="http://"><h4 class="gallery__slide">Визитка</h4></a>
                            </div>
                            <img src="assets/images/slider/mycard.png" alt="">
                        </div>--->
                    </div>
                    <div class="battons">
                        <div class="btn prev"></div>
                        <div class="btn next"></div>
                    </div>
                 </div>
            </section>
            <div class="decor">
                    <span class="line__decor"></span>
            </div>
            <section class="light__box">
                <div class="light__box-background">
                    <img src="assets/images/img/code.webp" alt="" class="backgraund__light">
                </div>
                <div class="light__content">
                    <div class="light__text-box">
                        <div class="text__box-light">
                            <h2 class="light__title">Мои достижения (мини резюме)</h2>
                            <span class="light__text-info">Сертификат, как и диплом, не значит что человек профессионал в пройденом материале. Допустим SEO и маркетинг я проходил для понимания что это вообще такое и для чего надо. Bootstrap я пока что не использую, поэтому на данный момент из-за отсутствия практики что то забывается. Но тем не менее, наличие сертификата подтверждает что человек хоть что-то да знает! &#128578;</span>
                        </div>
                    </div>
                    <div class="light__slider">
                        <div class="swiper mySwiper">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide">
                                    <img src="assets/images/achivement/html-css.png" alt="">
                                </div>
                                <div class="swiper-slide">
                                    <img src="assets/images/achivement/seo.png" alt="">
                                </div>
                                <div class="swiper-slide">
                                    <img src="assets/images/achivement/js-to-beginer.png" alt="">
                                </div>
                                <div class="swiper-slide">
                                    <img src="assets/images/achivement/js-bootstrap.png" alt="">
                                </div>
                                <div class="swiper-slide">
                                    <img src="assets/images/achivement/emmet.png" alt="">
                                </div>
                                <div class="swiper-slide">
                                    <img src="assets/images/achivement/marketing.png" alt="">
                                </div>
                                <div class="swiper-slide">
                                    <img src="assets/images/achivement/site-to-wordpress.png" alt="">
                                </div>
                            </div>
                            <div class="swiper-pagination"></div>
                            <div class="swiper-button-next"></div>
                            <div class="swiper-button-prev"></div>
                        </div>
                    </div>
                </div>
            </section>
            <div class="decor">
                    <span class="line__decor"></span>
            </div>
            <h2 class="title__style">Отзывы</h2>
            <section class="comment__container">
                <div class="comment__content">
                    <div class="comments-container" id="commentsContainer">
                        <!-- Отзывы будут загружаться здесь -->
                    </div>
                </div>
                <div class="comment__submit-content">
                    <h2 class="comment__submit-title">Здесь вы можете оставить свой отзыв</h2>
                    <form class="comment-form" id="commentForm">
                        <input type="text" name="name" placeholder="Ваше имя" required>
                        <textarea name="comment" placeholder="Ваш отзыв" required></textarea>
                        <button type="submit" class="btn__submit">Отправить отзыв</button>
                    </form>
                    
                    <!-- Панель администратора для редактирования -->
                    <div class="admin-panel" id="adminPanel">
                        <h3>Панель администратора</h3>
                        <input type="password" id="adminPassword" placeholder="Пароль">
                        <button id="loginAdmin">Войти</button>
                    </div>
                </div>
            </section>
            <h2 class="main__contact title__style">Мои контакты</h2>
            <section class="contact__container">
                <div class="contact__content">
                    <div class="header__contact contact__main">
                        <span>Заказать</span>
                    </div>
                    <div class="contact__phone-mail">
                        <div class="contact__mail"><a href="mailto:sergiobulankin@gmail.com" class="mail__link" target="_blank"><img src="assets/images/svg/mail.svg" alt="post"></a></div>
                        <div class="contact__phone"><a href="tel:+375257719027" class="phone__link">+375(25)771-90-27</a></div>
                    </div>
                    <div class="contact__social">
                        <a href="https://wa.me/375257719027" class="whatsapp__link" target="_blank"><img src="assets/images/svg/whatsapp.svg" alt="whatsapp"></a>
                        <a href="viber://chat?number=%2B375257719027" class="viber__link" target="_blank"><img src="assets/images/svg/viber.svg" alt="viber"></a>
                    </div>
                </div>
            </section>
            <div class="decor">
                    <span class="line__decor"></span>
            </div>
            <section class="footer">
                <img src="assets/images/img/footerbg.jpg" alt="" class="footer__bg">
                <div class="footer__rain-container">
                    <div class="cloud">
                        <h2 class="cloud__rain">Прибыль с вашего сайта!</h2>
                    </div>
                </div>
                <div class="footer__title title__style">
                    <h2>ип буланкин сергей</h2>
                    <h3>унп 193557766</h3>
                    <p class="footer__good-css">
                        <a href="#">
                            <img style="border:0;width:88px;height:31px" src="https://jigsaw.w3.org/css-validator/images/vcss-blue" alt="Правильный CSS!">
                        </a>
                    </p>
                    <div class="header__contact contact__footer">
                            <span>Заказать</span>
                    </div>
                </div>
                
            </section>
        </main>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js"></script>
    <script src="assets/script/comments.js"></script>
    <script src="assets/script/form.js"></script>
    <script src="assets/script/script.js"></script>
    <script src="assets/script/slider.js"></script>
    <script src="assets/script/rain.js"></script>
</body>
</html>