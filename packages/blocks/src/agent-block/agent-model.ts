import { defineBlockSchema, type SchemaToModel } from '@blocksuite/store';
import { literal } from 'lit/static-html.js';

export const AgentBlockSchema = defineBlockSchema({
  flavour: 'affine:agent',
  props: internal => ({
    text: internal.Text(),
    agentId: 'chatgpt',
    agentAvatar:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAAAAABWESUoAAABQElEQVR4Ac3PIYyDMBiG4VefPDtxEj0xM39qZl40mcPhMzONOjWNrqxA4UgmqklweBQKVfFdGhbSZZvfY5qmb35++DAbO4XQF7xjpN42s1oyXtlr2gN4SRpynnTaANtesy1tkOOR8aoAJ12J6ngmGkknCqn5gv0y8Jv03eYy+PEAu07jCQ66sDqqpohBCVb2PMtvSbeoxRJcLlIFVFKVBuOwBDdNxkzjEbKbVDwHvgZw8j+Qq2fVhhjkxB2g7JwqKJMRhUqo5Lol8OTxMbSsehXw45e9ao+J92EkGaFbBscxLqnbPRhYOVXr/53L+wTVaUDmNZ+tLNyDWgdWl3gxo7otHMYY5DYdwLc6gB18tVLBSVJD6qr6fsoBVt7wyCm4PxfiRyBTx5N8kCQP8DtrzysZrebG9ZLhnaILYbIbPss/4c/row+G/FAAAAAASUVORK5CYII=',
    agentName: 'chatgpt',
    agentVersion: 1,
    agentTip: 'Send a message',
  }),
  metadata: {
    version: 1,
    role: 'content',
    tag: literal`affine-agent`,
    // parent: ['affine:frame', 'affine:paragraph'],
  },
});

export type AgentBlockModel = SchemaToModel<typeof AgentBlockSchema>;
