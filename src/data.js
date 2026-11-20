// Demo data. Dates are generated relative to "today" so the demo always feels alive.
const day = 86400000;
const iso = (offset) => new Date(Date.now() + offset * day).toISOString().slice(0, 10);

export const OWNER = {
  name: 'Estefany Daniela Martínez Niño',
  first: 'Estefany',
  email: 'estefanydanielamartineznino@gmail.com',
};

export const seedClients = () => [
  { id: 'c1', name: 'Valentina Ríos', company: 'Lumina Studio', email: 'valentina@luminastudio.co', phone: '+57 300 555 0142', industry: 'design', status: 'active', value: 4800, hue: 162, since: iso(-410) },
  { id: 'c2', name: 'Mateo Fernández', company: 'Órbita Labs', email: 'mateo@orbitalabs.io', phone: '+34 611 204 889', industry: 'tech', status: 'active', value: 3600, hue: 222, since: iso(-260) },
  { id: 'c3', name: 'Sofía Duarte', company: 'Casa Alba', email: 'sofia@casaalba.com', phone: '+52 55 4812 3390', industry: 'hospitality', status: 'lead', value: 1500, hue: 28, since: iso(-18) },
  { id: 'c4', name: 'Camille Laurent', company: 'Nube Verde', email: 'camille@nubeverde.eu', phone: '+33 6 12 45 78 90', industry: 'sustainability', status: 'active', value: 2800, hue: 140, since: iso(-190) },
  { id: 'c5', name: 'Lucas Almeida', company: 'Tempo Fitness', email: 'lucas@tempofit.com.br', phone: '+55 11 98877 4455', industry: 'fitness', status: 'paused', value: 1200, hue: 12, since: iso(-330) },
  { id: 'c6', name: 'Isabela Moreno', company: 'Brisa Café', email: 'isabela@brisacafe.co', phone: '+57 315 220 7781', industry: 'food', status: 'lead', value: 900, hue: 38, since: iso(-9) },
  { id: 'c7', name: 'Andrés Castaño', company: 'Faro Legal', email: 'andres@farolegal.co', phone: '+57 310 678 1204', industry: 'legal', status: 'active', value: 3200, hue: 262, since: iso(-520) },
  { id: 'c8', name: 'Beatriz Costa', company: 'Maré Cosméticos', email: 'beatriz@marecosmeticos.pt', phone: '+351 912 345 678', industry: 'beauty', status: 'active', value: 2400, hue: 330, since: iso(-120) },
];

// titleKey → translated through seedText so the board follows the active language
export const seedTasks = () => [
  { id: 'k1', titleKey: 't1', client: 'c1', status: 'doing', priority: 'high', due: iso(2) },
  { id: 'k2', titleKey: 't2', client: 'c2', status: 'todo', priority: 'medium', due: iso(5) },
  { id: 'k3', titleKey: 't3', client: 'c8', status: 'doing', priority: 'medium', due: iso(1) },
  { id: 'k4', titleKey: 't4', client: 'c7', status: 'review', priority: 'high', due: iso(0) },
  { id: 'k5', titleKey: 't5', client: 'c4', status: 'todo', priority: 'low', due: iso(9) },
  { id: 'k6', titleKey: 't6', client: 'c8', status: 'review', priority: 'medium', due: iso(3) },
  { id: 'k7', titleKey: 't7', client: 'c3', status: 'todo', priority: 'high', due: iso(1) },
  { id: 'k8', titleKey: 't8', client: 'c6', status: 'todo', priority: 'low', due: iso(12) },
  { id: 'k9', titleKey: 't9', client: 'c1', status: 'done', priority: 'medium', due: iso(-3) },
  { id: 'k10', titleKey: 't10', client: 'c2', status: 'done', priority: 'high', due: iso(-6) },
  { id: 'k11', titleKey: 't11', client: 'c4', status: 'done', priority: 'low', due: iso(-2) },
  { id: 'k12', titleKey: 't12', client: 'c7', status: 'doing', priority: 'high', due: iso(-1) },
];

export const REVENUE = [8200, 9100, 8800, 10400, 11300, 10900, 12600, 13400, 14200, 15100, 15900, 16800];

const min = 60000;
export const seedActivity = () => [
  { id: 'a1', type: 'approved', who: 'Valentina Ríos', hue: 162, whatKey: 'po.d.d2', ts: Date.now() - 12 * min },
  { id: 'a2', type: 'paid', who: 'Faro Legal', hue: 262, what: 'INV-2026-014', ts: Date.now() - 2 * 60 * min },
  { id: 'a3', type: 'done', who: null, hue: 170, whatKey: 'seed.t9', ts: Date.now() - 5 * 60 * min },
  { id: 'a4', type: 'comment', who: 'Camille Laurent', hue: 140, whatKey: 'seed.t5', ts: Date.now() - 26 * 60 * min },
  { id: 'a5', type: 'created', who: null, hue: 170, whatKey: 'seed.t7', ts: Date.now() - 49 * 60 * min },
];

export const INDUSTRIES = ['design', 'tech', 'hospitality', 'sustainability', 'fitness', 'food', 'legal', 'beauty'];
export const STATUSES = ['todo', 'doing', 'review', 'done'];
export const PRIORITIES = ['high', 'medium', 'low'];
