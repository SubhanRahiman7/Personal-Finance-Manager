export class Visualization {
    constructor() {
        this.expenseChart = document.getElementById('expense-chart');
        // Set a smaller size for the chart canvas
        this.expenseChart.style.maxWidth = '400px';
        this.expenseChart.style.maxHeight = '400px';
        this.expenseChart.style.margin = '20px auto'; // Center the chart
        
        this.initializeCharts();
        window.addEventListener('expensesUpdated', () => this.updateCharts());
    }

    initializeCharts() {
        this.createExpenseChart();
    }

    createExpenseChart() {
        const data = this.getExpenseData();
        
        if (window.expensePieChart) {
            window.expensePieChart.destroy();
        }

        window.expensePieChart = new Chart(this.expenseChart, {
            type: 'pie',
            data: {
                labels: Object.keys(data),
                datasets: [{
                    data: Object.values(data),
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#4BC0C0',
                        '#9966FF'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 10,
                            font: {
                                size: 12
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Expenses by Category',
                        font: {
                            size: 16
                        }
                    }
                }
            }
        });
    }

    getExpenseData() {
        const currentUser = localStorage.getItem('currentUser');
        const expenses = JSON.parse(localStorage.getItem(`expenses_${currentUser}`)) || [];
        
        return expenses.reduce((acc, expense) => {
            acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
            return acc;
        }, {});
    }

    updateCharts() {
        this.createExpenseChart();
    }
}

// Initialize visualization
const visualization = new Visualization();
