/**
 * DefectDojo UI Orchestrator
 * Handles Dark Mode, Sidebar persistence, and UI enhancements.
 */

(function() {
    'use strict';

    const UI = {
        init: function() {
            this.initTheme();
            this.initSidebar();
            this.applyTableEnhancements();
        },

        initTheme: function() {
            const savedTheme = localStorage.getItem('dojo-theme') || 'light';
            document.documentElement.setAttribute('data-theme', savedTheme);
            
            // Wait for DOM to add toggle listener
            document.addEventListener('DOMContentLoaded', () => {
                const toggleBtn = document.getElementById('theme-toggle');
                if (toggleBtn) {
                    this.updateToggleIcon(savedTheme);
                    toggleBtn.addEventListener('click', () => this.toggleTheme());
                }
            });
        },

        toggleTheme: function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('dojo-theme', newTheme);
            this.updateToggleIcon(newTheme);
        },

        updateToggleIcon: function(theme) {
            const icon = document.querySelector('#theme-toggle i');
            if (icon) {
                icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
            }
        },

        initSidebar: function() {
            document.addEventListener('DOMContentLoaded', () => {
                const sidebar = document.querySelector('.sidebar');
                const toggle = document.getElementById('minimize-menu');
                
                if (toggle) {
                    toggle.addEventListener('click', (e) => {
                        e.preventDefault();
                        document.body.classList.toggle('sidebar-collapsed');
                        const isCollapsed = document.body.classList.contains('sidebar-collapsed');
                        localStorage.setItem('dojo-sidebar-collapsed', isCollapsed);
                    });
                }

                // Restore state
                if (localStorage.getItem('dojo-sidebar-collapsed') === 'true') {
                    document.body.classList.add('sidebar-collapsed');
                }
            });
        },

        applyTableEnhancements: function() {
            // Future logic for table sorting/beautification
        }
    };

    UI.init();
})();
