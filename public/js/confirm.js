const forms = document.querySelectorAll('.delete');

forms.forEach(form => {
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const confirm = window.confirm('Are you sure to remove... ?');
    if(confirm){
      form.submit();
    }
  })
})