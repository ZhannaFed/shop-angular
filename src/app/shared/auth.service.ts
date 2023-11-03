import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment.prod';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login( User: { email: any; password: any; returnSecureToken: boolean; } ) {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, User)
    .pipe(
      tap(this.setToken)
    )
  }

  private setToken(response: any) {
    if(response){
      const expData = new Date( new Date().getTime() + response.expiresIn * 1000)
      localStorage.setItem('fb-token-exp', expData.toString());
      localStorage.setItem('fb-token', response.idToken);
    }else {
      localStorage.clear();
    }
  }

  get token(): string | null{
    const expData = new Date(localStorage.getItem('fb-token-exp')!)
    if (new Date > expData) {
      this.logout();
      return null
    }
    return localStorage.getItem('fb-token');
  }

  logout() {
    this.setToken(null);
  }

  isAuthenticated(){
    return !!this.token
  }
}
