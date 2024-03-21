fetch('answers.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Ошибка загрузки файла: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        console.log('Ответ получен от сервера:', data);

        // Используем Awesomplete для создания автодополнения
        const input = document.getElementById("search");
        const questions = data.map(item => item.title);
        new Awesomplete(input, { list: questions, minChars: 1 });

        // Обработчик события выбора вопроса
        input.addEventListener("awesomplete-selectcomplete", function(event) {
            const selectedQuestion = event.text.value;
            const selectedItem = data.find(item => item.title === selectedQuestion);
            if (selectedItem) {
                const selectedAnswer = selectedItem.purpose + "\n\n" + selectedItem.problem;
                const answerDisplay = document.getElementById("answer-display");
                answerDisplay.textContent = selectedAnswer;
                answerDisplay.style.display = 'block'; // Показываем блок с ответом

                // Скрываем текст "ЭП2Д"
                const ep2d = document.getElementById("ep2d");
                ep2d.style.display = 'none';
            } else {
                const answerDisplay = document.getElementById("answer-display");
                answerDisplay.style.display = 'none'; // Скрываем блок с ответом, если ответа нет
            }
        });
    })
    .catch(error => {
        console.error('Ошибка загрузки файла:', error);
    });

function clearInput() {
    document.getElementById('search').value = ''; // Очистка поля ввода
}
