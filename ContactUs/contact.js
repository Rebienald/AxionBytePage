

(function(){
	const EMAILJS_USER_ID = 'AkbnMuvq1VaCYsC--';
	const SERVICE_ID = 'service_ozr759m';
	const TEMPLATE_ID = 'template_hptoa2k';

	if (window.emailjs) {
		emailjs.init(EMAILJS_USER_ID);
	}

	const form = document.getElementById('contact-form');
	const statusEl = document.getElementById('form-status');
	const clearBtn = document.getElementById('clear-btn');

	function setStatus(msg, isError) {
		statusEl.textContent = msg;
		statusEl.style.color = isError ? '#ff0000ff' : 'var(--text-secondary)';
	}

	clearBtn.addEventListener('click', () => {
		form.reset();
		setStatus('', false);
	});

	form.addEventListener('submit', function (e) {
		e.preventDefault();

		const from_name = form.from_name.value.trim();
		const from_email = form.from_email.value.trim();
		const subject = form.subject.value.trim();
		const message = form.message.value.trim();

		if (!from_name || !from_email || !subject || !message) {
			setStatus('Please fill in all fields.', true);
			return;
		}

		setStatus('Sending...', false);

		const templateParams = {
			from_name,
			from_email,
			subject,
			message
		};

		if (!EMAILJS_USER_ID || EMAILJS_USER_ID === 'YOUR_EMAILJS_USER_ID') {
			setStatus('Please configure EmailJS IDs in contact.js', true);
			return;
		}

		emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
			.then(function() {
				setStatus('Message sent. Thank you!', false);
				form.reset();
			}, function(error) {
				console.error('EmailJS error:', error);
				setStatus('Failed to send message. Check console for details.', true);
			});
	});
})();

