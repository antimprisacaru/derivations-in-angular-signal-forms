import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';
import { DynamicForm, type FormConfig } from '@ng-forge/dynamic-forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-form-showcase',
  imports: [DynamicForm, JsonPipe],
  template: `
    <div class="showcase">
      <div class="showcase__description">
        <p>{{ description() }}</p>
      </div>
      <form [dynamic-form]="config()" [(value)]="value"></form>
      <details class="showcase__output" [open]="outputOpen()">
        <summary (click)="outputOpen.set(!outputOpen()); $event.preventDefault()">
          Form Value
        </summary>
        <pre>{{ value() | json }}</pre>
      </details>
    </div>
  `,
  styles: `
    .showcase__description p {
      color: #555;
      line-height: 1.6;
      margin: 0 0 1.5rem;
    }

    .showcase__output {
      margin-top: 1.5rem;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      overflow: hidden;

      summary {
        padding: 0.75rem 1rem;
        background: #f5f5f5;
        cursor: pointer;
        font-weight: 500;
        font-size: 0.85rem;
        color: #555;
        user-select: none;

        &:hover {
          background: #eeeeee;
        }
      }

      pre {
        margin: 0;
        padding: 1rem;
        background: #fafafa;
        font-size: 0.8rem;
        line-height: 1.5;
        max-height: 300px;
        overflow-y: auto;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormShowcase {
  readonly config = input.required<FormConfig>();
  readonly description = input('');
  readonly value = signal<Record<string, unknown>>({});
  readonly outputOpen = signal(true);
}
