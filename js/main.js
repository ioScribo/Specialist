const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav-links');

function toggleMenu() {
	const isOpen = menu.classList.toggle('active');
	toggle.classList.toggle('active');
	toggle.setAttribute('aria-expanded', isOpen);

	if (isOpen) {
		document.addEventListener('click', closeOnClickOutside);
	}
	else {
		document.removeEventListener('click', closeOnClickOutside);
	}
}

function closeOnClickOutside(e) {
	if (!menu.contains(e.target) && !toggle.contains(e.target)) {
		toggleMenu();
	}
}

toggle.addEventListener('click', toggleMenu);

menu.querySelectorAll('a').forEach(link => {
	link.addEventListener('click', toggleMenu);
});

document.getElementById('copyright-year').textContent = new Date().getFullYear();