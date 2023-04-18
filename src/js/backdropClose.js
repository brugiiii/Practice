import refs from './refs';

const { backdropEl, bodyEl } = refs;

export default function backdropClose() {
  if (!backdropEl.classList.contains('is-hidden')) {
    bodyEl.addEventListener('click', onBackdrop);
    bodyEl.addEventListener('keydown', onEsc);
  }
}

function onBackdrop(e) {
  if (e.target.classList.contains('backdrop')) {
    closeBackdrop();
    bodyEl.removeEventListener('click', onBackdrop);
  }
}

function onEsc(e) {
  if (e.code === 'Escape') {
    closeBackdrop();
    bodyEl.removeEventListener('keydown', onEsc);
  }
}

function closeBackdrop() {
  backdropEl.classList.add('is-hidden');
  bodyEl.style.overflow = 'visible';
}
