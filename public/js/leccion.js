document.addEventListener('DOMContentLoaded', () => {
    // --- Funcionalidad de Cambio de Lecciones ---
    const lessonItems = document.querySelectorAll('#lesson-list li'); // Elementos del índice lateral
    const lessonContents = document.querySelectorAll('.lesson-content'); // Todos los divs de lección
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');

    let currentLessonIndex = 0; // Empieza en la primera lección (0)

    function showLesson(index) {
        if (index < 0 || index >= lessonContents.length) {
            console.warn("Índice de lección fuera de rango.");
            return;
        }

        // Oculta todas las lecciones
        lessonContents.forEach(lesson => {
            lesson.classList.add('hidden');
        });

        // Muestra la lección deseada
        lessonContents[index].classList.remove('hidden');

        // Actualiza el estado 'active' en la barra lateral
        lessonItems.forEach((item, idx) => {
            if (idx === index) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Actualiza el índice de la lección actual
        currentLessonIndex = index;

        // Habilita/Deshabilita botones de navegación
        btnPrev.disabled = (currentLessonIndex === 0);
        btnNext.disabled = (currentLessonIndex === lessonContents.length - 1);

        // Desplaza la vista al inicio del contenido principal para una mejor UX
        document.querySelector('.content').scrollTop = 0; // O scroll al body si el contenedor no tiene scroll
        // window.scrollTo({ top: 0, behavior: 'smooth' }); // Alternativa para scroll de la ventana

        // *** IMPORTANTE PARA EL ACORDEÓN ***
        // Cuando cambias de lección, asegúrate de que el acordeón de la nueva lección
        // esté en su estado inicial (primer panel abierto, los demás cerrados)
        // Opcional: podrías mantener el estado del acordeón si quieres
        initializeAccordionState(lessonContents[index]);
    }

    // Event Listeners para los elementos del índice lateral
    lessonItems.forEach((item, index) => {
        item.addEventListener('click', (event) => {
            event.preventDefault(); // Evita que el enlace recargue la página
            showLesson(index);
        });
    });

    // Event Listeners para los botones de Anterior/Siguiente
    btnPrev.addEventListener('click', () => {
        if (currentLessonIndex > 0) {
            showLesson(currentLessonIndex - 1);
        }
    });

    btnNext.addEventListener('click', () => {
        if (currentLessonIndex < lessonContents.length - 1) {
            showLesson(currentLessonIndex + 1);
        }
    });

    // Mostrar la primera lección al cargar la página
    showLesson(currentLessonIndex);


    // --- Funcionalidad del Acordeón ---
    // Función para inicializar el estado del acordeón dentro de un contenedor dado
    function initializeAccordionState(container) {
        // Selecciona todos los paneles del acordeón DENTRO del contenedor
        const accordionItems = container.querySelectorAll('.accordion-item');

        accordionItems.forEach((item, index) => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');
            const icon = header.querySelector('.icon-toggle i'); // Si usas Font Awesome

            // Por defecto, solo el primer panel abierto, los demás cerrados
            if (index === 0) {
                header.classList.add('active');
                content.classList.add('show');
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.padding = '15px 20px';
                header.setAttribute('aria-expanded', 'true');
                if (icon) {
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                }
            } else {
                header.classList.remove('active');
                content.classList.remove('show');
                content.style.maxHeight = 0;
                content.style.padding = '0 20px';
                header.setAttribute('aria-expanded', 'false');
                if (icon) {
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                }
            }
        });
    }


    // Añadir event listeners a todos los encabezados del acordeón (globalmente)
    const allAccordionHeaders = document.querySelectorAll('.accordion-header');
    allAccordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.closest('.accordion-item');
            const accordionContent = accordionItem.querySelector('.accordion-content');
            const iconToggle = header.querySelector('.icon-toggle i'); // Asegúrate de que apunte al <i>

            const isActive = header.classList.contains('active');

            // Cierra todos los paneles activos en la misma lección para que solo uno esté abierto
            const currentLessonAccordionItems = header.closest('.lesson-content').querySelectorAll('.accordion-item');
            currentLessonAccordionItems.forEach(otherItem => {
                const otherHeader = otherItem.querySelector('.accordion-header');
                const otherContent = otherItem.querySelector('.accordion-content');
                const otherIcon = otherHeader.querySelector('.icon-toggle i');

                if (otherHeader.classList.contains('active') && otherHeader !== header) {
                    otherHeader.classList.remove('active');
                    otherContent.classList.remove('show');
                    otherContent.style.maxHeight = 0;
                    otherContent.style.padding = '0 20px';
                    if (otherIcon) {
                        otherIcon.classList.remove('fa-minus');
                        otherIcon.classList.add('fa-plus');
                    }
                    otherHeader.setAttribute('aria-expanded', 'false');
                }
            });

            // Abre o cierra el panel clicado
            if (isActive) {
                header.classList.remove('active');
                accordionContent.classList.remove('show');
                accordionContent.style.maxHeight = 0;
                accordionContent.style.padding = '0 20px';
                if (iconToggle) {
                    iconToggle.classList.remove('fa-minus');
                    iconToggle.classList.add('fa-plus');
                }
                header.setAttribute('aria-expanded', 'false');
            } else {
                header.classList.add('active');
                accordionContent.classList.add('show');
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
                accordionContent.style.padding = '15px 20px';
                if (iconToggle) {
                    iconToggle.classList.remove('fa-plus');
                    iconToggle.classList.add('fa-minus');
                }
                header.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // Llama a initializeAccordionState para la lección inicial al cargar
    initializeAccordionState(lessonContents[currentLessonIndex]);
});