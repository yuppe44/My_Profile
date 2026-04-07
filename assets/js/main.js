// ---- Theme toggle ----

const toggle = document.getElementById('themeToggle');

function applyTheme(dark) {
    document.body.classList.toggle('dark', dark);
    toggle.textContent = dark ? 'Light' : 'Dark';
}

const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme === 'dark');

toggle.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark');
    applyTheme(!isDark);
    localStorage.setItem('theme', !isDark ? 'dark' : 'light');
    renderChart();
});

// ---- Big Five radar chart ----

let chart = null;

function getChartColors() {
    const dark = document.body.classList.contains('dark');
    return {
        grid:  dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
        tick:  dark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)',
        label: dark ? '#d0d0d0' : '#333',
        fill:  dark ? 'rgba(83,74,183,0.28)' : 'rgba(83,74,183,0.12)',
    };
}

function renderChart() {
    if (chart) chart.destroy();
    const c = getChartColors();
    chart = new Chart(document.getElementById('bfRadar'), {
        type: 'radar',
        data: {
            labels: ['神経症的傾向', '外向性', '開放性', '協調性', '誠実性'],
            datasets: [{
                data: [75, 25, 80, 25, 85],
                fill: true,
                backgroundColor: c.fill,
                borderColor: '#534AB7',
                borderWidth: 2,
                pointBackgroundColor: '#534AB7',
                pointRadius: 4,
                pointHoverRadius: 6,
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                r: {
                    min: 0,
                    max: 100,
                    ticks: {
                        stepSize: 25,
                        color: c.tick,
                        font: { size: 10 },
                        backdropColor: 'transparent',
                    },
                    grid: { color: c.grid },
                    angleLines: { color: c.grid },
                    pointLabels: { color: c.label, font: { size: 12 } },
                },
            },
        },
    });
}

renderChart();
