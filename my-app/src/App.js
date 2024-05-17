import { useState } from 'react';
import styles from './App.module.css';

export const App = () => {
	const [value, setValue] = useState('');
	const [list, setList] = useState([]);
	const [error, setError] = useState('');

	const isValueVaild = value.length >= 3;

	const onInputButtonClick = () => {
		let promptValue = prompt('Введите значение');

		if (promptValue.length >= 3) {
			setValue(promptValue);
			setError('');
		} else {
			setError('Введенное значение должно содержать минимум 3 символа');
		}
	};

	const onAddButtonClick = () => {
		let id = Date.now();
		let currentDate = new Date();
		const options = {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour12: false,
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
		};

		console.log(value, id);

		if (value && isValueVaild) {
			setList((updatedList) => [
				...updatedList,
				{
					id: id,
					value: value,
					date: currentDate
						.toLocaleDateString('en-US', options)
						.replaceAll('/', '.'),
				},
			]);
			setValue('');
			setError('');
		}
	};

	let listItem = list.map((item) => {
		return (
			<li className={styles['list-item']} key={item.id}>
				{item.value} {item.date}
			</li>
		);
	});

	return (
		<>
			<div className={styles.app}>
				<h1 className={styles['page-heading']}>Ввод значения</h1>
				{!error && (
					<p className={styles['no-margin-text']}>
						Текущее значение <code>value</code>: "
						<output className={styles['current-value']}>{value}</output>"
					</p>
				)}
				{error !== '' && <div className={styles.error}>{error}</div>}
				<div className={styles['buttons-container']}>
					<button className={styles.button} onClick={onInputButtonClick}>
						Ввести новое
					</button>
					<button
						className={styles.button}
						disabled={!isValueVaild}
						onClick={onAddButtonClick}
					>
						Добавить в список
					</button>
				</div>
				<div className={styles['list-container']}>
					<h2 className={styles['list-heading']}>Список:</h2>
					{list == '' && (
						<p className={styles['no-margin-text']}>
							Нет добавленных элементов
						</p>
					)}
					<ul className={styles.list}>{listItem}</ul>
				</div>
			</div>
		</>
	);
};
