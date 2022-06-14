import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FALE_MAIS_VALUES } from 'src/app/resources/constants/fale-mais-values.contants';
import { FALE_MAIS_PLANS } from 'src/app/resources/constants/fale-mais-plans.constants';


@Component({
  selector: 'simulation-form',
  templateUrl: './simulation-form.component.html',
})
export class SimulationFormComponent implements OnInit {

  defaultDDD = '011';
  dddFromList = Array.from(new Set(FALE_MAIS_VALUES.map((item) => item.dddFrom)));
  dddToList = this.getDDDToListBasedOnDDD(this.defaultDDD);
  faleMaisPlans = Array.from(FALE_MAIS_PLANS, (plan) => plan);

  simulationFormSubmitted: boolean = false;
  simulationForm!: FormGroup;
  dddFromField!: FormControl;
  dddToField!: FormControl;
  planField!: FormControl;
  minutesField!: FormControl;

  priceString = '';
  priceWithoutPlanString = '';
  paidMinutes = 0;
  planNameString = '';
  percentDiscountString = '';

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.simulationFormInit();
  }

  simulationFormInit() {
    this.dddFromField = new FormControl(this.dddFromList[0], Validators.required);
    this.dddToField = new FormControl(this.dddToList[0], Validators.required);
    this.planField = new FormControl(this.faleMaisPlans[0].id, Validators.required);
    this.minutesField = new FormControl('15', [
      Validators.required,
      Validators.min(0)
    ]);

    this.simulationForm = this.fb.group({
      dddFromField: this.dddFromField,
      dddToField: this.dddToField,
      planField: this.planField,
      minutesField: this.minutesField
    });
  }

  getDDDToListBasedOnDDD(ddd: string) {
    const filteredDDDTo = FALE_MAIS_VALUES.filter((item) => item.dddFrom === ddd).map((item) => item.dddTo);
    return Array.from(new Set(filteredDDDTo));
  }

  getPricePerMinute(dddFrom: string, dddTo: string) {
    return FALE_MAIS_VALUES.find((item) => item.dddFrom === dddFrom && item.dddTo === dddTo)?.pricePerMinute;
  }

  onDDDFromChange(event: any) {
    this.dddToList = this.getDDDToListBasedOnDDD(event.target.value);
    this.dddToField.setValue(this.dddToList[0]);
  }

  onSimulationFormSubmit() {
    this.simulationFormSubmitted = true;
    if (this.simulationForm.valid) {
      const dddFromValue = this.simulationForm.value.dddFromField;
      const dddToValue = this.simulationForm.value.dddToField;
      const minutesValue = this.simulationForm.value.minutesField;
      const planIdValue = this.simulationForm.value.planField;
      const plan = FALE_MAIS_PLANS.find((plan) => plan.id === planIdValue)!;

      this.planNameString = plan.name;
      let price = 0;
      let priceWithoutPlan = 0;
      let pricePerMinute = this.getPricePerMinute(dddFromValue, dddToValue)!;
      this.paidMinutes = 0;

      if (minutesValue <= plan.freeMinutes) {
        priceWithoutPlan = minutesValue * pricePerMinute;
      } else {
        priceWithoutPlan = minutesValue * pricePerMinute;
        this.paidMinutes = minutesValue - plan.freeMinutes;
        pricePerMinute += pricePerMinute * plan.paidMinutesPercentFee/100;
        price = this.paidMinutes * pricePerMinute;
      }

      const percentDiscount = 100 - (price * 100 / priceWithoutPlan);
      this.percentDiscountString = `${percentDiscount.toFixed(2)}% OFF`;

      this.priceString = price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
      this.priceWithoutPlanString = priceWithoutPlan.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    }
  }

}
