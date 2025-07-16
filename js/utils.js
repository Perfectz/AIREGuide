// js/utils.js - Utility functions for notifications and local storage

export class NotificationManager {
    static showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    static showSuccessMessage(message) {
        this.showNotification(message, 'success');
    }

    static showErrorMessage(message) {
        this.showNotification(message, 'error');
    }
}


export class LocalStorageManager {
    static loadData(key, defaultValue) {
        try {
            const saved = localStorage.getItem(key);
            return saved ? JSON.parse(saved) : defaultValue;
        } catch (error) {
            console.error(`Error loading data from ${key}:`, error);
            return defaultValue;
        }
    }

    static saveData(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.error(`Error saving data to ${key}:`, error);
        }
    }
}