// Form Handler Script

// Contact Form Handler
function initContactForm() {
    const contactForms = document.querySelectorAll('[data-netlify="true"]');

    contactForms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            const formMessage = form.querySelector('.form-message') || document.getElementById('form-message');
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;

            // Show loading state
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            try {
                // Submit to Netlify
                const response = await fetch('/', {
                    method: 'POST',
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: new URLSearchParams(new FormData(this)).toString()
                });

                if (response.ok) {
                    // Show success message
                    if (formMessage) {
                        formMessage.className = 'form-message success';
                        formMessage.textContent = 'Thank you for your message! We\'ll get back to you within 24 hours.';
                        formMessage.style.display = 'block';

                        // Hide message after 5 seconds
                        setTimeout(() => {
                            formMessage.style.display = 'none';
                        }, 5000);
                    }

                    // Reset form
                    form.reset();
                } else {
                    throw new Error('Form submission failed');
                }

            } catch (error) {
                // Show error message
                if (formMessage) {
                    formMessage.className = 'form-message error';
                    formMessage.textContent = 'Something went wrong. Please try again or call us directly.';
                    formMessage.style.display = 'block';
                }

                console.error('Form submission error:', error);
            } finally {
                // Reset button state
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }
        });
    });
}

// Form Validation
function initFormValidation() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');

        inputs.forEach(input => {
            // Real-time validation
            input.addEventListener('blur', function() {
                validateInput(this);
            });

            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateInput(this);
                }
            });
        });

        // Form submission validation
        form.addEventListener('submit', function(e) {
            let isValid = true;

            inputs.forEach(input => {
                if (!validateInput(input)) {
                    isValid = false;
                }
            });

            if (!isValid) {
                e.preventDefault();
            }
        });
    });
}

// Validate individual input
function validateInput(input) {
    const value = input.value.trim();
    const type = input.type;
    let isValid = true;
    let errorMessage = '';

    // Remove existing error
    removeError(input);

    // Check if required field is empty
    if (input.hasAttribute('required') && !value) {
        errorMessage = 'This field is required';
        isValid = false;
    }
    // Email validation
    else if (type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            errorMessage = 'Please enter a valid email address';
            isValid = false;
        }
    }
    // Phone validation
    else if (type === 'tel' && value) {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(value) || value.replace(/\D/g, '').length < 10) {
            errorMessage = 'Please enter a valid phone number';
            isValid = false;
        }
    }
    // Minimum length validation
    else if (input.minLength > 0 && value.length < input.minLength) {
        errorMessage = `Minimum ${input.minLength} characters required`;
        isValid = false;
    }

    if (!isValid) {
        showError(input, errorMessage);
    }

    return isValid;
}

// Show error message
function showError(input, message) {
    input.classList.add('error');

    const errorElement = document.createElement('span');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        display: block;
        color: var(--danger);
        font-size: 0.875rem;
        margin-top: 0.25rem;
    `;

    input.parentElement.appendChild(errorElement);
}

// Remove error message
function removeError(input) {
    input.classList.remove('error');

    const errorElement = input.parentElement.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

// Auto-format phone number
function initPhoneFormatting() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');

    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');

            if (value.length > 0) {
                if (value.length <= 3) {
                    value = `(${value}`;
                } else if (value.length <= 6) {
                    value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
                } else {
                    value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
                }
            }

            e.target.value = value;
        });
    });
}

// PDF Form Handling
function initPDFForm() {
    const pdfForm = document.getElementById('patient-form');

    if (pdfForm) {
        pdfForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            // Generate PDF (simplified version)
            generatePatientPDF(data);
        });
    }
}

// Generate Patient PDF
function generatePatientPDF(data) {
    // This is a simplified version
    // In production, use jsPDF or similar library

    console.log('Generating PDF with data:', data);

    // Create a blob with the data
    const content = `
        PATIENT INFORMATION FORM
        ========================

        Name: ${data.firstName} ${data.lastName}
        Date of Birth: ${data.dob}
        Phone: ${data.phone}
        Email: ${data.email}

        Insurance Information:
        Provider: ${data.insurance}
        Policy Number: ${data.policyNumber}

        Medical History:
        ${data.medicalHistory || 'N/A'}

        Current Medications:
        ${data.medications || 'None'}

        Emergency Contact:
        Name: ${data.emergencyName}
        Phone: ${data.emergencyPhone}

        Date: ${new Date().toLocaleDateString()}
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    // Create download link
    const a = document.createElement('a');
    a.href = url;
    a.download = `patient_form_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Show success message
    showFormMessage('success', 'Form downloaded successfully!');
}

// Show form message
function showFormMessage(type, message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-alert ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? 'var(--success)' : 'var(--danger)'};
        color: white;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        animation: slideInRight 0.5s ease;
    `;

    document.body.appendChild(messageDiv);

    setTimeout(() => {
        messageDiv.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 500);
    }, 3000);
}

// File Upload Handler
function initFileUpload() {
    const fileInputs = document.querySelectorAll('input[type="file"]');

    fileInputs.forEach(input => {
        const label = input.nextElementSibling;

        input.addEventListener('change', function(e) {
            const fileName = e.target.files[0]?.name || 'Choose file';
            if (label) {
                label.textContent = fileName;
            }

            // Validate file size (5MB max)
            if (e.target.files[0] && e.target.files[0].size > 5 * 1024 * 1024) {
                showError(input, 'File size must be less than 5MB');
                input.value = '';
                if (label) {
                    label.textContent = 'Choose file';
                }
            }
        });
    });
}

// Progress Bar for Multi-Step Form
function initMultiStepForm() {
    const multiStepForm = document.querySelector('.multi-step-form');

    if (multiStepForm) {
        const steps = multiStepForm.querySelectorAll('.form-step');
        const progressBar = multiStepForm.querySelector('.progress-bar');
        const nextButtons = multiStepForm.querySelectorAll('.btn-next');
        const prevButtons = multiStepForm.querySelectorAll('.btn-prev');
        let currentStep = 0;

        function showStep(stepIndex) {
            steps.forEach((step, index) => {
                step.style.display = index === stepIndex ? 'block' : 'none';
            });

            // Update progress bar
            const progress = ((stepIndex + 1) / steps.length) * 100;
            if (progressBar) {
                progressBar.style.width = `${progress}%`;
            }

            // Update step indicators
            const indicators = multiStepForm.querySelectorAll('.step-indicator');
            indicators.forEach((indicator, index) => {
                if (index <= stepIndex) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        }

        nextButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Validate current step
                const currentStepElement = steps[currentStep];
                const requiredInputs = currentStepElement.querySelectorAll('input[required], select[required], textarea[required]');
                let isValid = true;

                requiredInputs.forEach(input => {
                    if (!validateInput(input)) {
                        isValid = false;
                    }
                });

                if (isValid && currentStep < steps.length - 1) {
                    currentStep++;
                    showStep(currentStep);
                    window.scrollTo(0, multiStepForm.offsetTop - 100);
                }
            });
        });

        prevButtons.forEach(button => {
            button.addEventListener('click', function() {
                if (currentStep > 0) {
                    currentStep--;
                    showStep(currentStep);
                    window.scrollTo(0, multiStepForm.offsetTop - 100);
                }
            });
        });

        // Initialize
        showStep(currentStep);
    }
}

// Auto-save Form Data
function initAutoSave() {
    const forms = document.querySelectorAll('[data-autosave]');

    forms.forEach(form => {
        const formId = form.dataset.autosave || 'form_' + Date.now();

        // Load saved data
        const savedData = localStorage.getItem(formId);
        if (savedData) {
            const data = JSON.parse(savedData);
            Object.keys(data).forEach(key => {
                const input = form.querySelector(`[name="${key}"]`);
                if (input) {
                    input.value = data[key];
                }
            });
        }

        // Save data on input
        let saveTimeout;
        form.addEventListener('input', function() {
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(() => {
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);
                localStorage.setItem(formId, JSON.stringify(data));

                // Show save indicator
                showSaveIndicator();
            }, 1000);
        });

        // Clear saved data on successful submission
        form.addEventListener('submit', function() {
            localStorage.removeItem(formId);
        });
    });
}

// Show save indicator
function showSaveIndicator() {
    const indicator = document.createElement('div');
    indicator.textContent = 'Saved';
    indicator.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 0.5rem 1rem;
        background: var(--success);
        color: white;
        border-radius: var(--border-radius);
        font-size: 0.875rem;
        opacity: 0;
        animation: fadeIn 0.3s ease forwards;
    `;

    document.body.appendChild(indicator);

    setTimeout(() => {
        indicator.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => {
            document.body.removeChild(indicator);
        }, 300);
    }, 2000);
}

// Initialize all form features
document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    initFormValidation();
    initPhoneFormatting();
    initPDFForm();
    initFileUpload();
    initMultiStepForm();
    initAutoSave();

    console.log('Form handlers initialized');
});