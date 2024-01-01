import api from '../lib/axios-config'
import type { Client } from '../types/clients'

export async function getClients() {
  const { data } = await api.get<Client[]>('/clients')
  return data
}

export async function getClient(id: number) {
  const { data } = await api.get<Client>(`/clients/${id}`)
  return data
}

export async function addClient(client: Client) {
  const { data } = await api.post<Client>('/clients', client)
  return data
}

export async function updateClient(id: number, client: Client) {
  const { data } = await api.patch<Client>(`/clients/${id}`, client)
  return data
}

export async function changeState(id: number, newData: { state: boolean }) {
  const { data } = await api.patch<Client>(`/clients/${id}`, newData)
  return data
}

export async function deleteClient(id: number) {
  const { data } = await api.delete<Client>(`/clients/${id}`)
  return data
}
