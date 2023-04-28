import '../__internal__/rich-text/rich-text.js';

import { BlockHubIcon20 } from '@blocksuite/global/config';
import { DisposableGroup, matchFlavours } from '@blocksuite/global/utils';
import type { BaseBlockModel } from '@blocksuite/store';
import { css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import { type BlockHost, ShadowlessElement } from '../__internal__/index.js';
import { attributeRenderer } from '../__internal__/rich-text/virgo/attribute-renderer.js';
import {
  affineTextAttributes,
  type AffineTextSchema,
} from '../__internal__/rich-text/virgo/types.js';
import { BlockChildrenContainer } from '../__internal__/service/components.js';
import type { AgentBlockModel } from './agent-model.js';

@customElement('affine-agent')
export class AgentBlockComponent extends ShadowlessElement {
  static override styles = css`
    .affine-agent-block-container {
      display: flex;
    }

    .affine-agent-avatar img {
      width: 20px;
    }

    .affine-agent-block-text {
      margin-left: 10px;
      flex: 1;
    }
  `;
  @property()
  model!: AgentBlockModel;

  @property()
  host!: BlockHost;

  readonly textSchema: AffineTextSchema = {
    attributesSchema: affineTextAttributes,
    textRenderer: attributeRenderer,
  };

  override connectedCallback() {
    super.connectedCallback();
    // Initial placeholder state
  }

  override firstUpdated() {
    this.model.propsUpdated.on(() => {
      this.requestUpdate();
    });
    this.model.childrenUpdated.on(() => this.requestUpdate());
  }

  override render() {
    return html`
      <div class="affine-agent-block-container">
        <!-- Agent avatar -->
        <div class="affine-agent-avatar">
          <img src=${this.model.agentAvatar} />
        </div>
        <rich-text
          .host=${this.host}
          .model=${this.model}
          .textSchema=${this.textSchema}
          .className=${'affine-agent-block-text'}
        ></rich-text>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'affine-agent': AgentBlockComponent;
  }
}
