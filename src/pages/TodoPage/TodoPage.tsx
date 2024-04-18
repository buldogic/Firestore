import Input from 'components/Input';
import Button from 'components/Button';
import { useNavigate } from 'react-router-dom';
import styles from './TodoPage.module.scss';

const TodoPage = () => {
  const navigate = useNavigate()
  const goBack = () => navigate(-1)
  return (
    <div className={styles.root}>
      <h2>Создайте вишлист</h2>
      <p>
        Вы можете сохранять в вишлист маршруты городов, которые планируете посетить или изучить информацию по городам
        для будущих поездок
      </p>
      <div>
        <Input value='Название' onChange={() => {}}/>
      </div>
      <div>
        <Input value='Описание' onChange={() => {}}/>
      </div>
      <Button>Добавить</Button>
       <Button onClick={goBack}>Назад</Button>
    </div>
  );
};

export default TodoPage