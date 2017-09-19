export const config = {
    app: {
        clientLogEnabled: '#{clientLogEnabled}',
        webApiAddress: '#{webApiAddress}',
        integratorSetupGuideUrl: 'https://www.datainterchange.com/downloads/support/manuals/digitalinvoice/Digital%20Invoice%20Integrator%20Quick%20Start%20Guide.pdf',
        appUrl: '#{appUrl}',
        sessionTimeout: '#{sessionTimeout}',
        sessionIdle: '#{sessionIdle}',
        enableForceUrlReload: '#{enableForceUrlReload}',
        forceUrlReloadLimit: '#{forceUrlReloadLimit}',
        forceUrlStateNames: "#{forceUrlStateNames}",
        version:"#{Octopus.Release.Number}"
    },
    utilities: {
        integrator: {
            endpointName: 'app',
            configFilePath: 'integrator/clickonce.json'
        }
    }
}