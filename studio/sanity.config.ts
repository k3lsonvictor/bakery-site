import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

import {apiVersion, dataset, projectId} from './src/env'
import {schema} from './src/schema-types'
import {structure} from './src/structure'

export default defineConfig({
  name: 'default',
  title: 'Padaria Pão Nosso',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({structure}),
    visionTool({defaultApiVersion: apiVersion}),
  ],
})
