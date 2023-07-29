'use strict';

///////////////////////////////////////
// Modal window

//variables
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const firstSection = document.getElementById('section--1');
const secondSection = document.getElementById('section--2');
const tabs = document.querySelectorAll('.operations__tab');
const tabContent = document.querySelectorAll('.operations__content');
const tabContainer = document.querySelector('.operations__tab-container');
const nav = document.querySelector('.nav');
const sections = document.querySelectorAll('.section');

//functions

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// addEventListener

btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);

overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScrollTo.addEventListener('click', () => {
  firstSection.scrollIntoView({ behavior: 'smooth' });
});

/**
 * tab comp
 */
tabContainer.addEventListener('click', e => {
  const clickedTab = e.target.closest('.operations__tab');
  if (!clickedTab) return;

  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabContent.forEach(content =>
    content.classList.remove('operations__content--active')
  );

  clickedTab.classList.add('operations__tab--active');
  tabContent[clickedTab.dataset.tab - 1].classList.add(
    'operations__content--active'
  );
});

/**
 *passing arguments
 */
//()=>{} no this

const showLinks = function (e, opacity) {
  const link = e.target;
  const siblings = link.closest('.nav').querySelectorAll('.nav__link');
  const logo = link.closest('.nav').querySelector('.nav__logo');
  if (!e.target.classList.contains('nav__link')) return;
  siblings.forEach(sibling => {
    if (link !== sibling) sibling.style.opacity = this;
  });
  logo.style.opacity = this;
};
nav.addEventListener('mouseover', showLinks.bind(0.5));
nav.addEventListener('mouseout', showLinks.bind(1));
/**
 * sticky nav
 */
const header = document.querySelector('.header');
const stickyNav = entries => {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};
const navHeight = nav.getBoundingClientRect().height;
const navObserver = new IntersectionObserver(stickyNav, {
  root: null,
  rootMargin: `-${navHeight}px`,
  threshold: 0,
});

navObserver.observe(header);

/**
 * reveal on scroll
 */
const reavealSections = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
sections.forEach(section => {
  section.classList.add('section--hidden');
});
const firstSectiontop = firstSection.getBoundingClientRect().top;
const sectionObserver = new IntersectionObserver(reavealSections, {
  root: null,
  threshold: 0.1,
});
sections.forEach(section => {
  sectionObserver.observe(section);
});

/**
 * Lazy loading
 */
const LazyImages = document.querySelectorAll('img[data-src]');
const lazyLoad = (entries, observer) => {
  const [entry] = entries;
  const image = entry.target;
  if (!entry.isIntersecting) return;
  image.src = image.dataset.src;
  image.addEventListener('load', () => {
    image.classList.remove('lazy-img');
  });
  observer.unobserve(image);
};
const imageObserver = new IntersectionObserver(lazyLoad, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
LazyImages.forEach(img => {
  imageObserver.observe(img);
});
