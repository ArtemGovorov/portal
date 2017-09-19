export const config = {
    app: {
        clientLogEnabled: true,
        webApiAddress: 'http://localhost:9000',
        appUrl: 'http://localhost:4444/',
        sessionTimeout: 300,
        sessionIdle: 1200,
        enableForceUrlReload: true,
        forceUrlReloadLimit: 20,
        forceUrlStateNames: "['portal.invoices.editById', 'portal.invoices.viewById']",
        version:"1.2.0.ABCD"
    },
    utilities: {
        integrator: {
            endpointName: 'app',
            configFilePath: 'integrator/clickonce.json'
        }
    }
}