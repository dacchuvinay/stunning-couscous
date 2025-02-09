// script.js
let currentPassword = "KA30ML2005";
let currentCell = null;
let tradeData = [];
let weeklyData = [];

function checkPassword() {
    const password = document.getElementById('password').value;
    if (password === currentPassword) {
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('mainApp').style.display = 'block';
        loadSavedData();
    } else {
        alert("Incorrect password!");
    }
}

function showSecurityQuestion() {
    document.getElementById('securityModal').style.display = 'block';
}

function checkSecurityAnswer() {
    const answer = document.getElementById('securityAnswer').value;
    if (answer === "Deepseek") {
        const newPass = prompt("Enter new password:");
        currentPassword = newPass;
        alert("Password changed successfully!");
    } else {
        alert("Incorrect answer!");
    }
    document.getElementById('securityModal').style.display = 'none';
}

// Trade Handling
function addNewDay() {
    const date = new Date().toLocaleDateString();
    const day = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    
    const newDay = {
        date,
        day,
        trades: ['none', 'none', 'none']
    };
    
    tradeData.push(newDay);
    renderDailyTrades();
}

function openTradeModal(cell) {
    currentCell = cell;
    document.getElementById('tradeModal').style.display = 'block';
}

function setTradeOutcome(outcome) {
    const cellIndex = currentCell.cellIndex - 2;
    const rowIndex = currentCell.parentElement.rowIndex - 1;
    
    tradeData[rowIndex].trades[cellIndex] = outcome;
    
    currentCell.innerHTML = {
        'target': '✅',
        'stop': '❌',
        'none': '➖'
    }[outcome];
    
    currentCell.style.backgroundColor = 
        outcome === 'target' ? '#e8f5e9' :
        outcome === 'stop' ? '#ffebee' : 'white';
    
    document.getElementById('tradeModal').style.display = 'none';
    updateWeeklySummary();
}

// Weekly Data Handling
function updateWeeklySummary() {
    const currentWeek = getCurrentWeek();
    weeklyData[currentWeek] = calculateWeeklyPerformance();
    renderWeeklyData();
}

function calculateWeeklyPerformance() {
    const weekTrades = tradeData.slice(-5);
    const successRate = weekTrades.reduce((acc, day) => {
        return acc + day.trades.filter(t => t === 'target').length;
    }, 0) / 15 * 100;
    
    return {
        fromDate: weekTrades[0]?.date,
        toDate: weekTrades[4]?.date,
        capital: 0,
        growth: 0,
        successRate
    };
}

function renderWeeklyData() {
    const tbody = document.getElementById('weeklyDataBody');
    tbody.innerHTML = weeklyData.map((week, index) => `
        <tr>
            <td>Week ${index + 1}</td>
            <td>${week.growth}%</td>
            <td>${week.successRate.toFixed(1)}%</td>
            <td>${week.successRate >= 50 ? '✅' : '❌'}</td>
        </tr>
    `).join('');
}

// Utility Functions
function getCurrentWeek() {
    return Math.floor(tradeData.length / 5);
}

function loadSavedData() {
    const savedData = localStorage.getItem('tradeData');
    if (savedData) {
        tradeData = JSON.parse(savedData);
        renderDailyTrades();
    }
}

function renderDailyTrades() {
    const tbody = document.getElementById('dailyTradesBody');
    tbody.innerHTML = tradeData.map(day => `
        <tr>
            <td>${day.date}</td>
            <td>${day.day}</td>
            ${day.trades.map(t => `
                <td class="trade-cell" onclick="openTradeModal(this)">
                    ${t === 'target' ? '✅' : t === 'stop' ? '❌' : '➖'}
                </td>
            `).join('')}
        </tr>
    `).join('');
}

// Navigation
function toggleNav() {
    const nav = document.getElementById('mainNav');
    nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
}

function showDaily() {
    showSection('dailySection');
}

function showWeekly() {
    showSection('weeklySection');
    renderCapitalChart();
}

function showMonthly() {
    showSection('monthlySection');
    renderMonthlyChart();
}

function showSection(sectionId) {
    document.querySelectorAll('.page').forEach(el => el.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';
}

// Chart Handling
function renderCapitalChart() {
    const ctx = document.getElementById('capitalChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: weeklyData.map((_, i) => `Week ${i + 1}`),
            datasets: [{
                label: 'Capital Growth',
                data: weeklyData.map(w => w.growth),
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('tradeData')) {
        tradeData = JSON.parse(localStorage.getItem('tradeData'));
        renderDailyTrades();
    }
});