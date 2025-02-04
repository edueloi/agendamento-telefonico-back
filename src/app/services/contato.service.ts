import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  private apiUrl = 'http://localhost:8080/contatos';

  constructor(private http: HttpClient) {}

  // Método para buscar todos os contatos
  getContatos(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  // ✅ Método para verificar se o celular já está cadastrado
  verificarCelular(celular: string): Observable<string> {
    return this.http.get(`${this.apiUrl}/verificar/${celular}`, { responseType: 'text' });
  }  

  // ✅ Método para cadastrar um novo contato
  cadastrarContato(contato: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, contato);
  }

  // Método para atualizar um contato
  atualizarContato(id: number, contato: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, contato);
  }

  // Método para deletar um contato
  deletarContato(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
