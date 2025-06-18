// frontend/script.js
const API = 'http://localhost:3000';   
function getToken() {
  return localStorage.getItem('token');    
}
document.getElementById('voteForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const selected   = document.querySelector('input[name="party"]:checked');
  const messageBox = document.getElementById('message');

  if (!selected) {
    messageBox.style.color = 'red';
    messageBox.textContent = '❌ Please select a party before submitting.';
    return;
  }

  // 1) Read token
  const token = getToken();
  if (!token) {
    messageBox.style.color = 'red';
    messageBox.textContent = '❌ You must log in first.';
    return;
  }

  // 2) Send vote
  try {
    const res = await fetch(`${API}/candidate/vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,          // 👈  SEND TOKEN
      },
      body: JSON.stringify({ candidateId: selected.value }), // 👈  _id, not party code
    });

    const data = await res.json();

    if (res.ok) {
      messageBox.style.color = 'green';
      messageBox.textContent = data.message || '✅ Vote recorded successfully!';
    } else {
      messageBox.style.color = 'red';
      messageBox.textContent = data.message || data.error || '❌ Vote failed.';
    }
  } catch (err) {
    console.error(err);
    messageBox.style.color = 'red';
    messageBox.textContent = '❌ Server error. Please try again.';
  }
});

