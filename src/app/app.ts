import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import type { FormConfig } from '@ng-forge/dynamic-forms';
import { FormShowcase } from './components/form-showcase';
import { invoiceConfig } from './forms/invoice.config';
import { travelBookingConfig } from './forms/travel-booking.config';
import { userProfileConfig } from './forms/user-profile.config';

interface DemoTab {
  label: string;
  description: string;
  config: FormConfig;
}

@Component({
  selector: 'app-root',
  imports: [MatTabsModule, FormShowcase],
  template: `
    <div class="demo-container">
      <header class="demo-header">
        <h1>Derivations in Angular Signal Forms</h1>
        <p>
          Declarative derivations powered by
          <a href="https://ng-forge.dev" target="_blank">ng-forge</a> —
          value computations, property derivations, and expression-driven logic,
          all defined in a JSON-serializable configuration.
        </p>
      </header>

      <mat-tab-group animationDuration="200ms" dynamicHeight>
        @for (tab of tabs; track tab.label) {
          <mat-tab [label]="tab.label">
            <div class="tab-content">
              <app-form-showcase
                [config]="tab.config"
                [description]="tab.description"
              />
            </div>
          </mat-tab>
        }
      </mat-tab-group>
    </div>
  `,
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  readonly tabs: DemoTab[] = [
    {
      label: 'Invoice Calculator',
      description:
        'Value derivations with chaining: quantity \u00d7 price \u2192 line total \u2192 subtotal \u2192 tax \u2192 grand total. All computed automatically.',
      config: invoiceConfig,
    },
    {
      label: 'Travel Booking',
      description:
        'Property derivations: selecting a departure date automatically sets the minimum return date. Trip duration and total price are derived from form values.',
      config: travelBookingConfig,
    },
    {
      label: 'User Profile',
      description:
        'Combined derivations: full name from first + last (with stopOnUserOverride), debounced display name from email, and dynamic label via property derivation.',
      config: userProfileConfig,
    },
  ];
}
