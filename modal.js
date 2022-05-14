var modalBtn = document.getElementById('addButton');
var modalBg = document.querySelector('.modal-bg');
var cancelBtn = document.getElementById('closeModalBtn');

modalBtn.addEventListener('click', function() {
    modalBg.classList.add('modal-active');
});

cancelBtn.addEventListener('click', function() {
    modalBg.classList.remove('modal-active')
});