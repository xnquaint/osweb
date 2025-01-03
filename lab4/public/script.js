document.getElementById('addForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch('/apartments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        location.reload();
    } else {
        const error = await response.text();
        alert('Помилка: ' + error);
    }
});
