export interface Filme {
  id: string;
  titulo: string;
  genero: string;
  ano: string;
}

export type FilmeFormData = Omit<Filme, "id">;
