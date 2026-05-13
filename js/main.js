const API_BASE = '/v1';

const toTitle = s => {
    if (!s || typeof s !== 'string') return '---';
    return s.toLowerCase()
            .split(' ')
            .filter(word => word.length > 0)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
};

function formatDate(isoStr) {
    if (!isoStr) return '---';
    const d = new Date(isoStr);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    const hours = d.getHours().toString().padStart(2, '0');
    const mins = d.getMinutes().toString().padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${mins}`;
}

function showToast(msg) {
    const container = document.getElementById('toast-container'); if (!container) return;
    const t = document.createElement('div'); t.className = 'toast'; t.innerText = msg;
    container.appendChild(t); setTimeout(() => t.remove(), 3000);
}
