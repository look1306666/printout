document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const formType = this.getAttribute('data-form');
        
        // Update active button
        document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Update active form
        document.querySelectorAll('.form').forEach(form => form.classList.remove('active'));
        document.getElementById(formType + 'Form').classList.add('active');
        
        // Reset status message when switching forms
        document.getElementById('statusMessage').classList.remove('show');
    });
});

// Password Toggle Visibility
document.querySelectorAll('.toggle-password').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const input = this.parentElement.querySelector('input');
        const icon = this.querySelector('i');
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });
});

// Login Form Submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Validation
    if (!email || !password) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showMessage('Please enter a valid email', 'error');
        return;
    }
    
    // Simulate login
    console.log('Login attempt:', { email, password });
    showMessage('Login successful! Redirecting...', 'success');
    
    setTimeout(() => {
        document.querySelector('.login-container').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'block';
    }, 1500);
});

// Sign Up Form Submission
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const fullname = document.getElementById('fullname').value;
    const rollno = document.getElementById('rollno').value;
    const department = document.getElementById('department').value;
    const phone = document.getElementById('phone').value;
    const signupemail = document.getElementById('signupemail').value;
    const signuppassword = document.getElementById('signuppassword').value;
    
    // Validation
    if (!fullname || !rollno || !department || !phone || !signupemail || !signuppassword) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    if (!validateEmail(signupemail)) {
        showMessage('Please enter a valid email', 'error');
        return;
    }
    
    if (signuppassword.length < 8) {
        showMessage('Password must be at least 8 characters', 'error');
        return;
    }
    
    if (!validatePhone(phone)) {
        showMessage('Please enter a valid phone number', 'error');
        return;
    }
    
    // Simulate signup
    console.log('Signup attempt:', {
        fullname,
        rollno,
        department,
        phone,
        signupemail,
        signuppassword
    });
    
    showMessage('Account created successfully! Logging in...', 'success');
    
    setTimeout(() => {
        document.querySelector('.login-container').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'block';
    }, 1500);
});

// Admin Login Form Submission
document.getElementById('adminForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const adminEmail = document.getElementById('adminEmail').value;
    const adminPassword = document.getElementById('adminPassword').value;
    const ADMIN_EMAIL = 'hemanthraj@gmil.com';
    const ADMIN_PASSWORD = 'akshit@15066';
    
    // Validation
    if (!adminEmail || !adminPassword) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    if (!validateEmail(adminEmail)) {
        showMessage('Please enter a valid admin email', 'error');
        return;
    }
    
    if (adminEmail !== ADMIN_EMAIL) {
        showMessage('Invalid admin email. Access denied.', 'error');
        return;
    }
    
    if (adminPassword !== ADMIN_PASSWORD) {
        showMessage('Invalid admin password. Access denied.', 'error');
        return;
    }
    
    // Simulate admin login
    console.log('Admin login attempt:', { adminEmail, adminPassword });
    showMessage('Admin authentication successful! Redirecting...', 'success');
    
    setTimeout(() => {
        document.querySelector('.login-container').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'block';
    }, 1500);
});

// Logout Functionality
document.getElementById('logoutBtn').addEventListener('click', function() {
    document.querySelector('.login-container').style.display = 'flex';
    document.getElementById('adminDashboard').style.display = 'none';
    document.getElementById('loginForm').reset();
    document.getElementById('signupForm').reset();
    showMessage('Logged out successfully', 'info');
});

// Admin Tab Switching
document.querySelectorAll('.admin-tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const tabName = this.getAttribute('data-tab');
        
        // Update active button
        document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Update active tab content
        document.querySelectorAll('.admin-tab-content').forEach(tab => tab.classList.remove('active'));
        document.getElementById(tabName + '-tab').classList.add('active');
    });
});

// Social Login Buttons
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const provider = this.classList[1];
        showMessage(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login coming soon!`, 'info');
    });
});

// Forgot Password Link
document.querySelector('.forgot-link').addEventListener('click', function(e) {
    e.preventDefault();
    showMessage('Password reset link sent to your email', 'success');
});

// Message Display Function
function showMessage(message, type) {
    const messageElement = document.getElementById('statusMessage');
    messageElement.textContent = message;
    messageElement.className = 'status-message show ' + type;
    
    setTimeout(() => {
        messageElement.classList.remove('show');
    }, 3000);
}

// Email Validation Function
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone Validation Function
function validatePhone(phone) {
    const phoneRegex = /^[0-9\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Initialize
console.log('Hostal Mart Portal initialized');
