import { Filme, FilmeFormData } from "../types/Filme";

const BASE_URL =
  "https://6a309902a7f8866418d631f2.mockapi.io/gamelist/api/v1/Filmes";

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

// READ - lista todos os filmes
export async function listarFilmes(): Promise<Filme[]> {
  return request<Filme[]>(BASE_URL);
}

// CREATE - cadastra um novo filme
export async function criarFilme(data: FilmeFormData): Promise<Filme> {
  return request<Filme>(BASE_URL, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// UPDATE - altera os dados de um filme
export async function atualizarFilme(
  id: string,
  data: FilmeFormData
): Promise<Filme> {
  return request<Filme>(`${BASE_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

// DELETE - exclui um filme
export async function excluirFilme(id: string): Promise<void> {
  await request(`${BASE_URL}/${id}`, { method: "DELETE" });
}
