import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor() {}
  public currentLang: string = localStorage.getItem('language') || 'EN';

  public changeLang(lang: string) {
    this.currentLang = lang;
    localStorage.setItem('language', lang);
  }

  public getLang(): string {
    return localStorage.getItem('language') || this.currentLang;
  }
}
