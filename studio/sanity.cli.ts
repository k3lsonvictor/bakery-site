import { defineCliConfig } from 'sanity/cli'

import { dataset, projectId } from './src/env'

export default defineCliConfig({
    api: {
        projectId,
        dataset,
    },
    deployment: {
        appId: 'akbxj2h2nd50trzm1jzretnb',
    },
})
