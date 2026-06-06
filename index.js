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
        showMessage('Please enter a valid email format', 'error');
        return;
    }
    
    if (isSuspiciousDomain(email)) {
        showMessage('⚠️ Warning: Invalid email domain detected. Please check your email.', 'error');
        return;
    }
    
    if (!validateEmailDomain(email)) {
        showMessage('❌ Email domain is not recognized. Please use a valid email provider.', 'error');
        return;
    }
    
    // Simulate login
    console.log('Login attempt:', { email, password });
    showMessage('Login successful! Redirecting to student portal...', 'success');
    
    // Store user data
    const userName = email.split('@')[0];
    localStorage.setItem('studentEmail', email);
    localStorage.setItem('studentName', userName);
    
    setTimeout(() => {
        document.querySelector('.login-container').style.display = 'none';
        document.getElementById('orderingSystem').style.display = 'block';
        document.getElementById('userEmailDisplay').textContent = 'Welcome, ' + email;
        
        // Update profile card
        document.getElementById('profileName').textContent = userName;
        document.getElementById('profileRoll').textContent = 'Roll No: Not provided';
        document.getElementById('profileDept').textContent = 'Department: Not provided';
        
        document.getElementById('loginForm').reset();
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
        showMessage('Please enter a valid email format', 'error');
        return;
    }
    
    if (isSuspiciousDomain(signupemail)) {
        showMessage('⚠️ Warning: Invalid email domain detected. Please check your email.', 'error');
        return;
    }
    
    if (!validateEmailDomain(signupemail)) {
        showMessage('❌ Email domain is not recognized. Please use a valid email provider.', 'error');
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
    
    // Store user data
    localStorage.setItem('studentEmail', signupemail);
    localStorage.setItem('studentName', fullname);
    localStorage.setItem('rollNumber', rollno);
    localStorage.setItem('department', department);
    
    setTimeout(() => {
        document.querySelector('.login-container').style.display = 'none';
        document.getElementById('orderingSystem').style.display = 'block';
        document.getElementById('userEmailDisplay').textContent = 'Welcome, ' + fullname + ' (' + signupemail + ')';
        
        // Update profile card with signup details
        document.getElementById('profileName').textContent = fullname;
        document.getElementById('profileRoll').textContent = 'Roll No: ' + rollno;
        
        // Get department label
        const deptSelect = document.getElementById('department');
        const deptLabel = deptSelect.options[deptSelect.selectedIndex].text;
        document.getElementById('profileDept').textContent = 'Department: ' + deptLabel;
        
        document.getElementById('signupForm').reset();
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

// Logout Functionality - Admin Dashboard
document.getElementById('logoutBtn').addEventListener('click', function() {
    document.querySelector('.login-container').style.display = 'flex';
    document.getElementById('adminDashboard').style.display = 'none';
    document.getElementById('loginForm').reset();
    document.getElementById('signupForm').reset();
    localStorage.removeItem('studentEmail');
    localStorage.removeItem('studentName');
    localStorage.removeItem('rollNumber');
    localStorage.removeItem('department');
    showMessage('Logged out successfully', 'info');
});

// Logout Functionality - Student Portal
if (document.getElementById('userLogoutBtn')) {
    document.getElementById('userLogoutBtn').addEventListener('click', function() {
        document.querySelector('.login-container').style.display = 'flex';
        document.getElementById('orderingSystem').style.display = 'none';
        document.getElementById('loginForm').reset();
        document.getElementById('signupForm').reset();
        localStorage.removeItem('studentEmail');
        localStorage.removeItem('studentName');
        localStorage.removeItem('rollNumber');
        localStorage.removeItem('department');
        showMessage('Logged out successfully', 'info');
    });
}

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

// Enhanced Email Security - Check for valid domain
function validateEmailDomain(email) {
    // List of valid email domains (commonly used)
    const validDomains = [
        'gmail.com',
        'yahoo.com',
        'outlook.com',
        'hotmail.com',
        'college.edu',
        'university.edu',
        'mail.com',
        'protonmail.com',
        'icloud.com',
        'rediffmail.com',
        'sathyabama.ac.in',
        'student.sathyabama.ac.in'
    ];
    
    const domain = email.split('@')[1]?.toLowerCase();
    
    if (!domain) {
        return false;
    }
    
    // Check if domain is in valid domains list or has proper structure
    const isValidDomain = validDomains.includes(domain) || 
                          domain.includes('.') && 
                          domain.split('.').length >= 2 &&
                          domain.split('.').every(part => part.length > 0);
    
    return isValidDomain;
}

// Check for suspicious/invalid domains
function isSuspiciousDomain(email) {
    const domain = email.split('@')[1]?.toLowerCase() || '';
    
    // Check for common typos and invalid domains
    const suspiciousDomains = ['gmil.com', 'gmai.com', 'yahooo.com', 'hotmial.com', 'outlok.com'];
    
    return suspiciousDomains.includes(domain);
}

// Phone Validation Function
function validatePhone(phone) {
    const phoneRegex = /^[0-9\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Initialize
console.log('Hostal Mart Portal initialized');
