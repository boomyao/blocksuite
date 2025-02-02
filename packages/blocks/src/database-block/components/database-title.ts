import { css, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

import {
  ShadowlessElement,
  WithDisposable,
} from '../../__internal__/utils/lit.js';
import { DATABASE_TITLE_LENGTH } from '../consts.js';
import type { DatabaseBlockModel } from '../database-model.js';
import { initLimitedLengthVEditor } from '../utils.js';

@customElement('affine-database-title')
export class DatabaseTitle extends WithDisposable(ShadowlessElement) {
  static override styles = css`
    .affine-database-title {
      flex: 1;
      max-width: 300px;
      min-width: 300px;
      height: 30px;
    }

    .database-title {
      position: sticky;
      width: 300px;
      height: 30px;
      font-size: 18px;
      font-weight: 600;
      line-height: 24px;
      color: var(--affine-text-primary-color);
      font-family: inherit;
      /* overflow-x: scroll; */
      overflow: hidden;
      cursor: text;
    }

    .database-title [data-virgo-text='true'] {
      display: block;
      white-space: pre !important;
    }

    .database-title.ellipsis [data-virgo-text='true'] {
      white-space: nowrap !important;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .database-title:focus {
      outline: none;
    }

    .database-title:disabled {
      background-color: transparent;
    }

    .database-title-empty::before {
      content: 'Database';
      color: var(--affine-placeholder-color);
      position: absolute;
      opacity: 0.5;
    }
  `;

  @property()
  targetModel!: DatabaseBlockModel;

  @property()
  addRow!: (rowIndex?: number) => void;

  @query('.database-title')
  private _titleContainer!: HTMLDivElement;

  override firstUpdated() {
    this._initTitleVEditor();
    const disposables = this._disposables;

    disposables.addFromEvent(this._titleContainer, 'focus', this._onTitleFocus);
    disposables.addFromEvent(this._titleContainer, 'blur', this._onTitleBlur);

    // prevent block selection
    const onStopPropagation = (event: Event) => event.stopPropagation();
    this._disposables.addFromEvent(this, 'pointerdown', onStopPropagation);
    this._disposables.addFromEvent(this, 'pointermove', onStopPropagation);
  }

  private _initTitleVEditor() {
    initLimitedLengthVEditor({
      yText: this.targetModel.title.yText,
      container: this._titleContainer,
      targetModel: this.targetModel,
      maxLength: DATABASE_TITLE_LENGTH,
      handlers: {
        keydown: this._handleKeyDown,
      },
    });

    // for title placeholder
    this.targetModel.title.yText.observe(() => {
      this.requestUpdate();
    });
  }

  private _handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      // prevent insert v-line
      event.preventDefault();
      // insert new row
      this.addRow(0);
      return;
    }
  };

  private _onTitleFocus = () => {
    this._titleContainer.classList.remove('ellipsis');
  };

  private _onTitleBlur = () => {
    this._titleContainer.classList.add('ellipsis');
  };

  override render() {
    const isEmpty = !this.targetModel.title || !this.targetModel.title.length;
    return html`<div class="affine-database-title">
      <div
        class="database-title ${isEmpty ? 'database-title-empty' : ''}"
        data-block-is-database-title="true"
        title=${this.targetModel.title.toString()}
      ></div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'affine-database-title': DatabaseTitle;
  }
}
