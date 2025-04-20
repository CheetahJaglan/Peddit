window.onclick = function(event) {
    const modal = document.getElementById('deleteModal');
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }