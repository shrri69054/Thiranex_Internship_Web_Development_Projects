/**
 * contact-form.js — Accessible form validation
 * Implements WCAG 2.1 success criteria:
 *   3.3.1 Error Identification
 *   3.3.2 Labels or Instructions
 *   3.3.3 Error Suggestion
 *   4.1.3 Status Messages
 */

'use strict';

(function initContactForm() {
  const form          = document.getElementById('contact-form');
  const submitBtn     = document.getElementById('submit-btn');
  const submitStatus  = document.getElementById('submit-status');
  const successBanner = document.getElementById('form-success');
  const errorBanner   = document.getElementById('form-error-banner');

  if (!form) return;

  /* ── Field validators ──────────────────────────────────── */
  const validators = {
    name: value => {
      if (!value.trim()) return 'Please enter your full name.';
      if (value.trim().length < 2) return 'Name must be at least 2 characters.';
      return null;
    },
    email: value => {
      if (!value.trim()) return 'Please enter your email address.';
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(value.trim())) return 'Please enter a valid email address (e.g. you@example.com).';
      return null;
    },
    subject: value => {
      if (!value) return 'Please select what this enquiry is about.';
      return null;
    },
    message: value => {
      if (!value.trim()) return 'Please enter a message.';
      if (value.trim().length < 20) return `Message is too short (${value.trim().length}/20 characters minimum).`;
      return null;
    },
    consent: (_, el) => {
      if (!el.checked) return 'Please confirm you agree to your data being stored to handle this enquiry.';
      return null;
    }
  };

  /* ── Show/clear field error ─────────────────────────────── */
  function setFieldError(fieldId, message) {
    const field   = document.getElementById(fieldId);
    const errorEl = document.getElementById(`${fieldId}-error`);
    const group   = document.getElementById(`group-${fieldId}`);
    if (!field || !errorEl) return;

    if (message) {
      errorEl.textContent = message;
      errorEl.hidden = false;
      field.setAttribute('aria-invalid', 'true');
      if (group) group.classList.add('has-error');
    } else {
      errorEl.textContent = '';
      errorEl.hidden = true;
      field.setAttribute('aria-invalid', 'false');
      if (group) group.classList.remove('has-error');
    }
  }

  /* ── Validate a single field ────────────────────────────── */
  function validateField(fieldId) {
    const field     = document.getElementById(fieldId);
    const validator = validators[fieldId];
    if (!field || !validator) return true;

    const error = validator(field.value, field);
    setFieldError(fieldId, error);
    return !error;
  }

  /* ── Live validation on blur ────────────────────────────── */
  ['name', 'email', 'subject', 'message'].forEach(id => {
    const field = document.getElementById(id);
    if (!field) return;

    field.addEventListener('blur', () => validateField(id));

    // Clear error once user starts correcting
    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') === 'true') {
        validateField(id);
      }
    });
  });

  const consentEl = document.getElementById('consent');
  if (consentEl) {
    consentEl.addEventListener('change', () => validateField('consent'));
  }

  /* ── Submit ─────────────────────────────────────────────── */
  form.addEventListener('submit', async e => {
    e.preventDefault();

    // Hide banners
    successBanner.hidden = true;
    errorBanner.hidden   = true;

    // Validate all required fields
    const fieldsToValidate = ['name', 'email', 'subject', 'message', 'consent'];
    const results = fieldsToValidate.map(id => validateField(id));
    const isValid = results.every(Boolean);

    if (!isValid) {
      // Focus first invalid field
      const firstInvalid = fieldsToValidate.find(id => {
        const el = document.getElementById(id);
        return el && el.getAttribute('aria-invalid') === 'true';
      });
      if (firstInvalid) document.getElementById(firstInvalid).focus();

      errorBanner.hidden = false;
      document.getElementById('form-error-message').textContent =
        'Please correct the errors below before submitting.';
      return;
    }

    // Set loading state
    submitBtn.setAttribute('aria-busy', 'true');
    submitBtn.textContent = 'Sending…';
    submitStatus.textContent = 'Sending your message, please wait.';

    try {
      // Simulate async submission (replace with real fetch in production)
      await new Promise(resolve => setTimeout(resolve, 1200));

      // Success
      form.hidden = true;
      successBanner.hidden = false;
      successBanner.focus();
      submitStatus.textContent = 'Message sent successfully.';

    } catch (err) {
      submitBtn.removeAttribute('aria-busy');
      submitBtn.textContent = 'Send message';
      submitStatus.textContent = '';

      errorBanner.hidden = false;
      document.getElementById('form-error-message').textContent =
        'Something went wrong. Please try again or email hello@alexrivera.dev directly.';
      errorBanner.focus();
    }
  });
})();
