import { Filme } from "../types/Filme";

export type RootStackParamList = {
  FilmesList: undefined;
  FormFilme: { filme?: Filme } | undefined;
};
