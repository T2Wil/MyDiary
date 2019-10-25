const deleteIcon = document.querySelector('.delete-icon');

deleteIcon.addEventListener('click', () => {
    window.confirm('Are you sure you want to delete this permanently?');
}) ;
