import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs.sendForm(
      'service_lbozzrn',
      'template_ooxhrbm',
      form.current,
      'KSLBfNI5NEVgBSdhy'
    ).then(
      () => {
        setIsSubmitting(false);
        setSubmitStatus('success');
        form.current.reset();
        setTimeout(() => setSubmitStatus(null), 5000);
      },
      (error) => {
        setIsSubmitting(false);
        setSubmitStatus('error');
        console.error(error.text);
        setTimeout(() => setSubmitStatus(null), 5000);
      }
    );
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <div className="mb-3">
          <i className="bi bi-envelope-fill text-primary fs-1"></i>
        </div>
        <h1 className="fw-bold">Get In Touch</h1>
        <p className="text-muted">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
      </div>

      <div className="card shadow bg-light">
        <div className="card-body p-4">
          {submitStatus === 'success' && (
            <div className="alert alert-success d-flex align-items-center" role="alert">
              <i className="bi bi-check-circle-fill me-2"></i>
              Message sent successfully! We'll get back to you soon.
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="alert alert-danger d-flex align-items-center" role="alert">
              <i className="bi bi-exclamation-circle-fill me-2"></i>
              Failed to send message. Please try again later.
            </div>
          )}

          <form ref={form} onSubmit={sendEmail}>
            <div className="mb-3">
              <label className="form-label">Full Name *</label>
              <input 
                type="text" 
                name="from_name" 
                className="form-control" 
                placeholder="Enter your full name" 
                required 
                disabled={isSubmitting}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email Address *</label>
              <input 
                type="email" 
                name="from_email" 
                className="form-control" 
                placeholder="Enter your email address" 
                required 
                disabled={isSubmitting}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Job Title / Designation</label>
              <input 
                type="text" 
                name="designation" 
                className="form-control" 
                placeholder="e.g., Product Manager, Developer, CEO" 
                disabled={isSubmitting}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Message *</label>
              <textarea 
                name="message" 
                rows="5" 
                className="form-control" 
                placeholder="Tell us about your project, questions, or feedback..." 
                required 
                disabled={isSubmitting}
              ></textarea>
            </div>

            <div className="d-grid">
              <button 
                type="submit" 
                className={`btn ${isSubmitting ? 'btn-secondary' : 'btn-primary'}`} 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Sending Message...
                  </span>
                ) : (
                  <span>
                    Send Message <i className="bi bi-send ms-2"></i>
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="card-footer bg-light text-center py-3">
          <div className="row">
            <div className="col-md-4 mb-2">
              <i className="bi bi-envelope text-primary me-2"></i>
              <a href="mailto:shaiksohail0726@gmail.com" className="text-decoration-none">shaiksohail0726@gmail.com</a>
            </div>
            <div className="col-md-4 mb-2">
              <i className="bi bi-telephone text-primary me-2"></i>
              <a href="tel:+919392764775" className="text-decoration-none">+91 9392764775</a>
            </div>
            <div className="col-md-4">
              <i className="bi bi-clock text-primary me-2"></i>
              Response within 24h
            </div>
          </div>
        </div>
      </div>

      <p className="text-center text-muted mt-3 small">
        All information is kept confidential and will only be used to respond to your inquiry.
      </p>
    </div>
  );
};

export default Contact;