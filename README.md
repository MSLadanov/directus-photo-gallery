 <h1>Directus Photo Gallery</h1>
Этот проект представляет собой фотогалерею, построенную с использованием Directus, обеспечивающую простой и эффективный способ управления и отображения изображений.

<h2>Возможности</h2>
<ul>
  <li>Управление изображениями: Легко загружайте, организуйте и управляйте вашей коллекцией фотографий.</li>
  <li>Интеграция с Directus: Использует Directus как headless CMS для управления на стороне сервера.</li>
  <li>Адаптивный дизайн: Обеспечивает бесшовный опыт на всех устройствах.</li>
</ul>

<h2>Начало работы</h2>
<h3>Предварительные требования</h3>
<ul>
  <li><strong>Node.js</strong> (версия 14 или выше)</li>
  <li><strong>Directus</strong> (версия 9 или выше)</li>
</ul>

<h3>Установка</h3>
<ol>
  <li><strong>Клонируйте репозиторий:</strong>
      <pre><code>git clone https://github.com/MSLadanov/directus-photo-gallery</code></pre>
  </li>
  <li><strong>Перейдите в директорию Directus:</strong>
      <pre><code>cd photo-gallery/directus</code></pre>
  </li>
    <li><strong>Запустите Docker-контейнеры:</strong>
        <pre><code>docker compose up</code></pre>
      </li>
</ol>

<h3>Доступ к приложению:</h3>
<ul>
  <li>Откройте браузер и перейдите на <a href="http://localhost:3000">http://localhost:3000</a>, чтобы просмотреть галерею.</li>
  <li>Откройте браузер и перейдите на <a href="http://localhost:3000/directus/admin/login">http://localhost:3000/directus/admin/login</a>, для использования админ-панели.</li>
</ul>  
<h2>Использование</h2>
  <ul>
    <li><strong>Загрузка фотографий:</strong> Используйте админ-панель Directus для загрузки и управления фотографиями.</li>
    <li><strong>Учетные данные для входа в админ-панель:</strong> Логин: <code>directus@example.com</code> | Пароль: <code>d1r3ctu5</code></li>
    <li><strong>Просмотр галереи:</strong> Перейдите на главную страницу, чтобы просмотреть коллекцию фотографий.</li>
</ul>
<h2>Использованный стек:</h2>
  <ul>
    <li><strong>Backend:</strong> Directus</li>
    <li><strong>Frontend:</strong> React, TypeScript, MobX, styled-components, Webpack, React Router DOM v6 и прекрасная иконочка в лого от Font Awesome.</li>
</ul>

<h2>Реализованный функционал</h2>
<ul>
    <li>✔️ Загрузка фото на backend через админку Directus</li>
    <li>✔️ На frontend-е реализовано отображение списка загруженных фото и возможность кликнуть по фото для его открытия в большем размере во всплывающем окне</li>
    <li>✔️ Верстка не ломается</li>
    <li>✔️ Мобильная верстка</li>
    <li>✔️ Админка Directus доступна по адресу /directus</li>
    <li>✔️ Предусмотрена пагинация в списке фотографий. И в списке альбомов тоже, но для проверки уж очень много фоток надо натырить на Freepik :D</li>
    <li>✔️ Предусмотрен механизм альбомов</li>
    <li>✔️ Реализовано переключение фото внутри альбома по стрелкам не покидая всплывающего окна</li>
    <li>✔️ Реализован роутинг, который позволяет скопировать ссылку на любой альбом и фото внутри него</li>
    <li>✔️ Добавлена поддержка превьюшек</li>
    <li>✔️ Frontend приложение обернуто в docker-контейнер и настроен docker-compose вместе с Directus</li>
</ul>

<h2>Галерея альбомов:</h2> 
<img width="638" alt="Albums" src="https://github.com/user-attachments/assets/13ee3724-e5d0-46cb-949d-a6623caa0461">
<h2>Галерея фотографий:</h2>
<img width="638" alt="Photos" src="https://github.com/user-attachments/assets/8bfe38c5-3a0e-4f8f-bbef-7c73fc6a7461">
<h2>Модальное окно с фотографией:</h2>
<img width="638" alt="Modal" src="https://github.com/user-attachments/assets/391765a7-4206-4fca-b81d-7d10d70c63fb">
