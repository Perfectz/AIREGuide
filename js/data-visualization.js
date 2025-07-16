// data-visualization.js - Advanced data visualization and analytics

class DataVisualization {
    constructor() {
        this.charts = new Map();
        this.metrics = {};
        this.init();
    }

    init() {
        this.loadChartLibrary();
        this.setupEventListeners();
        this.initializeDashboards();
    }

    async loadChartLibrary() {
        // Load Chart.js if not already loaded
        if (typeof Chart === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
            script.onload = () => this.initializeCharts();
            document.head.appendChild(script);
        } else {
            this.initializeCharts();
        }
    }

    setupEventListeners() {
        // Listen for dashboard visibility
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadDashboardData(entry.target.dataset.dashboard);
                }
            });
        });

        document.querySelectorAll('[data-dashboard]').forEach(el => {
            observer.observe(el);
        });
    }

    initializeDashboards() {
        this.createMarketTrendsChart();
        this.createProgressTrackingChart();
        this.createPerformanceMetrics();
        this.createInteractivePromptBuilder();
    }

    createMarketTrendsChart() {
        const ctx = document.getElementById('marketTrendsChart');
        if (!ctx) return;

        const data = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Average Home Price',
                data: [450000, 465000, 480000, 475000, 490000, 505000],
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4
            }, {
                label: 'Days on Market',
                data: [45, 42, 38, 35, 32, 28],
                borderColor: 'rgb(239, 68, 68)',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                tension: 0.4,
                yAxisID: 'y1'
            }]
        };

        const config = {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                // For accessibility, consider providing the chart data in a table format
                // or as descriptive text alternatives for screen reader users.
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Price ($)'
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Days'
                        },
                        grid: {
                            drawOnChartArea: false,
                        },
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Market Trends - Last 6 Months'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                if (context.datasetIndex === 0) {
                                    return `Price: $${context.parsed.y.toLocaleString()}`;
                                } else {
                                    return `Days: ${context.parsed.y}`;
                                }
                            }
                        }
                    }
                }
            }
        };

        this.charts.set('marketTrends', new Chart(ctx, config));
    }

    createProgressTrackingChart() {
        const ctx = document.getElementById('progressChart');
        if (!ctx) return;

        const data = {
            labels: ['Core Formula', 'Buyer Personas', 'Ad Copy', 'Omnichannel', 'Multimedia'],
            datasets: [{
                label: 'Completion %',
                data: [100, 85, 60, 40, 20],
                backgroundColor: [
                    'rgba(34, 197, 94, 0.8)',
                    'rgba(34, 197, 94, 0.6)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(239, 68, 68, 0.6)',
                    'rgba(239, 68, 68, 0.4)'
                ],
                borderColor: [
                    'rgb(34, 197, 94)',
                    'rgb(34, 197, 94)',
                    'rgb(245, 158, 11)',
                    'rgb(239, 68, 68)',
                    'rgb(239, 68, 68)'
                ],
                borderWidth: 2
            }]
        };

        const config = {
            type: 'doughnut',
            data: data,
            options: {
                responsive: true,
                // For accessibility, consider providing the chart data in a table format
                // or as descriptive text alternatives for screen reader users.
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    title: {
                        display: true,
                        text: 'Learning Progress'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.parsed}%`;
                            }
                        }
                    }
                }
            }
        };

        this.charts.set('progress', new Chart(ctx, config));
    }

    createPerformanceMetrics() {
        this.metrics = {
            totalPrompts: 156,
            successRate: 87,
            timeSaved: 23.5,
            averageRating: 4.6
        };

        this.updateMetricsDisplay();
    }

    updateMetricsDisplay() {
        const metricsContainer = document.getElementById('performanceMetrics');
        if (!metricsContainer) return;

        const metricIcons = {
            totalPrompts: '📝',
            successRate: '✅',
            timeSaved: '⏱️',
            averageRating: '⭐'
        };
        const metricLabels = {
            totalPrompts: 'Prompts Generated',
            successRate: 'Success Rate',
            timeSaved: 'Time Saved',
            averageRating: 'Average Rating'
        };

        const metricCardsHTML = Object.keys(this.metrics).map(key => `
                <div class="metric-card">
                    <div class="metric-icon">${metricIcons[key]}</div>
                    <div class="metric-value">${this.metrics[key]}${key === 'successRate' ? '%' : key === 'timeSaved' ? 'h' : ''}</div>
                    <div class="metric-label">${metricLabels[key]}</div>
                </div>
        `).join('');

        metricsContainer.innerHTML = `
            <div class="metrics-grid">
                ${metricCardsHTML}
            </div>
        `;
    }

    createInteractivePromptBuilder() {
        const builder = document.getElementById('promptBuilder');
        if (!builder) return;

        builder.innerHTML = `
            <div class="prompt-builder-container">
                <div class="builder-toolbar">
                    <button class="tool-btn" data-component="persona">
                        <span class="tool-icon">👤</span>
                        Add Persona
                    </button>
                    <button class="tool-btn" data-component="property">
                        <span class="tool-icon">🏠</span>
                        Add Property
                    </button>
                    <button class="tool-btn" data-component="tone">
                        <span class="tool-icon">🎭</span>
                        Set Tone
                    </button>
                    <button class="tool-btn" data-component="compliance">
                        <span class="tool-icon">⚖️</span>
                        Compliance Check
                    </button>
                </div>
                
                <div class="builder-workspace">
                    <div class="prompt-preview" id="promptPreview">
                        <div class="preview-placeholder">
                            Your prompt will appear here...
                        </div>
                    </div>
                    
                    <div class="prompt-components" id="promptComponents">
                        <!-- Dynamic components will be added here -->
                    </div>
                </div>
                
                <div class="builder-output">
                    <button class="btn btn-primary" onclick="dataViz.generatePrompt()">
                        <!-- Ensure button has sufficient touch target size on mobile -->
                        <span class="btn-icon">🚀</span>
                        Generate Prompt
                    </button>
                    <button class="btn btn-secondary" onclick="dataViz.savePrompt()">
                        <span class="btn-icon">💾</span>
                        Save Template
                    </button>
                    <button class="btn btn-ghost" onclick="dataViz.clearPrompt()">
                        <!-- Ensure button has sufficient touch target size on mobile -->
                        <span class="btn-icon">🗑️</span>
                        Clear
                    </button>
                </div>
            </div>
        `;

        this.setupPromptBuilderEvents();
    }

    setupPromptBuilderEvents() {
        document.querySelectorAll('.tool-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const component = e.currentTarget.dataset.component;
                // Ensure toolbar buttons have sufficient touch target size in CSS
                this.addPromptComponent(component);
            });
        });
    }

    addPromptComponent(componentType) {
        const componentsContainer = document.getElementById('promptComponents');
        const componentId = `component-${Date.now()}`;

        const componentTemplates = {
            persona: {
                title: 'Buyer Persona',
                content: `
                    <!-- Add ARIA attributes to dynamically added inputs -->
                    <div class="component-input">
                        <label>Persona Name:</label>
                        <input type="text" placeholder="e.g., Urban Starter" class="component-field">
                    </div>
                    <div class="component-input">
                        <!-- Add ARIA attributes to dynamically added textareas -->
                        <label>Key Characteristics:</label>
                        <textarea placeholder="Describe their needs, pain points, and preferences" class="component-field"></textarea>
                    </div>
                `
            },
            property: {
                title: 'Property Details',
                content: `
                    <!-- Add ARIA attributes to dynamically added selects -->
                    <div class="component-input">
                        <label>Property Type:</label>
                        <select class="component-field">
                            <option>Single Family Home</option>
                            <option>Condo</option>
                            <option>Townhouse</option>
                            <option>Multi-family</option>
                        </select>
                    </div>
                    <div class="component-input">
                        <!-- Add ARIA attributes to dynamically added textareas -->
                        <label>Key Features:</label>
                        <textarea placeholder="List the most attractive features" class="component-field"></textarea>
                    </div>
                `
            },
            tone: {
                title: 'Tone & Style',
                content: `
                    <!-- Add ARIA attributes to dynamically added selects -->
                    <div class="component-input">
                        <label>Desired Tone:</label>
                        <select class="component-field">
                            <option>Professional</option>
                            <option>Friendly</option>
                            <option>Luxury</option>
                            <option>Casual</option>
                        </select>
                    </div>
                    <div class="component-input">
                        <!-- Add ARIA attributes to dynamically added selects -->
                        <label>Target Length:</label>
                        <select class="component-field">
                            <option>Short (50-100 words)</option>
                            <option>Medium (100-200 words)</option>
                            <option>Long (200+ words)</option>
                        </select>
                    </div>
                `
            },
            compliance: {
                title: 'Compliance Check',
                content: `
                    <!-- Ensure checkbox labels are correctly associated with inputs -->
                    <div class="component-input">
                        <label>Fair Housing Focus:</label>
                        <div class="checkbox-group">
                            <label><input type="checkbox" checked> Avoid protected class references</label>
                            <label><input type="checkbox" checked> Use inclusive language</label>
                            <label><input type="checkbox" checked> Focus on property features</label>
                        </div>
                    </div>
                `
            }
        };

        const template = componentTemplates[componentType];
        if (!template) return;

        const componentElement = document.createElement('div');
        componentElement.className = 'prompt-component';
        componentElement.id = componentId;
        componentElement.innerHTML = `
            <div class="component-header">
                <h4>${template.title}</h4>
                <button class="remove-component" onclick="dataViz.removeComponent('${componentId}')">×</button>
            </div>
            <div class="component-content">
                ${template.content}
            </div>
        `;

        componentsContainer.appendChild(componentElement);
        this.updatePromptPreview();
    }

    removeComponent(componentId) {
        const component = document.getElementById(componentId);
        if (component) {
            component.remove();
            this.updatePromptPreview();
        }
    }

    updatePromptPreview() {
        // Consider adding ARIA live regions if the preview updates frequently and significantly
        const preview = document.getElementById('promptPreview');
        const components = document.querySelectorAll('.prompt-component');
        
        if (components.length === 0) {
            preview.innerHTML = '<div class="preview-placeholder">Your prompt will appear here...</div>';
            return;
        }

        let promptText = 'Act as an expert real estate copywriter. ';
        
        components.forEach(component => {
            const inputs = component.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                if (input.value) {
                    promptText += `\n\n${input.placeholder || input.name}: ${input.value}`;
                }
            });
        });

        promptText += '\n\nPlease create compelling, Fair Housing compliant copy based on the above information.';

        preview.innerHTML = `
            <div class="prompt-text">
                <pre>${promptText}</pre>
            </div>
        `;
    }

    generatePrompt() {
        const preview = document.getElementById('promptPreview');
        const promptText = preview.querySelector('pre')?.textContent;
        
        if (promptText) {
            // Copy to clipboard
            navigator.clipboard.writeText(promptText).then(() => {
                this.showNotification('Prompt copied to clipboard!', 'success');
            });
        }
    }

    savePrompt() {
        const preview = document.getElementById('promptPreview');
        const promptText = preview.querySelector('pre')?.textContent;
        
        if (promptText) {
            const savedPrompts = JSON.parse(localStorage.getItem('savedPrompts') || '[]');
            savedPrompts.push({
                id: Date.now(),
                text: promptText,
                timestamp: new Date().toISOString(),
                name: `Template ${savedPrompts.length + 1}`
            });
            localStorage.setItem('savedPrompts', JSON.stringify(savedPrompts));
            this.showNotification('Template saved successfully!', 'success');
        }
    }

    clearPrompt() {
        const componentsContainer = document.getElementById('promptComponents');
        componentsContainer.innerHTML = '';
        this.updatePromptPreview();
    }

    loadDashboardData(dashboardType) {
        // Simulate loading data for different dashboard types
        switch (dashboardType) {
            case 'market':
                this.updateMarketData();
                break;
            case 'performance':
                this.updatePerformanceData();
                break;
            case 'progress':
                this.updateProgressData();
                break;
        }
    }

    updateMarketData() {
        // Simulate real-time market data updates
        const marketData = {
            averagePrice: 505000 + Math.floor(Math.random() * 10000),
            daysOnMarket: 28 + Math.floor(Math.random() * 10),
            inventory: 1250 + Math.floor(Math.random() * 100),
            pricePerSqFt: 285 + Math.floor(Math.random() * 20)
        };

        // Update chart data
        const chart = this.charts.get('marketTrends');
        if (chart) {
            chart.data.datasets[0].data.push(marketData.averagePrice);
            chart.data.datasets[1].data.push(marketData.daysOnMarket);
            chart.data.labels.push('Jul');
            chart.update();
        }
    }

    updatePerformanceData() {
        // Simulate performance metrics updates
        this.metrics.totalPrompts += Math.floor(Math.random() * 5);
        this.metrics.successRate = Math.min(100, this.metrics.successRate + Math.floor(Math.random() * 3));
        this.metrics.timeSaved += Math.random() * 2;
        this.metrics.averageRating = Math.min(5, this.metrics.averageRating + Math.random() * 0.1);
        
        this.updateMetricsDisplay();
    }

    updateProgressData() {
        // Simulate progress updates
        const progressChart = this.charts.get('progress');
        if (progressChart) {
            progressChart.data.datasets[0].data = progressChart.data.datasets[0].data.map(value => 
                Math.min(100, value + Math.floor(Math.random() * 5))
            );
            progressChart.update();
        }
    }
}

// Initialize data visualization
const dataViz = new DataVisualization();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DataVisualization;
} 