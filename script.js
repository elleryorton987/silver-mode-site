const revealElements = document.querySelectorAll('.reveal');
const mockSteps = document.querySelectorAll('.mock-step');
const mockupScreen = document.getElementById('mockupScreen');
const screenTitle = document.getElementById('screenTitle');
const screenStatus = document.getElementById('screenStatus');
const screenNarration = document.getElementById('screenNarration');
const waitlistForm = document.querySelector('.waitlist');

const stepContent = {
  destination: {
    title: 'Destination at a glance',
    status: 'One-tap route clarity',
    narration:
      'First reveal: destination becomes the single most obvious action, so the next step feels effortless.'
  },
  music: {
    title: 'Comfort controls follow',
    status: 'Calm cabin support',
    narration:
      'Second reveal: music appears next, helping reduce stress while keeping driving controls clean and visible.'
  },
  drive: {
    title: 'Core drive controls stay central',
    status: 'Drive · Reverse · Park',
    narration:
      'Third reveal: the largest controls are always the most important ones, with labels that are impossible to miss.'
  },
  help: {
    title: 'Family help is always close',
    status: 'Confidence backup ready',
    narration:
      'Final reveal: support options stay one tap away so drivers and families both feel more secure.'
  }
};

const supportsMotionPreference = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (supportsMotionPreference) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: '0px 0px -8% 0px'
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add('visible'));
}

function setActiveStep(step) {
  mockupScreen.dataset.active = step;

  mockSteps.forEach((node) => {
    node.classList.toggle('is-active', node.dataset.step === step);
  });

  screenTitle.textContent = stepContent[step].title;
  screenStatus.textContent = stepContent[step].status;
  screenNarration.textContent = stepContent[step].narration;
}

const stepObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveStep(entry.target.dataset.step);
      }
    });
  },
  {
    threshold: 0.66,
    rootMargin: '-8% 0px -28% 0px'
  }
);

mockSteps.forEach((step) => {
  stepObserver.observe(step);

  step.addEventListener('focus', () => {
    setActiveStep(step.dataset.step);
  });

  step.addEventListener('mouseenter', () => {
    setActiveStep(step.dataset.step);
  });
});

setActiveStep('destination');

if (waitlistForm) {
  waitlistForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const button = waitlistForm.querySelector('button');

    button.textContent = 'Thanks for supporting!';
    button.disabled = true;
    button.setAttribute('aria-disabled', 'true');
  });
}
