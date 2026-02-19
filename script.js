const events = [
  {
    title: "Web Development Bootcamp",
    date: "15 March 2026",
    venue: "Seminar Hall A",
  },
  {
    title: "AI & ML Workshop",
    date: "22 March 2026",
    venue: "Computer Lab 2",
  },
  {
    title: "Startup Pitch Fest",
    date: "29 March 2026",
    venue: "Auditorium",
  },
  {
    title: "UI/UX Design Talk",
    date: "05 April 2026",
    venue: "Seminar Hall B",
  },
];

const eventGrid = document.getElementById("eventGrid");
const eventSelect = document.getElementById("event");
const registrationForm = document.getElementById("registrationForm");
const registrationList = document.getElementById("registrationList");
const successMessage = document.getElementById("successMessage");

const errorFields = {
  name: document.getElementById("nameError"),
  email: document.getElementById("emailError"),
  phone: document.getElementById("phoneError"),
  year: document.getElementById("yearError"),
  event: document.getElementById("eventError"),
};

function renderEvents() {
  eventGrid.innerHTML = events
    .map(
      (event) => `
      <article class="event-card">
        <h4>${event.title}</h4>
        <p><strong>Date:</strong> ${event.date}</p>
        <p><strong>Venue:</strong> ${event.venue}</p>
      </article>
    `
    )
    .join("");

  eventSelect.innerHTML =
    '<option value="">Select an event</option>' +
    events
      .map((event) => `<option value="${event.title}">${event.title}</option>`)
      .join("");
}

function clearErrors() {
  Object.values(errorFields).forEach((field) => {
    field.textContent = "";
  });
}

function validateForm(formData) {
  clearErrors();
  let valid = true;

  if (formData.name.trim().length < 3) {
    errorFields.name.textContent = "Please enter at least 3 characters.";
    valid = false;
  }

  if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
    errorFields.email.textContent = "Please enter a valid email address.";
    valid = false;
  }

  if (!/^\d{10}$/.test(formData.phone)) {
    errorFields.phone.textContent = "Phone number must be exactly 10 digits.";
    valid = false;
  }

  if (!formData.year) {
    errorFields.year.textContent = "Please select your year.";
    valid = false;
  }

  if (!formData.event) {
    errorFields.event.textContent = "Please choose an event.";
    valid = false;
  }

  return valid;
}

function getStoredRegistrations() {
  return JSON.parse(localStorage.getItem("registrations") || "[]");
}

function saveRegistration(data) {
  const existing = getStoredRegistrations();
  existing.unshift(data);
  localStorage.setItem("registrations", JSON.stringify(existing.slice(0, 6)));
}

function renderRegistrations() {
  const allRegistrations = getStoredRegistrations();

  if (allRegistrations.length === 0) {
    registrationList.innerHTML = "<li>No registrations yet. Be the first one!</li>";
    return;
  }

  registrationList.innerHTML = allRegistrations
    .map(
      (entry) => `
      <li>
        <strong>${entry.name}</strong><br />
        ${entry.event} • ${entry.year}
      </li>
    `
    )
    .join("");
}

registrationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  successMessage.textContent = "";

  const formData = {
    name: registrationForm.name.value,
    email: registrationForm.email.value,
    phone: registrationForm.phone.value,
    year: registrationForm.year.value,
    event: registrationForm.event.value,
  };

  if (!validateForm(formData)) {
    return;
  }

  saveRegistration(formData);
  renderRegistrations();
  registrationForm.reset();

  successMessage.textContent = `Thanks ${formData.name}! Your registration for ${formData.event} is confirmed.`;
});

renderEvents();
renderRegistrations();
