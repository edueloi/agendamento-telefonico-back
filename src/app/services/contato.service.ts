import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  private apiUrl = 'http://localhost:8080/contatos';

  constructor(private http: HttpClient) {}

  getContatos(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  verificarCelular(celular: string): Observable<string> {
    return this.http.get(`${this.apiUrl}/verificar/${celular}`, { responseType: 'text' });
  }  

  cadastrarContato(contato: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, contato);
  }

  atualizarContato(id: number, contato: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, contato);
  }

  deletarContato(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }  
}
