'use client'

export default function Profile() {
  return (
    <div>
        Страница профиля пользователя, отображение
      <br/>
        Ссылки
      <ul>
        <li>
            <a href={'/'}>Главная. Поиск поездок</a>
        </li>
        <li>
            <a href={'/profile'}>Профиль</a>
        </li>
          <li>
              <a href={'/search'}>Поиск поездок</a>
          </li>
      </ul>
    </div>
  );
}
