const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://pratikportfolio.pythonanywhere.com';

export function getApiUrl() {
  return API_URL;
}

export function staticUrl(path) {
  return `${API_URL}/static/${path}`;
}

export async function fetchPortfolioData() {
  const res = await fetch(`${API_URL}/api/portfolio-data`);
  if (!res.ok) throw new Error('Failed to fetch portfolio data');
  return res.json();
}

export async function submitContact(data) {
  const res = await fetch(`${API_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

// Admin API functions
export async function adminLogin(password) {
  const res = await fetch(`${API_URL}/api/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ password }),
  });
  return res.json();
}

export async function adminLogout() {
  const res = await fetch(`${API_URL}/api/admin/logout`, {
    method: 'POST',
    credentials: 'include',
  });
  return res.json();
}

export async function adminGetMessages() {
  const res = await fetch(`${API_URL}/api/admin/messages`, {
    credentials: 'include',
  });
  return res.json();
}

export async function adminAddCertification(data) {
  const res = await fetch(`${API_URL}/api/admin/certifications`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function adminDeleteCertification(index) {
  const res = await fetch(`${API_URL}/api/admin/certifications/${index}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  return res.json();
}

export async function adminAddTechSkill(data) {
  const res = await fetch(`${API_URL}/api/admin/skills/technical`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function adminDeleteTechSkill(index) {
  const res = await fetch(`${API_URL}/api/admin/skills/technical/${index}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  return res.json();
}

export async function adminAddSoftSkill(data) {
  const res = await fetch(`${API_URL}/api/admin/skills/soft`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function adminDeleteSoftSkill(index) {
  const res = await fetch(`${API_URL}/api/admin/skills/soft/${index}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  return res.json();
}

export async function adminAddProject(data) {
  const res = await fetch(`${API_URL}/api/admin/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function adminDeleteProject(index) {
  const res = await fetch(`${API_URL}/api/admin/projects/${index}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  return res.json();
}

export async function adminUpdatePortfolioData(data) {
  const res = await fetch(`${API_URL}/api/admin/portfolio-data`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function adminUploadProfilePhoto(formData) {
  const res = await fetch(`${API_URL}/api/admin/profile-photo`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });
  return res.json();
}

export async function adminUploadSignature(formData) {
  const res = await fetch(`${API_URL}/api/admin/signature-upload`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });
  return res.json();
}
