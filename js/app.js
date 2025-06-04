
import { Cliente } from './classes.js';
import { isValidEmail, isNotEmpty } from './utils.js';

const API_BASE = 'https://crudcrud.com/api/6f89f6c6b5a7470d82b6958a0fa7f4ec/clients';

const form = document.getElementById('client-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const clientList = document.getElementById('client-list');

document.addEventListener('DOMContentLoaded', fetchClients);

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  if (!isNotEmpty(name) || !isValidEmail(email)) {
    alert("Preencha os campos corretamente.");
    return;
  }

  const cliente = new Cliente(name, email);

  await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cliente)
  });

  nameInput.value = '';
  emailInput.value = '';
  fetchClients();
});

async function fetchClients() {
  clientList.innerHTML = '';
  try {
    const res = await fetch(API_BASE);
    const data = await res.json();
    data.map(renderClient);
  } catch (err) {
    console.error('Erro ao buscar clientes:', err);
  }
}

function renderClient(client) {
  const li = document.createElement('li');
  li.textContent = `${client.name} (${client.email}) `;

  const btn = document.createElement('button');
  btn.textContent = 'Excluir';
  btn.addEventListener('click', () => deleteClient(client._id));

  li.appendChild(btn);
  clientList.appendChild(li);
}

async function deleteClient(id) {
  try {
    await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
    fetchClients();
  } catch (err) {
    console.error('Erro ao excluir cliente:', err);
  }
}
