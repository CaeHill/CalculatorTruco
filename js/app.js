// Função para inicializar o drag and drop das cartas
function initDragAndDrop() {
    // Seleciona todas as imagens das cartas na mão
    const cardImages = document.querySelectorAll('.cardHandImg');

    // Para cada imagem, torna arrastável e adiciona eventos
    cardImages.forEach(img => {
        img.draggable = true; // Permite arrastar a imagem

        img.addEventListener('dragstart', (event) => {
            // Passa a URL da imagem como dado transferido
            event.dataTransfer.setData('text/plain', img.src);
        });
    });

    // Seleciona todos os slots na mesa (cardTable)
    const cardSlots = document.querySelectorAll('.cardTable');

    // Para cada slot, adiciona eventos de drop
    cardSlots.forEach(slot => {
        slot.addEventListener('dragover', (event) => {
            event.preventDefault(); // Permite o drop
        });

        slot.addEventListener('drop', (event) => {
            event.preventDefault();
            const src = event.dataTransfer.getData('text/plain');
            if (src) {
                // Aplica a imagem como background do slot
                slot.style.backgroundImage = `url(${src})`;
                slot.style.backgroundSize = '100% 100%';
                slot.style.backgroundPosition = 'center';
                slot.style.backgroundRepeat = 'no-repeat';
                slot.style.boxShadow = '0 8px 16px 8px rgba(0, 0, 0, 0.3)';
            }
        });
    });
}

// Inicializa quando a página carrega
document.addEventListener('DOMContentLoaded', initDragAndDrop);