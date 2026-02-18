// Projects functionality
import { db } from './firebase-config.js';
import { collection, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const projectsGrid = document.getElementById('projectsGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
let currentFilter = 'all';
let allProjects = [];

// Modal elements
const modal = document.createElement('div');
modal.className = 'modal';
modal.innerHTML = `
    <span class="close-modal">&times;</span>
    <div class="modal-content-container"></div>
    <div class="modal-caption"></div>
`;
document.body.appendChild(modal);

// Load projects from Firebase
function loadProjects() {
    if (!projectsGrid) return;
    
    const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    
    projectsGrid.innerHTML = '<div class="spinner"></div>';
    
    onSnapshot(q, (snapshot) => {
        allProjects = [];
        
        snapshot.forEach((doc) => {
            allProjects.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        filterAndDisplayProjects();
    }, (error) => {
        console.error('Error loading projects:', error);
        projectsGrid.innerHTML = '<p class="error">Failed to load projects.</p>';
    });
}

// Filter and display projects
function filterAndDisplayProjects() {
    const filtered = currentFilter === 'all' 
        ? allProjects 
        : allProjects.filter(p => p.category === currentFilter);
    
    if (filtered.length === 0) {
        projectsGrid.innerHTML = '<p class="no-items">No projects in this category.</p>';
        return;
    }
    
    projectsGrid.innerHTML = '';
    filtered.forEach(project => {
        const projectItem = createProjectItem(project);
        projectsGrid.appendChild(projectItem);
    });
}

// Create project item
function createProjectItem(project) {
    const item = document.createElement('div');
    item.className = 'project-item';
    
    let mediaContent;
    
    if (project.mediaType === 'image') {
        mediaContent = `<img src="${project.imageBase64}" alt="${project.title}" loading="lazy">`;
    } else {
        const thumbnail = project.thumbnail || `https://img.youtube.com/vi/${project.videoId}/maxresdefault.jpg`;
        mediaContent = `
            <div class="video-thumbnail" style="background-image: url('${thumbnail}')">
                <i class="fas fa-play-circle"></i>
            </div>
        `;
    }
    
    item.innerHTML = `
        <div class="project-media">
            ${mediaContent}
        </div>
        <div class="project-info">
            <h3>${project.title}</h3>
            <p>${project.description.substring(0, 100)}...</p>
            <span class="project-category">${project.category}</span>
        </div>
    `;
    
    // Add click handler for modal
    item.addEventListener('click', () => openProjectModal(project));
    
    return item;
}

// Open project modal
function openProjectModal(project) {
    const container = modal.querySelector('.modal-content-container');
    const caption = modal.querySelector('.modal-caption');
    
    container.innerHTML = '';
    
    if (project.mediaType === 'image') {
        const img = document.createElement('img');
        img.src = project.imageBase64;
        img.className = 'modal-content';
        container.appendChild(img);
    } else {
        const iframe = document.createElement('iframe');
        iframe.className = 'modal-video';
        
        if (project.videoPlatform === 'youtube') {
            iframe.src = `https://www.youtube.com/embed/${project.videoId}?autoplay=1`;
        } else if (project.videoPlatform === 'vimeo') {
            iframe.src = `https://player.vimeo.com/video/${project.videoId}?autoplay=1`;
        }
        
        iframe.allow = 'autoplay; fullscreen';
        iframe.allowFullscreen = true;
        container.appendChild(iframe);
    }
    
    caption.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <p>Category: ${project.category}</p>
    `;
    
    modal.classList.add('show');
}

// Close modal
modal.querySelector('.close-modal').addEventListener('click', () => {
    modal.classList.remove('show');
    modal.querySelector('.modal-content-container').innerHTML = '';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
        modal.querySelector('.modal-content-container').innerHTML = '';
    }
});

// Category filters
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        currentFilter = btn.dataset.filter;
        filterAndDisplayProjects();
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', loadProjects);