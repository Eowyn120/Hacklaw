document.addEventListener('DOMContentLoaded', () => { // ¡Este es el ÚNICO DOMContentLoaded!

    // ===================================
    // LÓGICA DE LA ACTIVIDAD N1
    // ===================================
    const dragItems = document.querySelectorAll('.drag-item');
    const dropZones = document.querySelectorAll('.drop-zone');
    let draggedItem = null;

    dragItems.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            draggedItem = e.target;
            e.dataTransfer.setData('text/plain', e.target.dataset.category);
        });
    });

    dropZones.forEach(zone => {
        zone.addEventListener('dragover', (e) => {
            e.preventDefault(); // Permite soltar
        });

        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            if (draggedItem) {
                zone.appendChild(draggedItem);
                draggedItem = null;
            }
        });
    });

    // Listener para el botón de la Actividad 1
    const submitAct1Btn = document.getElementById('submit-act1');
    if (submitAct1Btn) { // Comprobación defensiva
        submitAct1Btn.addEventListener('click', () => {
            let correct = 0;
            const feedbackDiv = document.getElementById('feedback-act1');
            if (feedbackDiv) feedbackDiv.innerHTML = ''; // Comprobación defensiva

            dropZones.forEach(zone => {
                const targetCategory = zone.dataset.targetCategory;
                const itemsInZone = zone.querySelectorAll('.drag-item');
                itemsInZone.forEach(item => {
                    if (item.dataset.category === targetCategory) {
                        correct++;
                        item.style.backgroundColor = '#d4edda'; // Verde para correcto
                    } else {
                        item.style.backgroundColor = '#f8d7da'; // Rojo para incorrecto
                    }
                });
            });

            const totalItems = dragItems.length;
            const score = (correct / totalItems) * 100;
            if (feedbackDiv) feedbackDiv.innerHTML = `Has obtenido ${correct} de ${totalItems} respuestas correctas. Tu puntaje: ${score.toFixed(2)}%`;

            fetch('/users/actividades-1', { method: 'post', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ activity: 'act_1', score: score }) });
        });
    }

    // ===================================
    // LÓGICA DE LA ACTIVIDAD N2
    // ===================================
    const submitAct2Btn = document.getElementById('submit-act2');
    if (submitAct2Btn) { // Comprobación defensiva
        submitAct2Btn.addEventListener('click', () => {
            const answers = {
                q1: 'b',
                q2: 'c',
                q3: 'c'
            };
            let correctCount = 0;
            const totalQuestions = Object.keys(answers).length;
            const overallFeedbackDiv = document.getElementById('overall-feedback-act2');
            if (overallFeedbackDiv) overallFeedbackDiv.innerHTML = '';

            for (const q in answers) {
                const selectedOption = document.querySelector(`input[name="${q}"]:checked`);
                const feedbackDiv = document.getElementById(`feedback-${q}`);
                if (feedbackDiv) feedbackDiv.innerHTML = '';

                if (selectedOption) {
                    if (selectedOption.value === answers[q]) {
                        if (feedbackDiv) feedbackDiv.innerHTML = '<span style="color: green;">¡Correcto!</span>';
                        correctCount++;
                    } else {
                        if (feedbackDiv) feedbackDiv.innerHTML = `<span style="color: red;">Incorrecto. La respuesta correcta era: ${answers[q]}.</span>`;
                    }
                } else {
                    if (feedbackDiv) feedbackDiv.innerHTML = '<span style="color: orange;">Por favor, selecciona una opción.</span>';
                }
            }

            const score = (correctCount / totalQuestions) * 100;
            if (overallFeedbackDiv) overallFeedbackDiv.innerHTML = `Has acertado ${correctCount} de ${totalQuestions} preguntas. Tu puntaje: ${score.toFixed(2)}%`;

            fetch('/users/actividades-1', { method: 'post', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ activity: 'act_2', score: score }) });
        });
    }


    // ===================================
    // LÓGICA DE LA ACTIVIDAD N3
    // ===================================
    const dragItemsImpact = document.querySelectorAll('.drag-item-impact');
    const dropZonesImpact = document.querySelectorAll('.drop-zone-impact');
    let draggedItemImpact = null;

    dragItemsImpact.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            draggedItemImpact = e.target;
            e.dataTransfer.setData('text/plain', e.target.dataset.impact);
        });
    });

    dropZonesImpact.forEach(zone => {
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            if (draggedItemImpact && !zone.querySelector('.drag-item-impact')) {
                const clonedItem = draggedItemImpact.cloneNode(true);
                const droppedItemsContainer = zone.querySelector('.dropped-item');
                if (droppedItemsContainer) {
                    droppedItemsContainer.appendChild(clonedItem);
                } else {
                    zone.appendChild(clonedItem);
                }
                draggedItemImpact.style.display = 'none';
                draggedItemImpact = null;
            }
        });
    });

    const submitAct3Btn = document.getElementById('submit-act3');
    if (submitAct3Btn) { // Comprobación defensiva
        submitAct3Btn.addEventListener('click', () => {
            let correct = 0;
            const feedbackDiv = document.getElementById('feedback-act3');
            if (feedbackDiv) feedbackDiv.innerHTML = '';

            dropZonesImpact.forEach(zone => {
                const targetImpact = zone.dataset.targetImpact;
                const droppedItem = zone.querySelector('.dropped-item .drag-item-impact');

                if (droppedItem && droppedItem.dataset.impact === targetImpact) {
                    correct++;
                    droppedItem.style.backgroundColor = '#d4edda';
                } else if (droppedItem) {
                    droppedItem.style.backgroundColor = '#f8d7da';
                }
            });

            const totalItems = dropZonesImpact.length;
            const score = (correct / totalItems) * 100;
            if (feedbackDiv) feedbackDiv.innerHTML = `Has obtenido ${correct} de ${totalItems} respuestas correctas. Tu puntaje: ${score.toFixed(2)}%`;

            fetch('/users/actividades-1', { method: 'post', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ activity: 'act_3', score: score }) });
        });
    }

    // ===================================
    // LÓGICA DEL QUIZ MÓDULO 1
    // ===================================
    const submitQuizFinalBtn = document.getElementById('submit-quiz-final');
    if (submitQuizFinalBtn) { // Comprobación defensiva
        submitQuizFinalBtn.addEventListener('click', async () => {
            const answers = {
                quiz_q1: 'c',
                quiz_q2: 'd',
                quiz_q3: 'b',
                quiz_q4: 'b',
                quiz_q5: 'c'
            };
            let correctCount = 0;
            const totalQuestions = Object.keys(answers).length;
            const quizOverallFeedbackDiv = document.getElementById('quiz-overall-feedback');
            if (quizOverallFeedbackDiv) quizOverallFeedbackDiv.innerHTML = '';

            for (const q in answers) {
                const selectedOption = document.querySelector(`input[name="${q}"]:checked`);
                const feedbackDiv = document.getElementById(`quiz-feedback-${q}`);

                if (feedbackDiv) { // Verifica si el elemento existe antes de manipularlo
                    feedbackDiv.innerHTML = ''; // Limpiar feedback anterior
                }

                if (selectedOption) {
                    if (selectedOption.value === answers[q]) {
                        if (feedbackDiv) feedbackDiv.innerHTML = '<span style="color: green;">¡Correcto!</span>';
                        correctCount++;
                    } else {
                        if (feedbackDiv) feedbackDiv.innerHTML = `<span style="color: red;">Incorrecto. La respuesta correcta era: ${answers[q]}.</span>`;
                    }
                } else {
                    if (feedbackDiv) feedbackDiv.innerHTML = '<span style="color: orange;">Por favor, selecciona una opción.</span>';
                }
            }

            const score = (correctCount / totalQuestions) * 100;
            if (quizOverallFeedbackDiv) quizOverallFeedbackDiv.innerHTML = `Has acertado ${correctCount} de ${totalQuestions} preguntas. Tu puntaje: ${score.toFixed(2)}%`;

            try {
                const response = await fetch('/users/quiz-1', {
                    method: 'post',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ quiz: 'quiz_1', score: score })
                });
                const data = await response.json();
                if (response.ok) {
                    if (quizOverallFeedbackDiv) quizOverallFeedbackDiv.innerHTML += `<br>${data.message}`;
                    if (data.unlockedNextModule) {
                        alert("¡Felicidades! Has aprobado el Módulo 1 y el Módulo 2 ha sido desbloqueado.");
                    }
                } else {
                    if (quizOverallFeedbackDiv) quizOverallFeedbackDiv.innerHTML += `<br>Error al guardar el puntaje: ${data.message}`;
                }
            } catch (error) {
                console.error('Error al enviar el puntaje del quiz:', error);
                if (quizOverallFeedbackDiv) quizOverallFeedbackDiv.innerHTML += '<br>Error de conexión al servidor.';
            }
        });
    }

}); // ¡Este es el único y gran cierre de DOMContentLoaded!