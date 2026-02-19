// Quotation Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const quotationForm = document.getElementById('quotationForm');
    const toast = document.getElementById('toast');
    
    if (quotationForm) {
        quotationForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Disable button and show loading
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Collect form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            showToast('Quotation request sent successfully! We will contact you within 24 hours.');
            
            // Reset form
            this.reset();
            
            // Restore button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        });
    }
    
    // File upload preview
    const designFile = document.getElementById('designFile');
    if (designFile) {
        designFile.addEventListener('change', function(e) {
            const label = this.nextElementSibling;
            const fileName = this.files[0]?.name;
            
            if (fileName) {
                const span = label.querySelector('span');
                span.innerHTML = `<i class="fas fa-check-circle" style="color: var(--gold);"></i> ${fileName}`;
            } else {
                const span = label.querySelector('span');
                span.innerHTML = 'Click to upload or drag and drop';
            }
        });
    }
    
    // Toast notification function
    function showToast(message) {
        toast.querySelector('.toast-content').textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 5000);
    }
    
    // Scroll to quotation when CTA button is clicked
    const whyCta = document.getElementById('whyCta');
    if (whyCta) {
        whyCta.addEventListener('click', function() {
            document.getElementById('quotation').scrollIntoView({ behavior: 'smooth' });
        });
    }
});