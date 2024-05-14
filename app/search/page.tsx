'use client'

export default function Search() {
  return (
    <div>
        Страница поиска поездок.
      <br/>
        Список результатов поездок
      <br/>
        Ссылки
        <ul>
            <li>
                <a href={'/'}>Главная. Поиск поездок</a>
            </li>
            <li>
                <a href={'/trip'}>Страница поездки</a>
            </li>
            <li>
                <a href={'/trip/1'}>Страница поездки 1</a>
            </li>
            <li>
            <a href={'/profile'}>Профиль</a>
            </li>
            <li>

            </li>
        </ul>
    </div>
  );
}
