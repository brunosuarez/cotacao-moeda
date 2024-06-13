import { Component, OnInit } from '@angular/core';
import { CotacaoMoedaService } from '../services/cotacao-moeda.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  exchangeRateData: any = null;
  currencyCodeFrom: string = '';
  currencyCodeTo: string = 'BRL';
  lastUpdatedAt: string = '';
  showExchangeRate: boolean = false;

  constructor(private cotacaoMoedaService: CotacaoMoedaService) { }

  ngOnInit(): void { }

  getCurrentExchangeRate() {
    this.cotacaoMoedaService.getCurrentExchangeRateData(
      this.currencyCodeFrom.toUpperCase(),
      this.currencyCodeTo.toUpperCase()
    ).subscribe(
      (data) => {
        const key = `${this.currencyCodeFrom}${this.currencyCodeTo}`;
        this.exchangeRateData = {
          fromSymbol: data[key].code,
          exchangeRate: data[key].bid,
          lastUpdatedAt: new Date(data[key].create_date)
        };
        this.showExchangeRate = true;
      },
      (error) => {
      }
    );
  }

  upperCaseInput() {
    this.currencyCodeFrom = this.currencyCodeFrom.toUpperCase();
  }

  formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
}
